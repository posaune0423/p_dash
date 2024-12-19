use starknet::ContractAddress;

// we specify the stage by upp-right coordinates and width.
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Stage {
    #[key]
    pub id: felt252,
    pub x: u16,
    pub y: u16,
    pub w: u16,
    pub h: u16,
    pub creator: ContractAddress,
}
