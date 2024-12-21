use p_dash::models::block::{BlockType};
use pixelaw::core::utils::{DefaultParameters};

#[starknet::interface]
pub trait IPDashActions<T> {
    fn init(ref self: T);
    fn initialize_stage(
        ref self: T,
        stage_id: felt252,
        start_x: u16,
        start_y: u16,
        width: u16,
        height: u16,
        default_params: DefaultParameters,
    ); // optimally input the width in the future.
    fn put_block(
        ref self: T, stage_id: felt252, blocktype: BlockType, default_params: DefaultParameters
    );
}

/// contracts must be named as such (APP_KEY + underscore + "actions")
#[dojo::contract]
pub mod p_dash_actions {
    use starknet::{contract_address_const};

    use dojo::model::{ModelStorage};

    use pixelaw::core::actions::{IActionsDispatcherTrait as ICoreActionsDispatcherTrait};
    use pixelaw::core::models::pixel::{PixelUpdate};
    use pixelaw::core::utils::{get_core_actions, get_callers, DefaultParameters};

    use p_dash::constants::app::{APP_KEY, APP_ICON};
    use p_dash::models::block::{BlockType, Block};
    use p_dash::models::stage::{Stage};

    use super::IPDashActions;


    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl Actions of IPDashActions<ContractState> {
        fn init(ref self: ContractState) {
            let mut world = self.world(@"pixelaw");
            let core_actions = get_core_actions(ref world);

            core_actions.new_app(contract_address_const::<0>(), APP_KEY, APP_ICON);
        }

        /// Initialize stage for p/dash
        ///
        /// # Arguments
        ///
        /// * `start_x` - Starting x position of the stage. should be calculated by client-side
        /// using torii.
        /// * `start_y` - Starting y position of the stage. should be calculated by client-side
        /// using torii.
        /// * `default_params` - Default parameters for the stage.
        fn initialize_stage(
            ref self: ContractState,
            stage_id: felt252,
            start_x: u16,
            start_y: u16,
            width: u16,
            height: u16,
            default_params: DefaultParameters,
        ) {
            // Load important variables
            let mut world = self.world(@"pixelaw");
            let core_actions = get_core_actions(ref world);
            let (player, system) = get_callers(ref world, default_params);
            let position = default_params.position;

            let w = width;
            let h = height;
            // TODO: now not sure how to pass Option to calldata for sozo cli
            // let w = width.unwrap_or(STAGE_DEFAULT_WIDTH);
            // let h = height.unwrap_or(STAGE_DEFAULT_HEIGHT);

            // should check the stageId is not already taken
            // Load the Pixel
            let mut existing_stage: Stage = world.read_model((stage_id));

            assert(
                existing_stage.creator == contract_address_const::<0>(), 'StageId already taken'
            );

            // set the Stage configs.
            let new_stage = Stage { id: stage_id, x: start_x, y: start_y, w, h, creator: player };
            world.write_model(@new_stage);

            // set the init block.
            let new_block = Block {
                stage_id, x: start_x, y: start_y, blocktype: BlockType::InitBlock
            };
            world.write_model(@new_block);

            core_actions
                .update_pixel(
                    player,
                    system,
                    PixelUpdate {
                        x: position.x,
                        y: position.y,
                        color: Option::Some(default_params.color),
                        timestamp: Option::None,
                        text: Option::None,
                        app: Option::Some(system),
                        owner: Option::Some(player),
                        action: Option::None, // Not using this feature for paint
                    },
                    default_params.area_hint, // area_hint
                    false
                );
        }

        fn put_block(
            ref self: ContractState,
            stage_id: felt252,
            blocktype: BlockType,
            default_params: DefaultParameters
        ) {
            // Load important variables
            let mut world = self.world(@"pixelaw");
            let core_actions = get_core_actions(ref world);
            let (player, system) = get_callers(ref world, default_params);
            let position = default_params.position;

            let stage: Stage = world.read_model((stage_id));

            assert(stage.creator == player, 'Only the creator can put blocks');

            // Load the Pixel
            // let mut pixel = get!(world, (position.x, position.y), (Pixel));

            // Check if the pixel is free.
            // assert(pixel.owner == player, 'Please select your own pixel');

            core_actions
                .update_pixel(
                    player,
                    system,
                    PixelUpdate {
                        x: position.x + 1, // already summed with stage.x
                        y: position.y + 1, // already summed with stage.y
                        color: Option::Some(default_params.color),
                        timestamp: Option::None,
                        text: Option::None,
                        app: Option::Some(system),
                        owner: Option::Some(player),
                        action: Option::None // Not using this feature for p_dash
                    },
                    default_params.area_hint, // area_hint
                    false
                );

            // set the block types for init block.
            let new_block = Block { stage_id, x: position.x, y: position.y, blocktype };
            world.write_model(@new_block);
        }
    }
}
