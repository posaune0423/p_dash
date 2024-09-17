use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use p_dash::models::block::{BlockType, Block};
use pixelaw::core::models::pixel::{Pixel, PixelUpdate};
use pixelaw::core::utils::{get_core_actions, Direction, Position, DefaultParameters};
use starknet::{
    get_caller_address, get_contract_address, get_execution_info, ContractAddress,
    contract_address_const
};

#[dojo::interface]
pub trait IPDashActions<TContractState> {
    fn init(ref world: IWorldDispatcher);
    fn initialize_stage(
        ref world: IWorldDispatcher,
        start_x: u32,
        start_y: u32,
        width: u32,
        height: u32,
        default_params: DefaultParameters,
    ) -> usize; // optimally input the width in the future.
    fn put_block(
        ref world: IWorldDispatcher,
        stage_id: usize,
        blocktype: BlockType,
        default_params: DefaultParameters
    );
}

/// contracts must be named as such (APP_KEY + underscore + "actions")
#[dojo::contract(namespace: "pixelaw", nomapping: true)]
pub mod p_dash_actions {
    use p_dash::constants::app::{APP_KEY, APP_ICON};
    use p_dash::models::block::{BlockType, Block};
    use p_dash::models::stage::{Stage};
    use pixelaw::core::actions::{
        IActionsDispatcher as ICoreActionsDispatcher,
        IActionsDispatcherTrait as ICoreActionsDispatcherTrait
    };
    use pixelaw::core::models::permissions::{Permission};

    use pixelaw::core::models::pixel::{Pixel, PixelUpdate};
    use pixelaw::core::models::registry::App;
    use pixelaw::core::traits::IInteroperability;
    use pixelaw::core::utils::{get_core_actions, Direction, Position, DefaultParameters};
    use starknet::{
        get_tx_info, get_caller_address, get_contract_address, get_execution_info, ContractAddress,
        contract_address_const
    };

    use super::IPDashActions;


    #[abi(embed_v0)]
    impl ActionsInteroperability of IInteroperability<ContractState> {
        fn on_pre_update(
            ref world: IWorldDispatcher,
            pixel_update: PixelUpdate,
            app_caller: App,
            player_caller: ContractAddress
        ) {
            // do nothing
            let _world = world;
        }

        fn on_post_update(
            ref world: IWorldDispatcher,
            pixel_update: PixelUpdate,
            app_caller: App,
            player_caller: ContractAddress
        ) {
            // do nothing
            let _world = world;
        }
    }


    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl PDashActionsImpl of IPDashActions<ContractState> {
        fn init(ref world: IWorldDispatcher) {
            let core_actions = pixelaw::core::utils::get_core_actions(world);

            core_actions.new_app(contract_address_const::<0>(), APP_KEY, APP_ICON);
            ///Grant permission to the app
            core_actions
                .update_permission(
                    APP_KEY,
                    Permission {
                        app: false,
                        color: true,
                        owner: false,
                        text: true,
                        timestamp: true,
                        action: true
                    }
                );
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
            ref world: IWorldDispatcher,
            start_x: u32,
            start_y: u32,
            width: u32,
            height: u32,
            default_params: DefaultParameters,
        ) -> usize {
            // println!("Initialize the stage for p/dash");

            // Load important variables
            let core_actions = get_core_actions(world);
            let player = core_actions.get_player_address(default_params.for_player);
            // let position = default_params.position;
            let system = core_actions.get_system_address(default_params.for_system);

            // check if the stage is created
            let stage_id = world.uuid().into();
            let w = width;
            let h = height;
            // TODO: now not sure how to pass Option to calldata for sozo cli
            // let w = width.unwrap_or(STAGE_DEFAULT_WIDTH);
            // let h = height.unwrap_or(STAGE_DEFAULT_HEIGHT);

            // set the Stage configs.
            set!(world, (Stage { id: stage_id, x: start_x, y: start_y, w, h, creator: player }));
            set!(
                world, (Block { stage_id, x: start_x, y: start_y, blocktype: BlockType::InitBlock })
            );

            core_actions
                .update_pixel(
                    player,
                    system,
                    PixelUpdate {
                        x: start_x,
                        y: start_y,
                        color: Option::Some(default_params.color), // initial color(white)
                        app: Option::Some(system),
                        owner: Option::Some(player),
                        text: Option::None,
                        timestamp: Option::None,
                        action: Option::None
                    }
                );

            // let mut x = start_x;
            // loop {
            //     if x == start_x + w {
            //         break;
            //     }
            //     let mut y = start_y;
            //     loop {
            //         if y == start_y + h {
            //             break;
            //         }
            //         set!(world, (Block { stage_id, x, y, blocktype: BlockType::InitBlock }));

            //         core_actions
            //             .update_pixel(
            //                 player,
            //                 system,
            //                 PixelUpdate {
            //                     x,
            //                     y,
            //                     color: Option::Some(default_params.color), // initial
            //                     color(white)
            //                     app: Option::Some(system),
            //                     owner: Option::Some(player),
            //                     text: Option::None,
            //                     timestamp: Option::None,
            //                     action: Option::None
            //                 }
            //             );
            //         y += 1;
            //     };
            //     x += 1;
            // };

            // println!("p/dash set up done");

            return stage_id;
        }

        fn put_block(
            ref world: IWorldDispatcher,
            stage_id: usize,
            blocktype: BlockType,
            default_params: DefaultParameters
        ) {
            // println!("Put block");

            // Load important variables
            let core_actions = get_core_actions(world);
            let position = default_params.position;
            let player = core_actions.get_player_address(default_params.for_player);
            let system = core_actions.get_system_address(default_params.for_system);

            // Load the Pixel
            // let mut pixel = get!(world, (position.x, position.y), (Pixel));

            // Check if the pixel is free.
            // assert(pixel.owner == player, 'Please select your own pixel');

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
                        action: Option::None // Not using this feature for p_dash
                    }
                );

            // set the block types for init block.
            set!(world, (Block { stage_id, x: position.x, y: position.y, blocktype }));
            // println!("Block set");
        }
    }
}
