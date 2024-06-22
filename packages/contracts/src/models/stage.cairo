// we specify the stage by upp-right coordinates and width.

#[derive(Model, Copy, Drop, Serde)]
struct Stage {
    #[key]
    id: usize,
    x: u32,
    y: u32,
    w: u32,
    h: u32,
}

#[derive(Model, Copy, Drop, Serde)]
struct StageId {
    #[key]
    x: u32,
    #[key]
    y: u32,
    value: usize
}