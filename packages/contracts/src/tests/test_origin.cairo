#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use debug::PrintTrait;

    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use pixelaw::core::models::registry::{app, app_name, core_actions_address};

    use pixelaw::core::models::pixel::{Pixel, PixelUpdate};
    use pixelaw::core::models::pixel::{pixel};
    use pixelaw::core::models::permissions::{permissions};
    use pixelaw::core::utils::{get_core_actions, Direction, Position, DefaultParameters};
    use pixelaw::core::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};

    use dojo::utils::{selector_from_names};
    use dojo::utils::test::{spawn_test_world, deploy_contract};

    use p_dash::systems::app::{
        actions as p_dash_actions, IPDashActionsDispatcher, IPDashActionsDispatcherTrait
    };

    use zeroable::Zeroable;

    // Helper function: deploys world and actions
    fn deploy_world() -> (IWorldDispatcher, IActionsDispatcher, IPDashActionsDispatcher) {
        // Deploy World and models
        let mut models = array![
            pixel::TEST_CLASS_HASH,
            app::TEST_CLASS_HASH,
            app_name::TEST_CLASS_HASH,
            core_actions_address::TEST_CLASS_HASH,
            permissions::TEST_CLASS_HASH,
        ];
        let world = spawn_test_world("pixelaw", models);

        // Deploy Core actions
        let core_actions_address = world
            .deploy_contract(
                'salt1', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span()
            );
        let core_actions = IActionsDispatcher { contract_address: core_actions_address };

        // Deploy PDash actions
        let p_dash_actions_address = world
            .deploy_contract(
                'salt2', p_dash_actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span()
            );
        let p_dash_actions = IPDashActionsDispatcher { contract_address: p_dash_actions_address };

        world.grant_writer(selector_from_tag!("pixelaw-Pixel"), core_actions_address);

        (world, core_actions, p_dash_actions)
    }

    #[test]
    #[available_gas(3000000000)]
    fn test_p_dash_actions() {
        // Deploy everything
        let (world, core_actions, p_dash_actions) = deploy_world();

        core_actions.init();
        p_dash_actions.init();

        let player1 = starknet::contract_address_const::<0x1337>();
        starknet::testing::set_account_contract_address(player1);

        let color = encode_color(1, 1, 1);

        p_dash_actions
            .interact(
                DefaultParameters {
                    for_player: Zeroable::zero(),
                    for_system: Zeroable::zero(),
                    position: Position { x: 1, y: 1 },
                    color: color
                },
            );

        let pixel_1_1 = get!(world, (1, 1), (Pixel));
        assert(pixel_1_1.color == color, 'should be the color');

        'Passed test'.print();
    }

    fn encode_color(r: u8, g: u8, b: u8) -> u32 {
        (r.into() * 0x10000) + (g.into() * 0x100) + b.into()
    }

    fn decode_color(color: u32) -> (u8, u8, u8) {
        let r = (color / 0x10000);
        let g = (color / 0x100) & 0xff;
        let b = color & 0xff;

        (r.try_into().unwrap(), g.try_into().unwrap(), b.try_into().unwrap())
    }
}
