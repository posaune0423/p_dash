/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<ReturnType<typeof defineContractComponents>>;

export function defineContractComponents(world: World) {
    return {
        Block: (() => {
            return defineComponent(
                world,
                { x: RecsType.Number, y: RecsType.Number, block: RecsType.Number },
                {
                    metadata: {
                        name: "Block",
                        types: ["u32", "u32", "enum"],
                        customTypes: ["BlockType"],
                    },
                }
            );
        })(),
        Stage: (() => {
            return defineComponent(
                world,
                { id: RecsType.Number, x: RecsType.Number, y: RecsType.Number, w: RecsType.Number, h: RecsType.Number },
                {
                    metadata: {
                        name: "Stage",
                        types: ["usize", "u32", "u32", "u32", "u32"],
                        customTypes: [],
                    },
                }
            );
        })(),
        StageId: (() => {
            return defineComponent(
                world,
                { x: RecsType.Number, y: RecsType.Number, value: RecsType.Number },
                {
                    metadata: {
                        name: "StageId",
                        types: ["u32", "u32", "usize"],
                        customTypes: [],
                    },
                }
            );
        })(),
        Snake: (() => {
            return defineComponent(
                world,
                {
                    owner: RecsType.BigInt,
                    length: RecsType.Number,
                    first_segment_id: RecsType.Number,
                    last_segment_id: RecsType.Number,
                    direction: RecsType.Number,
                    color: RecsType.Number,
                    text: RecsType.BigInt,
                    is_dying: RecsType.Boolean,
                },
                {
                    metadata: {
                        name: "Snake",
                        types: ["contractaddress", "u8", "u32", "u32", "enum", "u32", "felt252", "bool"],
                        customTypes: ["Direction"],
                    },
                }
            );
        })(),
        SnakeSegment: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    previous_id: RecsType.Number,
                    next_id: RecsType.Number,
                    x: RecsType.Number,
                    y: RecsType.Number,
                    pixel_original_color: RecsType.Number,
                    pixel_original_text: RecsType.BigInt,
                    pixel_original_app: RecsType.BigInt,
                },
                {
                    metadata: {
                        name: "SnakeSegment",
                        types: ["u32", "u32", "u32", "u32", "u32", "u32", "felt252", "contractaddress"],
                        customTypes: [],
                    },
                }
            );
        })(),
        Permissions: (() => {
            return defineComponent(
                world,
                {
                    allowing_app: RecsType.BigInt,
                    allowed_app: RecsType.BigInt,
                    permission: {
                        app: RecsType.Boolean,
                        color: RecsType.Boolean,
                        owner: RecsType.Boolean,
                        text: RecsType.Boolean,
                        timestamp: RecsType.Boolean,
                        action: RecsType.Boolean,
                    },
                },
                {
                    metadata: {
                        name: "Permissions",
                        types: ["contractaddress", "contractaddress", "bool", "bool", "bool", "bool", "bool", "bool"],
                        customTypes: ["Permission"],
                    },
                }
            );
        })(),
        Pixel: (() => {
            return defineComponent(
                world,
                {
                    x: RecsType.Number,
                    y: RecsType.Number,
                    created_at: RecsType.BigInt,
                    updated_at: RecsType.BigInt,
                    app: RecsType.BigInt,
                    color: RecsType.Number,
                    owner: RecsType.BigInt,
                    text: RecsType.BigInt,
                    timestamp: RecsType.BigInt,
                    action: RecsType.BigInt,
                },
                {
                    metadata: {
                        name: "Pixel",
                        types: [
                            "u32",
                            "u32",
                            "u64",
                            "u64",
                            "contractaddress",
                            "u32",
                            "contractaddress",
                            "felt252",
                            "u64",
                            "felt252",
                        ],
                        customTypes: [],
                    },
                }
            );
        })(),
        QueueItem: (() => {
            return defineComponent(
                world,
                { id: RecsType.BigInt, valid: RecsType.Boolean },
                {
                    metadata: {
                        name: "QueueItem",
                        types: ["felt252", "bool"],
                        customTypes: [],
                    },
                }
            );
        })(),
        App: (() => {
            return defineComponent(
                world,
                {
                    system: RecsType.BigInt,
                    name: RecsType.BigInt,
                    manifest: RecsType.BigInt,
                    icon: RecsType.BigInt,
                    action: RecsType.BigInt,
                },
                {
                    metadata: {
                        name: "App",
                        types: ["contractaddress", "felt252", "felt252", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),
        AppName: (() => {
            return defineComponent(
                world,
                { name: RecsType.BigInt, system: RecsType.BigInt },
                {
                    metadata: {
                        name: "AppName",
                        types: ["felt252", "contractaddress"],
                        customTypes: [],
                    },
                }
            );
        })(),
        AppUser: (() => {
            return defineComponent(
                world,
                { system: RecsType.BigInt, player: RecsType.BigInt, action: RecsType.BigInt },
                {
                    metadata: {
                        name: "AppUser",
                        types: ["contractaddress", "contractaddress", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),
        CoreActionsAddress: (() => {
            return defineComponent(
                world,
                { key: RecsType.BigInt, value: RecsType.BigInt },
                {
                    metadata: {
                        name: "CoreActionsAddress",
                        types: ["felt252", "contractaddress"],
                        customTypes: [],
                    },
                }
            );
        })(),
        Instruction: (() => {
            return defineComponent(
                world,
                { system: RecsType.BigInt, selector: RecsType.BigInt, instruction: RecsType.BigInt },
                {
                    metadata: {
                        name: "Instruction",
                        types: ["contractaddress", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),
    };
}
