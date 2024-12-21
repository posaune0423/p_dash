#[cfg(test)]
mod tests {
    use core::pedersen::pedersen;

    use dojo::model::{ModelStorage};
    use dojo::world::WorldStorageTrait;
    use dojo::world::storage::WorldStorage;

    use dojo_cairo_test::{
        NamespaceDef, TestResource, ContractDefTrait, ContractDef, WorldStorageTestTrait
    };

    use p_dash::models::block::{m_Block, Block, BlockType};
    use p_dash::models::stage::{m_Stage, Stage};
    use p_dash::systems::actions::{
        p_dash_actions, IPDashActionsDispatcher, IPDashActionsDispatcherTrait
    };

    use pixelaw::core::models::pixel::{Pixel};
    use pixelaw::core::utils::{DefaultParameters, Position, encode_rgba};
    use pixelaw_test_helpers::{update_test_world, setup_core_initialized, set_caller};


    fn deploy_app(ref world: WorldStorage) -> IPDashActionsDispatcher {
        let ndef = NamespaceDef {
            namespace: "pixelaw", resources: [
                TestResource::Model(m_Block::TEST_CLASS_HASH),
                TestResource::Model(m_Stage::TEST_CLASS_HASH),
                TestResource::Contract(p_dash_actions::TEST_CLASS_HASH),
            ].span()
        };

        let cdefs: Span<ContractDef> = [
            ContractDefTrait::new(@"pixelaw", @"p_dash_actions")
                .with_writer_of([dojo::utils::bytearray_hash(@"pixelaw")].span())
        ].span();

        update_test_world(ref world, [ndef].span());

        world.sync_perms_and_inits(cdefs);

        let (p_dash_actions_address, _) = world.dns(@"p_dash_actions").unwrap();
        IPDashActionsDispatcher { contract_address: p_dash_actions_address }
    }


    #[test]
    fn test_should_initialize_stage() {
        // Deploy everything
        let (mut world, _core_actions, player_1, _player_2) = setup_core_initialized();

        let actions = deploy_app(ref world);

        actions.init();

        set_caller(player_1);

        let color = encode_rgba(255, 255, 255, 255); // White color

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
                    player_override: Option::None,
                    system_override: Option::None,
                    area_hint: Option::None,
                    position: Position { x: 1, y: 1 },
                    color: color
                },
            );

        // Check if the stage is initialized correctly
        let stage: Stage = world.read_model((stage_id));
        assert(stage.x == 1 && stage.y == 1, 'Stage position incorrect');
        assert(stage.w == 2 && stage.h == 2, 'Stage size incorrect'); // Assuming default size

        // // Check if pixels are initialized
        // let pixel_1_1 = get!(world, (1, 1), (Pixel));
        // assert(pixel_1_1.color == color, 'Pixel color incorrect');
        // assert(pixel_1_1.owner == player1, 'Pixel owner incorrect');
        // println!("Passed initialize_stage");

        // Check if blocks are initializedÏ
        let block_1_1: Block = world.read_model((stage_id, 1, 1));
        assert(block_1_1.blocktype == BlockType::InitBlock, 'Initial block type incorrect');

        // Test put_block
        actions
            .put_block(
                stage_id,
                BlockType::Block,
                DefaultParameters {
                    player_override: Option::None,
                    system_override: Option::None,
                    area_hint: Option::None,
                    position: Position { x: 2, y: 2 },
                    color: encode_rgba(255, 0, 0, 255) // Red color
                },
            );

        let block_2_2: Block = world.read_model((stage_id, 2, 2));
        assert(block_2_2.blocktype == BlockType::Block, 'Block type is incorrect');

        // Check if the pixel is updated
        let pixel_3_3: Pixel = world.read_model((3, 3));
        println!("pixel_3_3.color: {:?}", pixel_3_3.color);
        assert(pixel_3_3.color == encode_rgba(255, 0, 0, 255), 'Pixel color is incorrect');
        println!("Successfully put block");
    }

    #[test]
    #[should_panic(expected: ('StageId already taken', 'ENTRYPOINT_FAILED'))]
    fn test_initialize_stage_fails_with_duplicated_stage_id() {
        // Deploy everything
        let (mut world, _core_actions, player_1, _player_2) = setup_core_initialized();

        let actions = deploy_app(ref world);

        actions.init();

        set_caller(player_1);

        let color = encode_rgba(255, 255, 255, 255); // White color

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
                    player_override: Option::None,
                    system_override: Option::None,
                    area_hint: Option::None,
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
                    player_override: Option::None,
                    system_override: Option::None,
                    area_hint: Option::None,
                    position: Position { x: 10, y: 10 },
                    color: color
                },
            );
    }
}
