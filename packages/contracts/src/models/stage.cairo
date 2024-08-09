// we specify the stage by upp-right coordinates and width.

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Stage {
    #[key]
    id: usize,
    x: u32,
    y: u32,
    w: u32,
    h: u32,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct StageId {
    #[key]
    x: u32,
    #[key]
    y: u32,
    value: usize
}
