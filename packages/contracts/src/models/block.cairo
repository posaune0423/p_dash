#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
pub enum BlockType {
    Empty,
    InitBlock,
    Block,
    Tile,
    Spike,
    Hole
}

// should we set the id for the game?? → For now, we set the id. but it should be deprecated for
// copmosability.
// how can we get all all blocks in the area? → excute loop in the whole area? / set the index for
// object?->hard for delete.
#[derive(Copy, Drop, Serde)]
#[dojo::model(namespace: "pixelaw", nomapping: true)]
pub struct Block {
    #[key]
    pub stage_id: felt252,
    #[key]
    pub x: u32,
    #[key]
    pub y: u32,
    pub blocktype: BlockType
}
