use starknet::ContractAddress;

// we specify the stage by upp-right coordinates and width.
#[derive(Copy, Drop, Serde)]
#[dojo::model(namespace: "pixelaw", nomapping: true)]
pub struct Stage {
    #[key]
    pub id: usize,
    pub x: u32,
    pub y: u32,
    pub w: u32,
    pub h: u32,
    pub creator: ContractAddress,
}
