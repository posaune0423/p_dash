import {interpret, isInstruction, ParamDefinitionType, Variant} from "./Instruction.ts";
import {InterfaceType, Manifest} from "@/global/types.ts";

const DEFAULT_PARAMETERS_TYPE = 'pixelaw::core::utils::DefaultParameters'

const convertSnakeToPascal = (snakeCaseString: string) => {
    return snakeCaseString.split('_').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('')
}

export default function getParamsDef(
    manifest: Manifest,
    contractName: string,
    methodName: string,
    position: { x: number, y: number },
    strict?: boolean
): ParamDefinitionType[] {

    const interfaceName = `I${convertSnakeToPascal(contractName)}`
    const contract = manifest.contracts.find(c => c.name.includes(contractName))
    if (!contract) return []
    const abi = contract!.abi
    const methods = abi.find(x => x.type === 'interface' && x.name.includes(interfaceName)) as InterfaceType | undefined

    if (!methods) {
        if (strict) throw new Error(`unknown interface: ${interfaceName}`)
        else return []
    }
    if (!methods?.items) {
        if (strict) throw new Error(`no methods for interface: ${interfaceName}`)
        else return []
    }

    let functionDef = methods.items.find(method => method.name === methodName && method.type === 'function')
    if (!functionDef) {
        functionDef = methods.items.find(method => method.name === 'interact' && method.type === 'function')
        if (!functionDef) {
            if (strict) throw new Error(`function ${methodName} not found`)
            else return []
        }
    }
    const parameters = functionDef.inputs.filter(input => input.type !== DEFAULT_PARAMETERS_TYPE)

    return parameters.map(param => {
        if (isInstruction(param.name)) {
            // problem with types on contract.abi
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return interpret(contractName, position, param.name, contract.abi)
        }
        const isPrimitiveType = param.type.includes("core::integer") || param.type.includes("core::felt252")
        let type: 'number' | 'string' | 'enum' = 'number'
        let variants: { name: string, value: number }[] = []
        if (!isPrimitiveType) {
            const typeDefinition = abi.find(x => x.name === param.type)
            if (typeDefinition?.type === "enum") {
                variants = (typeDefinition?.variants ?? [])
                    .map((variant: Variant, index: string) => {
                        return {
                            name: variant.name,
                            value: index
                        }
                    })
                    .filter((variant: Variant) => variant.name !== 'None')
                type = 'enum'
            }
        } else if (param.type.includes("core::felt252")) {
            type = 'string'
        }
        return {
            name: param.name,
            type,

            // if is not primitive type fill these out
            variants,

            // for interpret instruction only
            transformValue: undefined,
            value: undefined,

        }
    })
}
