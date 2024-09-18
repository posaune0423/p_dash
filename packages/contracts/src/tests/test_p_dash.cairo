#[cfg(test)]
mod tests {
    use dojo::utils::test::{spawn_test_world, deploy_contract};
    use dojo::utils::{selector_from_names};

    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use p_dash::models::block::{block, Block, BlockType};

    use p_dash::models::stage::{stage, Stage};
    use p_dash::systems::actions::{
        p_dash_actions, IPDashActionsDispatcher, IPDashActionsDispatcherTrait
    };
    use pixelaw::core::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};
    use pixelaw::core::models::permissions::{permissions};
    use pixelaw::core::models::pixel::{Pixel, PixelUpdate};
    use pixelaw::core::models::pixel::{pixel};

    use pixelaw::core::models::registry::{app, app_name, core_actions_address};
    use pixelaw::core::utils::{
        get_core_actions, encode_color, decode_color, Direction, Position, DefaultParameters
    };
    use starknet::{contract_address_const, testing::set_account_contract_address};
    use core::pedersen::pedersen;

    // Helper function: deploys world and actions
    fn deploy_world() -> (IWorldDispatcher, IPDashActionsDispatcher) {
        // Deploy World and models
        let mut models = array![
            pixel::TEST_CLASS_HASH,
            app::TEST_CLASS_HASH,
            app_name::TEST_CLASS_HASH,
            core_actions_address::TEST_CLASS_HASH,
            permissions::TEST_CLASS_HASH,
            stage::TEST_CLASS_HASH,
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
        world.grant_writer(selector_from_tag!("pixelaw-Pixel"), actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-Stage"), actions_address);
        world.grant_writer(selector_from_tag!("pixelaw-Block"), actions_address);

        core_actions.init();
        actions.init();

        (world, actions)
    }

    #[test]
    fn test_should_initialize_stage() {
        // Deploy everything
        let (world, actions) = deploy_world();

        let player1 = contract_address_const::<0x1337>();
        set_account_contract_address(player1);

        println!("Passed set_account_contract_address");

        let color = encode_color(255, 255, 255, 255); // White color

        // Generate a unique stage_id using pedersen hash
        let stage_id = pedersen(1, 1);
        // Test initialize_stage
        actions
            .initialize_stage(
                stage_id,
                1, // start_x
                1, // start_y
                2, // width
                2, // height
                DefaultParameters {
                    for_player: player1,
                    for_system: contract_address_const::<0>(),
                    position: Position { x: 1, y: 1 },
                    color: color
                },
            );

        // Check if the stage is initialized correctly
        let stage = get!(world, stage_id, (Stage));
        assert(stage.x == 1 && stage.y == 1, 'Stage position incorrect');
        assert(stage.w == 2 && stage.h == 2, 'Stage size incorrect'); // Assuming default size

        // // Check if pixels are initialized
        // let pixel_1_1 = get!(world, (1, 1), (Pixel));
        // assert(pixel_1_1.color == color, 'Pixel color incorrect');
        // assert(pixel_1_1.owner == player1, 'Pixel owner incorrect');
        // println!("Passed initialize_stage");

        // Check if blocks are initializedÏ
        let block_1_1 = get!(world, (stage_id, 1, 1), (Block));
        assert(block_1_1.blocktype == BlockType::InitBlock, 'Initial block type incorrect');
        println!("Successfully initialized stage");

        // Test put_block
        actions
            .put_block(
                stage_id,
                BlockType::Block,
                DefaultParameters {
                    for_player: player1,
                    for_system: contract_address_const::<0>(),
                    position: Position { x: 2, y: 2 },
                    color: encode_color(255, 0, 0, 255) // Red color
                },
            );

        let block_2_2 = get!(world, (stage_id, 2, 2), (Block));
        assert(block_2_2.blocktype == BlockType::Block, 'Block type is incorrect');

        // Check if the pixel is updated
        let pixel_2_2 = get!(world, (2, 2), (Pixel));
        assert(pixel_2_2.color == encode_color(255, 0, 0, 255), 'Pixel color is incorrect');
        println!("Successfully put block");
    }

    #[test]
    #[should_panic(expected: ('StageId already taken', 'ENTRYPOINT_FAILED'))]
    fn test_initialize_stage_fails_with_duplicated_stage_id() {
        // Deploy everything
        let (_, actions) = deploy_world();

        let player1 = contract_address_const::<0x1337>();
        set_account_contract_address(player1);

        let color = encode_color(255, 255, 255, 255); // White color

        // Generate a unique stage_id using pedersen hash
        let stage_id = pedersen(1, 1);

        // Test initialize_stage with invalid size (0 width and height)
        actions
            .initialize_stage(
                stage_id,
                1, // start_x
                1, // start_y
                2, // width
                2, // height
                DefaultParameters {
                    for_player: player1,
                    for_system: contract_address_const::<0>(),
                    position: Position { x: 1, y: 1 },
                    color: color
                },
            );
        // 2nd call should fail
        actions
            .initialize_stage(
                stage_id,
                10, // start_x
                10, // start_y
                2, // width
                2, // height
                DefaultParameters {
                    for_player: player1,
                    for_system: contract_address_const::<0>(),
                    position: Position { x: 10, y: 10 },
                    color: color
                },
            );
    }
}
