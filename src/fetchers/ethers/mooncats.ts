import type { Contract, ContractFunction } from "@ethersproject/contracts"
import type { ContractMethod } from "../../types"
import type { EthersFetcherConfigEthersLoaded } from "./types"

export function moonCatsCatId(config: EthersFetcherConfigEthersLoaded) {
  return async function moonCatsCatId(
    tokenId: string,
    method: ContractMethod
  ): Promise<string> {
    const wrappedContract = new config.ethers.Contract(
      method.address,
      method.humanReadableAbi,
      config.provider
    ) as InstanceType<typeof Contract> & {
      _tokenIDToCatID: ContractFunction<string>
    }
    const result = await wrappedContract._tokenIDToCatID(tokenId)
    return result ?? ""
  }
}
