use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use pixelaw::core::models::pixel::{Pixel, PixelUpdate};
use pixelaw::core::utils::{get_core_actions, Direction, Position, DefaultParameters};
use starknet::{
    get_caller_address, get_contract_address, get_execution_info, ContractAddress,
    contract_address_const
};
use p_dash::models::blocktype::{BlockType, Block};

#[dojo::interface]
pub trait IPDashActions<TContractState> {
    fn init(ref world: IWorldDispatcher);
    fn interact(ref world: IWorldDispatcher, default_params: DefaultParameters); // deprecated
    fn initialize_stage(
        ref world: IWorldDispatcher, default_params: DefaultParameters
    ); // optimally input the width in the future.
    fn put_block(
        ref world: IWorldDispatcher, default_params: DefaultParameters, blocktype: BlockType
    );
}

/// APP_KEY must be unique across the entire platform
const APP_KEY: felt252 = 'p_dash';

/// Core only supports unicode icons for now
const APP_ICON: felt252 = 'U+1F3AE';

/// prefixing with BASE means using the server's default manifest.json handler
const APP_MANIFEST: felt252 = 'BASE/manifests/p_dash';

/// contracts must be named as such (APP_KEY + underscore + "actions")
#[dojo::contract(namespace: "pixelaw", nomapping: true)]
pub mod p_dash_actions {
    use starknet::{
        get_tx_info, get_caller_address, get_contract_address, get_execution_info, ContractAddress,
        contract_address_const
    };

    use super::IPDashActions;
    use pixelaw::core::models::pixel::{Pixel, PixelUpdate};

    use pixelaw::core::models::permissions::{Permission};
    use pixelaw::core::actions::{
        IActionsDispatcher as ICoreActionsDispatcher,
        IActionsDispatcherTrait as ICoreActionsDispatcherTrait
    };
    use super::{APP_KEY, APP_ICON, APP_MANIFEST};
    use pixelaw::core::utils::{get_core_actions, Direction, Position, DefaultParameters};

    use p_dash::models::blocktype::{BlockType, Block};
    use p_dash::models::stage::{Stage, StageId};


    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl PDashActionsImpl of IPDashActions<ContractState> {
        fn init(ref world: IWorldDispatcher) {
            let core_actions = pixelaw::core::utils::get_core_actions(world);

            core_actions.update_app(APP_KEY, APP_ICON, APP_MANIFEST);
            ///Grant permission to the snake App

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


        /// Put color on a certain position
        ///
        /// # Arguments
        ///
        /// * `position` - Position of the pixel.
        /// * `new_color` - Color to set the pixel to.
        fn interact(ref world: IWorldDispatcher, default_params: DefaultParameters) {
            println!("put_color");

            // Load important variables
            let core_actions = get_core_actions(world);
            let position = default_params.position;
            let player = core_actions.get_player_address(default_params.for_player);
            let system = core_actions.get_system_address(default_params.for_system);

            // Load the Pixel
            let mut pixel = get!(world, (position.x, position.y), (Pixel));

            // TODO: Load PDash App Settings like the fade steptime
            // For example for the Cooldown feature
            let COOLDOWN_SECS = 5;

            // Check if 5 seconds have passed or if the sender is the owner
            assert(
                pixel.owner == contract_address_const::<0>()
                    || (pixel.owner) == player
                    || starknet::get_block_timestamp()
                    - pixel.timestamp < COOLDOWN_SECS,
                'Cooldown not over'
            );

            // We can now update color of the pixel
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

            println!("interact DONE");
        }

        /// Initialize stage for p/dash
        ///
        /// # Arguments
        ///
        /// * `position` - Position of the pixel.
        /// * `new_color` - Color to set the pixel to.

        fn initialize_stage(ref world: IWorldDispatcher, default_params: DefaultParameters) {
            println!("Initialize the stage for p/dash");

            // width and height should be set by the frontend in the future.
            let mut width: u32 = 200;
            let mut height: u32 = 16;

            // Load important variables
            let core_actions = get_core_actions(world);
            let position = default_params.position;
            let player = core_actions.get_player_address(default_params.for_player);
            let system = core_actions.get_system_address(default_params.for_system);

            // check if the stage is created
            let mut id = world.uuid();

            if id == 0 {
                id = world.uuid();
            }

            // Load the Pixel
            let mut pixel = get!(world, (position.x, position.y), (Pixel));

            // Check if the pixel is free.
            assert(pixel.owner == contract_address_const::<0>(), 'Please select free pixel');

            // set the head block's to the id.
            set!(world, (StageId { x: position.x, y: position.y, value: id }));

            // set the Stage configs.
            set!(world, (Stage { id: id, x: position.x, y: position.y, w: width, h: height }));

            // // set the block types for init block.
            set!(world, (Block { x: position.x, y: position.y, block: BlockType::InitBlock(()) }));

            // have to change here for p/dash functions.
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

            println!("p/dash set up done");
        }

        fn put_block(
            ref world: IWorldDispatcher, default_params: DefaultParameters, blocktype: BlockType
        ) {
            println!("Put block");

            // Load important variables
            let core_actions = get_core_actions(world);
            let position = default_params.position;
            let player = core_actions.get_player_address(default_params.for_player);
            let system = core_actions.get_system_address(default_params.for_system);

            // Load the Pixel
            let mut pixel = get!(world, (position.x, position.y), (Pixel));

            // Check if the pixel is free.
            assert(pixel.owner == contract_address_const::<0>(), 'Please select free pixel');

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
            set!(world, (Block { x: position.x, y: position.y, block: BlockType::Block(()) }));

            println!("Block set");
        }
    }
}
