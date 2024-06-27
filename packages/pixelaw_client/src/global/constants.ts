export const PUBLIC_TORII: string = "http://localhost:8080";

export const PUBLIC_NODE_URL: string = "http://localhost:5050";

export const PUBLIC_MANIFEST_URL: string = import.meta.env.PUBLIC_MANIFEST_URL;

export const CORE_VERSION: string = import.meta.env.CORE_VERSION;

export const BLOCK_TIME = 1_000;

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const PROPOSAL_CONTRACT_ADDRESS = "0x481aadb9eab76d625be9d0ab0af0155c9f162fd3af1113abd0d0308ddb9346e";
export const VOTING_CONTRACT_ADDRESS = "0x405fdfa192f0a756c50dc081d0a4a10afbc5ed29a774665ab6a34cef4d4a549";
export const GAME_ID = 1;

export const proposals = [
    {
        id: 1,
        title: "Adding A New Color: #FF00FF",
        proposer: "shora",
        forPoints: 4329,
        againstPoints: 30,
        status: "end in 5h30m",
        statusColor: "bg-green-500",
        comments: "This color is very important to me. I need it to express myself.",
    },
    {
        id: 2,
        title: "Extend the p/war event: 24 hours",
        proposer: "shora",
        forPoints: 250,
        againstPoints: 6030,
        status: "end in 18h45m",
        statusColor: "bg-green-500",
        comments: "I think",
    },
    {
        id: 3,
        title: "Add hunter system(future version)",
        proposer: "OwnerofJK",
        forPoints: 7000,
        againstPoints: 30,
        status: "closed",
        statusColor: "bg-purple-500",
        comments: "",
    },
    {
        id: 4,
        title: "Introduce New Voting Mechanism",
        proposer: "crypto123",
        forPoints: 1200,
        againstPoints: 450,
        status: "end in 2d14h",
        statusColor: "bg-green-500",
        comments: "",
    },
    {
        id: 5,
        title: "Increase Reward Points",
        proposer: "blockchain_guru",
        forPoints: 8000,
        againstPoints: 1500,
        status: "end in 3d6h",
        statusColor: "bg-green-500",
        comments: "",
    },
    {
        id: 6,
        title: "Update Governance Rules",
        proposer: "dao_master",
        forPoints: 500,
        againstPoints: 2500,
        status: "closed",
        statusColor: "bg-purple-500",
        comments: "",
    },
];
