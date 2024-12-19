#[cfg(test)]
mod tests {
    use dojo::model::{ModelStorage};
    use dojo::world::WorldStorageTrait;
    use dojo::world::storage::WorldStorage;
    use core::pedersen::pedersen;
    use pixelaw_test_helpers::{setup_core_initialized};

    use p_dash::models::block::{m_Block, Block, BlockType};
    use p_dash::models::stage::{m_Stage, Stage};

    use p_dash::systems::actions::{
        p_dash_actions, IPDashActionsDispatcher, IPDashActionsDispatcherTrait
    };
    use dojo_cairo_test::{NamespaceDef, TestResource, ContractDefTrait, ContractDef, WorldStorageTestTrait};
    use pixelaw::core::models::pixel::{Pixel};
    use pixelaw::core::utils::{DefaultParameters, Position, encode_rgba};

    use starknet::{contract_address_const, testing::set_account_contract_address};

    fn namespace_def() -> NamespaceDef {
        let ndef = NamespaceDef {
            namespace: "pixelaw", resources: [
                TestResource::Model(m_Block::TEST_CLASS_HASH),
                TestResource::Model(m_Stage::TEST_CLASS_HASH),
                TestResource::Contract(p_dash_actions::TEST_CLASS_HASH),
            ].span()
        };

        ndef
    }

    fn contract_defs() -> Span<ContractDef> {
        [
            ContractDefTrait::new(@"pixelaw", @"p_dash_actions")
                .with_writer_of([dojo::utils::bytearray_hash(@"pixelaw")].span())
        ].span()
    }

    fn setup_p_dash_initialized() -> (WorldStorage, IPDashActionsDispatcher) {
        let (world, _core_actions, _player_1, _player_2) = setup_core_initialized();
        let ndef = namespace_def();
        world.sync_perms_and_inits(contract_defs());

        let (actions_system_addr, _) = world.dns(@"p_dash_actions").unwrap();
        let actions = IPDashActionsDispatcher { contract_address: actions_system_addr };
        (world, actions)
    }


    #[test]
    fn test_should_initialize_stage() {
        // Deploy everything
        let (world, actions) = setup_p_dash_initialized();

        let player1 = contract_address_const::<0x1337>();
        set_account_contract_address(player1);

        println!("Passed set_account_contract_address");

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
                    player_override: Option::Some(player1),
                    system_override: Option::Some(contract_address_const::<0>()),
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
        println!("Successfully initialized stage");

        // Test put_block
        actions
            .put_block(
                stage_id,
                BlockType::Block,
                DefaultParameters {
                    player_override: Option::Some(player1),
                    system_override: Option::Some(contract_address_const::<0>()),
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
        let (_, actions) = setup_p_dash_initialized();

        let player1 = contract_address_const::<0x1337>();
        set_account_contract_address(player1);

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
                    player_override: Option::Some(player1),
                    system_override: Option::Some(contract_address_const::<0>()),
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
                    player_override: Option::Some(player1),
                    system_override: Option::Some(contract_address_const::<0>()),
                    area_hint: Option::None,
                    position: Position { x: 10, y: 10 },
                    color: color
                },
            );
    }
}
