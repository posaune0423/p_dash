import {Manifest, Position} from "@/global/types.ts";
import {DojoCall} from "@dojoengine/core";
import getParamsDef from "@/dojo/utils/paramsDef.ts";
import {Calldata, RawArgs} from "starknet";
import {ParamDefinitionType} from "@/dojo/utils/Instruction.ts";
import {ZERO_ADDRESS} from "@/global/constants.ts";

export function generateDojoCall(
    params: ParamDefinitionType[],
    manifest: Manifest,
    contractName: string,
    action: string,
    position: Position,
    color: number
): DojoCall {

    const defaultParams = [
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        position.x,
        position.y,
        color,
    ]


    return {
        contractName,
        entrypoint: action,
        calldata: defaultParams
    }

}