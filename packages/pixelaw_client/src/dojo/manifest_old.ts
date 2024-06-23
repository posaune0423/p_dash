// abi's for dojo 0.6.1.alpha-4
// models for pixelaw 0.2.0

export default function (worldAddress: string) {
    return {
        "contracts": [],
        "models": [
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "allowing_app",
                        "type": "ContractAddress",
                        "key": true
                    },
                    {
                        "name": "allowed_app",
                        "type": "ContractAddress",
                        "key": true
                    },
                    {
                        "name": "permission",
                        "type": "Permission",
                        "key": false
                    }
                ],
                "class_hash": "0x7114aa9a9209e2404dc623280a3319d079df23bd4572389eb53bd2303e33f3f",
                "original_class_hash": "0x7114aa9a9209e2404dc623280a3319d079df23bd4572389eb53bd2303e33f3f",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "permissionsImpl",
                        "interface_name": "pixelaw::core::models::permissions::Ipermissions"
                    },
                    {
                        "type": "enum",
                        "name": "core::bool",
                        "variants": [
                            {
                                "name": "False",
                                "type": "()"
                            },
                            {
                                "name": "True",
                                "type": "()"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::permissions::Permission",
                        "members": [
                            {
                                "name": "app",
                                "type": "core::bool"
                            },
                            {
                                "name": "color",
                                "type": "core::bool"
                            },
                            {
                                "name": "owner",
                                "type": "core::bool"
                            },
                            {
                                "name": "text",
                                "type": "core::bool"
                            },
                            {
                                "name": "timestamp",
                                "type": "core::bool"
                            },
                            {
                                "name": "action",
                                "type": "core::bool"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::permissions::Permissions",
                        "members": [
                            {
                                "name": "allowing_app",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "allowed_app",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "permission",
                                "type": "pixelaw::core::models::permissions::Permission"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::permissions::Ipermissions",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::permissions::Permissions"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::permissions::permissions::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::permissions::permissions"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "x",
                        "type": "u32",
                        "key": true
                    },
                    {
                        "name": "y",
                        "type": "u32",
                        "key": true
                    },
                    {
                        "name": "created_at",
                        "type": "u64",
                        "key": false
                    },
                    {
                        "name": "updated_at",
                        "type": "u64",
                        "key": false
                    },
                    {
                        "name": "app",
                        "type": "ContractAddress",
                        "key": false
                    },
                    {
                        "name": "color",
                        "type": "u32",
                        "key": false
                    },
                    {
                        "name": "owner",
                        "type": "ContractAddress",
                        "key": false
                    },
                    {
                        "name": "text",
                        "type": "felt252",
                        "key": false
                    },
                    {
                        "name": "timestamp",
                        "type": "u64",
                        "key": false
                    },
                    {
                        "name": "action",
                        "type": "felt252",
                        "key": false
                    }
                ],
                "class_hash": "0x38efdcd6ae82129f9cda845ae0d989de2f0b9096a1719a36bd5f4117b0d5b84",
                "original_class_hash": "0x38efdcd6ae82129f9cda845ae0d989de2f0b9096a1719a36bd5f4117b0d5b84",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "pixelImpl",
                        "interface_name": "pixelaw::core::models::pixel::Ipixel"
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::pixel::Pixel",
                        "members": [
                            {
                                "name": "x",
                                "type": "core::integer::u32"
                            },
                            {
                                "name": "y",
                                "type": "core::integer::u32"
                            },
                            {
                                "name": "created_at",
                                "type": "core::integer::u64"
                            },
                            {
                                "name": "updated_at",
                                "type": "core::integer::u64"
                            },
                            {
                                "name": "app",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "color",
                                "type": "core::integer::u32"
                            },
                            {
                                "name": "owner",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "text",
                                "type": "core::felt252"
                            },
                            {
                                "name": "timestamp",
                                "type": "core::integer::u64"
                            },
                            {
                                "name": "action",
                                "type": "core::felt252"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::pixel::Ipixel",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::pixel::Pixel"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::pixel::pixel::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::pixel::pixel"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "id",
                        "type": "felt252",
                        "key": true
                    },
                    {
                        "name": "valid",
                        "type": "bool",
                        "key": false
                    }
                ],
                "class_hash": "0x7346556d7c1f2737dc6a328798d8461a7a7c7dd9d37051e19ad8f2dcaa2d6c3",
                "original_class_hash": "0x7346556d7c1f2737dc6a328798d8461a7a7c7dd9d37051e19ad8f2dcaa2d6c3",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "queue_itemImpl",
                        "interface_name": "pixelaw::core::models::queue::Iqueue_item"
                    },
                    {
                        "type": "enum",
                        "name": "core::bool",
                        "variants": [
                            {
                                "name": "False",
                                "type": "()"
                            },
                            {
                                "name": "True",
                                "type": "()"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::queue::QueueItem",
                        "members": [
                            {
                                "name": "id",
                                "type": "core::felt252"
                            },
                            {
                                "name": "valid",
                                "type": "core::bool"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::queue::Iqueue_item",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::queue::QueueItem"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::queue::queue_item::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::queue::queue_item"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "system",
                        "type": "ContractAddress",
                        "key": true
                    },
                    {
                        "name": "name",
                        "type": "felt252",
                        "key": false
                    },
                    {
                        "name": "manifest",
                        "type": "felt252",
                        "key": false
                    },
                    {
                        "name": "icon",
                        "type": "felt252",
                        "key": false
                    },
                    {
                        "name": "action",
                        "type": "felt252",
                        "key": false
                    }
                ],
                "class_hash": "0x205ac5cf4365398751209a3ae329e0231e7ec6aeef39a3ea08c0199eebe19b7",
                "original_class_hash": "0x205ac5cf4365398751209a3ae329e0231e7ec6aeef39a3ea08c0199eebe19b7",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "appImpl",
                        "interface_name": "pixelaw::core::models::registry::Iapp"
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::registry::App",
                        "members": [
                            {
                                "name": "system",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "manifest",
                                "type": "core::felt252"
                            },
                            {
                                "name": "icon",
                                "type": "core::felt252"
                            },
                            {
                                "name": "action",
                                "type": "core::felt252"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::registry::Iapp",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::registry::App"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::registry::app::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::registry::app"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "name",
                        "type": "felt252",
                        "key": true
                    },
                    {
                        "name": "system",
                        "type": "ContractAddress",
                        "key": false
                    }
                ],
                "class_hash": "0x1591fcd1a91cead404601627c9424f261c59f3ad91ac75f094fbc6ef00199c9",
                "original_class_hash": "0x1591fcd1a91cead404601627c9424f261c59f3ad91ac75f094fbc6ef00199c9",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "app_nameImpl",
                        "interface_name": "pixelaw::core::models::registry::Iapp_name"
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::registry::AppName",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "system",
                                "type": "core::starknet::contract_address::ContractAddress"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::registry::Iapp_name",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::registry::AppName"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::registry::app_name::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::registry::app_name"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "system",
                        "type": "ContractAddress",
                        "key": true
                    },
                    {
                        "name": "player",
                        "type": "ContractAddress",
                        "key": true
                    },
                    {
                        "name": "action",
                        "type": "felt252",
                        "key": false
                    }
                ],
                "class_hash": "0x1222a58865d73a2c24877be8d31de954c98299f88aea23de68fab05749f2b60",
                "original_class_hash": "0x1222a58865d73a2c24877be8d31de954c98299f88aea23de68fab05749f2b60",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "app_userImpl",
                        "interface_name": "pixelaw::core::models::registry::Iapp_user"
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::registry::AppUser",
                        "members": [
                            {
                                "name": "system",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "player",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "action",
                                "type": "core::felt252"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::registry::Iapp_user",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::registry::AppUser"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::registry::app_user::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::registry::app_user"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "key",
                        "type": "felt252",
                        "key": true
                    },
                    {
                        "name": "value",
                        "type": "ContractAddress",
                        "key": false
                    }
                ],
                "class_hash": "0x2aae4d0d1f8bfa226a43ef15f435dbbc234dcac20ebaa8bbc23be240a831897",
                "original_class_hash": "0x2aae4d0d1f8bfa226a43ef15f435dbbc234dcac20ebaa8bbc23be240a831897",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "core_actions_addressImpl",
                        "interface_name": "pixelaw::core::models::registry::Icore_actions_address"
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::registry::CoreActionsAddress",
                        "members": [
                            {
                                "name": "key",
                                "type": "core::felt252"
                            },
                            {
                                "name": "value",
                                "type": "core::starknet::contract_address::ContractAddress"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::registry::Icore_actions_address",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::registry::CoreActionsAddress"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::registry::core_actions_address::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::registry::core_actions_address"
            },
            {
                "kind": "DojoModel",
                "members": [
                    {
                        "name": "system",
                        "type": "ContractAddress",
                        "key": true
                    },
                    {
                        "name": "selector",
                        "type": "felt252",
                        "key": true
                    },
                    {
                        "name": "instruction",
                        "type": "felt252",
                        "key": false
                    }
                ],
                "class_hash": "0x51773284c3ae4efb8c10e3c375b7a77cbbf6993f6b7057ba3f395dd3d970a3d",
                "original_class_hash": "0x51773284c3ae4efb8c10e3c375b7a77cbbf6993f6b7057ba3f395dd3d970a3d",
                "abi": [
                    {
                        "type": "impl",
                        "name": "DojoModelImpl",
                        "interface_name": "dojo::model::IDojoModel"
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::integer::u8>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::integer::u8>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::felt252>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::felt252>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<core::array::Span::<core::felt252>>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Struct",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>",
                        "members": [
                            {
                                "name": "snapshot",
                                "type": "@core::array::Array::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "struct",
                        "name": "dojo::database::introspect::Enum",
                        "members": [
                            {
                                "name": "name",
                                "type": "core::felt252"
                            },
                            {
                                "name": "attrs",
                                "type": "core::array::Span::<core::felt252>"
                            },
                            {
                                "name": "children",
                                "type": "core::array::Span::<(core::felt252, core::array::Span::<core::felt252>)>"
                            }
                        ]
                    },
                    {
                        "type": "enum",
                        "name": "dojo::database::introspect::Ty",
                        "variants": [
                            {
                                "name": "Primitive",
                                "type": "core::felt252"
                            },
                            {
                                "name": "Struct",
                                "type": "dojo::database::introspect::Struct"
                            },
                            {
                                "name": "Enum",
                                "type": "dojo::database::introspect::Enum"
                            },
                            {
                                "name": "Tuple",
                                "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                            },
                            {
                                "name": "Array",
                                "type": "core::integer::u32"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "dojo::model::IDojoModel",
                        "items": [
                            {
                                "type": "function",
                                "name": "name",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::felt252"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "unpacked_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "packed_size",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::integer::u32"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "layout",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "core::array::Span::<core::integer::u8>"
                                    }
                                ],
                                "state_mutability": "view"
                            },
                            {
                                "type": "function",
                                "name": "schema",
                                "inputs": [],
                                "outputs": [
                                    {
                                        "type": "dojo::database::introspect::Ty"
                                    }
                                ],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "impl",
                        "name": "instructionImpl",
                        "interface_name": "pixelaw::core::models::registry::Iinstruction"
                    },
                    {
                        "type": "struct",
                        "name": "pixelaw::core::models::registry::Instruction",
                        "members": [
                            {
                                "name": "system",
                                "type": "core::starknet::contract_address::ContractAddress"
                            },
                            {
                                "name": "selector",
                                "type": "core::felt252"
                            },
                            {
                                "name": "instruction",
                                "type": "core::felt252"
                            }
                        ]
                    },
                    {
                        "type": "interface",
                        "name": "pixelaw::core::models::registry::Iinstruction",
                        "items": [
                            {
                                "type": "function",
                                "name": "ensure_abi",
                                "inputs": [
                                    {
                                        "name": "model",
                                        "type": "pixelaw::core::models::registry::Instruction"
                                    }
                                ],
                                "outputs": [],
                                "state_mutability": "view"
                            }
                        ]
                    },
                    {
                        "type": "event",
                        "name": "pixelaw::core::models::registry::instruction::Event",
                        "kind": "enum",
                        "variants": []
                    }
                ],
                "name": "pixelaw::core::models::registry::instruction"
            }
        ],
        "world": {
            "abi": [
                {
                    "type": "impl",
                    "name": "World",
                    "interface_name": "dojo::world::IWorld"
                },
                {
                    "type": "struct",
                    "name": "core::array::Span::<core::felt252>",
                    "members": [
                        {
                            "name": "snapshot",
                            "type": "@core::array::Array::<core::felt252>"
                        }
                    ]
                },
                {
                    "type": "struct",
                    "name": "dojo::resource_metadata::ResourceMetadata",
                    "members": [
                        {
                            "name": "resource_id",
                            "type": "core::felt252"
                        },
                        {
                            "name": "metadata_uri",
                            "type": "core::array::Span::<core::felt252>"
                        }
                    ]
                },
                {
                    "type": "struct",
                    "name": "core::array::Span::<core::integer::u8>",
                    "members": [
                        {
                            "name": "snapshot",
                            "type": "@core::array::Array::<core::integer::u8>"
                        }
                    ]
                },
                {
                    "type": "enum",
                    "name": "core::bool",
                    "variants": [
                        {
                            "name": "False",
                            "type": "()"
                        },
                        {
                            "name": "True",
                            "type": "()"
                        }
                    ]
                },
                {
                    "type": "interface",
                    "name": "dojo::world::IWorld",
                    "items": [
                        {
                            "type": "function",
                            "name": "metadata",
                            "inputs": [
                                {
                                    "name": "resource_id",
                                    "type": "core::felt252"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "dojo::resource_metadata::ResourceMetadata"
                                }
                            ],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "set_metadata",
                            "inputs": [
                                {
                                    "name": "metadata",
                                    "type": "dojo::resource_metadata::ResourceMetadata"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "model",
                            "inputs": [
                                {
                                    "name": "name",
                                    "type": "core::felt252"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "(core::starknet::class_hash::ClassHash, core::starknet::contract_address::ContractAddress)"
                                }
                            ],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "register_model",
                            "inputs": [
                                {
                                    "name": "class_hash",
                                    "type": "core::starknet::class_hash::ClassHash"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "deploy_contract",
                            "inputs": [
                                {
                                    "name": "salt",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "class_hash",
                                    "type": "core::starknet::class_hash::ClassHash"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "core::starknet::contract_address::ContractAddress"
                                }
                            ],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "upgrade_contract",
                            "inputs": [
                                {
                                    "name": "address",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                },
                                {
                                    "name": "class_hash",
                                    "type": "core::starknet::class_hash::ClassHash"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "core::starknet::class_hash::ClassHash"
                                }
                            ],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "uuid",
                            "inputs": [],
                            "outputs": [
                                {
                                    "type": "core::integer::u32"
                                }
                            ],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "emit",
                            "inputs": [
                                {
                                    "name": "keys",
                                    "type": "core::array::Array::<core::felt252>"
                                },
                                {
                                    "name": "values",
                                    "type": "core::array::Span::<core::felt252>"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "entity",
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "keys",
                                    "type": "core::array::Span::<core::felt252>"
                                },
                                {
                                    "name": "layout",
                                    "type": "core::array::Span::<core::integer::u8>"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "core::array::Span::<core::felt252>"
                                }
                            ],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "set_entity",
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "keys",
                                    "type": "core::array::Span::<core::felt252>"
                                },
                                {
                                    "name": "values",
                                    "type": "core::array::Span::<core::felt252>"
                                },
                                {
                                    "name": "layout",
                                    "type": "core::array::Span::<core::integer::u8>"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "base",
                            "inputs": [],
                            "outputs": [
                                {
                                    "type": "core::starknet::class_hash::ClassHash"
                                }
                            ],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "delete_entity",
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "keys",
                                    "type": "core::array::Span::<core::felt252>"
                                },
                                {
                                    "name": "layout",
                                    "type": "core::array::Span::<core::integer::u8>"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "is_owner",
                            "inputs": [
                                {
                                    "name": "address",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                },
                                {
                                    "name": "resource",
                                    "type": "core::felt252"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "core::bool"
                                }
                            ],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "grant_owner",
                            "inputs": [
                                {
                                    "name": "address",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                },
                                {
                                    "name": "resource",
                                    "type": "core::felt252"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "revoke_owner",
                            "inputs": [
                                {
                                    "name": "address",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                },
                                {
                                    "name": "resource",
                                    "type": "core::felt252"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "is_writer",
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "system",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                }
                            ],
                            "outputs": [
                                {
                                    "type": "core::bool"
                                }
                            ],
                            "state_mutability": "view"
                        },
                        {
                            "type": "function",
                            "name": "grant_writer",
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "system",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        },
                        {
                            "type": "function",
                            "name": "revoke_writer",
                            "inputs": [
                                {
                                    "name": "model",
                                    "type": "core::felt252"
                                },
                                {
                                    "name": "system",
                                    "type": "core::starknet::contract_address::ContractAddress"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        }
                    ]
                },
                {
                    "type": "impl",
                    "name": "UpgradeableWorld",
                    "interface_name": "dojo::world::IUpgradeableWorld"
                },
                {
                    "type": "interface",
                    "name": "dojo::world::IUpgradeableWorld",
                    "items": [
                        {
                            "type": "function",
                            "name": "upgrade",
                            "inputs": [
                                {
                                    "name": "new_class_hash",
                                    "type": "core::starknet::class_hash::ClassHash"
                                }
                            ],
                            "outputs": [],
                            "state_mutability": "external"
                        }
                    ]
                },
                {
                    "type": "constructor",
                    "name": "constructor",
                    "inputs": [
                        {
                            "name": "contract_base",
                            "type": "core::starknet::class_hash::ClassHash"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::WorldSpawned",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "address",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        },
                        {
                            "name": "creator",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::ContractDeployed",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "salt",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "class_hash",
                            "type": "core::starknet::class_hash::ClassHash",
                            "kind": "data"
                        },
                        {
                            "name": "address",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::ContractUpgraded",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "class_hash",
                            "type": "core::starknet::class_hash::ClassHash",
                            "kind": "data"
                        },
                        {
                            "name": "address",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::WorldUpgraded",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "class_hash",
                            "type": "core::starknet::class_hash::ClassHash",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::MetadataUpdate",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "resource",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "uri",
                            "type": "core::array::Span::<core::felt252>",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::ModelRegistered",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "name",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "class_hash",
                            "type": "core::starknet::class_hash::ClassHash",
                            "kind": "data"
                        },
                        {
                            "name": "prev_class_hash",
                            "type": "core::starknet::class_hash::ClassHash",
                            "kind": "data"
                        },
                        {
                            "name": "address",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        },
                        {
                            "name": "prev_address",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::StoreSetRecord",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "table",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "keys",
                            "type": "core::array::Span::<core::felt252>",
                            "kind": "data"
                        },
                        {
                            "name": "values",
                            "type": "core::array::Span::<core::felt252>",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::StoreDelRecord",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "table",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "keys",
                            "type": "core::array::Span::<core::felt252>",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::WriterUpdated",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "model",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "system",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        },
                        {
                            "name": "value",
                            "type": "core::bool",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::OwnerUpdated",
                    "kind": "struct",
                    "members": [
                        {
                            "name": "address",
                            "type": "core::starknet::contract_address::ContractAddress",
                            "kind": "data"
                        },
                        {
                            "name": "resource",
                            "type": "core::felt252",
                            "kind": "data"
                        },
                        {
                            "name": "value",
                            "type": "core::bool",
                            "kind": "data"
                        }
                    ]
                },
                {
                    "type": "event",
                    "name": "dojo::world::world::Event",
                    "kind": "enum",
                    "variants": [
                        {
                            "name": "WorldSpawned",
                            "type": "dojo::world::world::WorldSpawned",
                            "kind": "nested"
                        },
                        {
                            "name": "ContractDeployed",
                            "type": "dojo::world::world::ContractDeployed",
                            "kind": "nested"
                        },
                        {
                            "name": "ContractUpgraded",
                            "type": "dojo::world::world::ContractUpgraded",
                            "kind": "nested"
                        },
                        {
                            "name": "WorldUpgraded",
                            "type": "dojo::world::world::WorldUpgraded",
                            "kind": "nested"
                        },
                        {
                            "name": "MetadataUpdate",
                            "type": "dojo::world::world::MetadataUpdate",
                            "kind": "nested"
                        },
                        {
                            "name": "ModelRegistered",
                            "type": "dojo::world::world::ModelRegistered",
                            "kind": "nested"
                        },
                        {
                            "name": "StoreSetRecord",
                            "type": "dojo::world::world::StoreSetRecord",
                            "kind": "nested"
                        },
                        {
                            "name": "StoreDelRecord",
                            "type": "dojo::world::world::StoreDelRecord",
                            "kind": "nested"
                        },
                        {
                            "name": "WriterUpdated",
                            "type": "dojo::world::world::WriterUpdated",
                            "kind": "nested"
                        },
                        {
                            "name": "OwnerUpdated",
                            "type": "dojo::world::world::OwnerUpdated",
                            "kind": "nested"
                        }
                    ]
                }
            ],
            "address": worldAddress
        }
    }
}