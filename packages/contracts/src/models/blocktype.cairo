#[derive(Serde, Copy, Drop, Introspect)]
pub enum BlockType {
    Unknown: (),
    InitBlock: (),
    Block: (),
    Spike: (),
    Hole: ()
}

// should we set the id for the game?? → For now, we set the id. but it should be deprecated for
// copmosability.
// how can we get all all blocks in the area? → excute loop in the whole area? / set the index for
// object?->hard for delete.
#[derive(Copy, Drop, Serde)]
#[dojo::model(namespace: "p_dash", nomapping: true)]
pub struct Block {
    // #[key]
    // id: usize
    #[key]
    pub x: u32,
    #[key]
    pub y: u32,
    pub block: BlockType
}


impl BlockTypeIntoFelt252 of Into<BlockType, felt252> {
    fn into(self: BlockType) -> felt252 {
        match self {
            BlockType::Unknown(()) => 0,
            BlockType::InitBlock(()) => 1,
            BlockType::Block(()) => 2,
            BlockType::Spike(()) => 3,
            BlockType::Hole(()) => 4,
        }
    }
}
