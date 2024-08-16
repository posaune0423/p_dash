#[cfg(test)]
mod tests {
    use starknet::{contract_address_const, testing::set_account_contract_address};

    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use pixelaw::core::models::registry::{app, app_name, core_actions_address};

    use pixelaw::core::models::pixel::{Pixel, PixelUpdate};
    use pixelaw::core::models::pixel::{pixel};
    use pixelaw::core::models::permissions::{permissions};
    use pixelaw::core::utils::{get_core_actions, Direction, Position, DefaultParameters};
    use pixelaw::core::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};

    use p_dash::models::stage::{stage, stage_id, Stage, StageId};
    use p_dash::models::blocktype::{block, Block, BlockType};

    use dojo::utils::{selector_from_names};
    use dojo::utils::test::{spawn_test_world, deploy_contract};

    use p_dash::systems::app::{
        p_dash_actions, IPDashActionsDispatcher, IPDashActionsDispatcherTrait
    };


    // Helper function: deploys world and actions
    fn deploy_world() -> (IWorldDispatcher, IActionsDispatcher, IPDashActionsDispatcher) {
        // Deploy World and models
        let mut models = array![
            pixel::TEST_CLASS_HASH,
            app::TEST_CLASS_HASH,
            app_name::TEST_CLASS_HASH,
            core_actions_address::TEST_CLASS_HASH,
            permissions::TEST_CLASS_HASH,
            stage::TEST_CLASS_HASH,
            stage_id::TEST_CLASS_HASH,
            block::TEST_CLASS_HASH,
        ];
        let world = spawn_test_world(["pixelaw"].span(), models.span());

        // Deploy Core actions
        let core_actions_address = world
            .deploy_contract('salt1', actions::TEST_CLASS_HASH.try_into().unwrap());
        let core_actions = IActionsDispatcher { contract_address: core_actions_address };

        // Deploy  actions
        let actions_address = world
            .deploy_contract('salt2', p_dash_actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions = IPDashActionsDispatcher { contract_address: actions_address };

        // Grant writer permissions to core actions models
        world.grant_writer(selector_from_tag!("pixelaw-Pixel"), core_actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-App"), core_actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-AppName"), core_actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-Permissions"), core_actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-CoreActionsAddress"), core_actions_address);

        // Grant writer permissions to p_dash actions models
        world.grant_writer(selector_from_tag!("pixelaw-Stage"), actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-StageId"), actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-Block"), actions_address);

        (world, core_actions, actions)
    }

    #[test]
    #[available_gas(3000000000)]
    fn test_actions() {
        // Deploy everything
        let (world, core_actions, actions) = deploy_world();

        println!("Passed deploy_world");
        core_actions.init();
        actions.init();

        println!("Passed init");

        let player1 = contract_address_const::<0x1337>();
        set_account_contract_address(player1);

        println!("Passed set_account_contract_address");

        let color = encode_color(1, 1, 1);

        actions
            .initialize_stage(
                DefaultParameters {
                    for_player: contract_address_const::<0x1337>(),
                    for_system: contract_address_const::<0x1337>(),
                    position: Position { x: 1, y: 1 },
                    color: color
                },
            );

        let pixel_1_1 = get!(world, (1, 1), (Pixel));
        assert(pixel_1_1.color == color, 'should be the color');

        let stage_id = get!(world, (1, 1), (StageId));
        let stage = get!(world, stage_id, (Stage));

        println!("stage.x: {}", stage.x);
        println!("stage.y: {}", stage.y);
        println!("stage.w: {}", stage.w);
        println!("stage.h: {}", stage.h);

        assert(stage.x == 1 && stage.y == 1, 'config setting error');
        // assert(stage.w == 200 && stage.h == 16, 'config setting error(stage)');

        let block = get!(world, (1, 1), (Block));
        assert(block.block.into() == 0x1, 'config setting error(Block)');

        actions
            .put_block(
                DefaultParameters {
                    for_player: contract_address_const::<0x1337>(),
                    for_system: contract_address_const::<0x1337>(),
                    position: Position { x: 2, y: 2 },
                    color: color
                },
                blocktype: BlockType::Block,
            );

        println!("Passed test");
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
