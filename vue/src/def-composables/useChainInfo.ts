import { computed, ref } from "vue";
import { useClient } from "@/composables/useClient";

export interface ChainInfo {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  stakeCurrency: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  };
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: Array<{
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }>;
  feeCurrencies: Array<{
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }>;
}

export const useChainInfo = () => {
  const client = useClient();
  const chainInfo = ref<ChainInfo | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchChainInfo = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Récupérer les informations de la chaîne depuis l'API
      const queryClient = (await import("example-client-ts/cosmos.base.tendermint.v1beta1/module")).queryClient;
      const bankQueryClient = (await import("example-client-ts/cosmos.bank.v1beta1/module")).queryClient;
      const stakingQueryClient = (await import("example-client-ts/cosmos.staking.v1beta1/module")).queryClient;

      const stakingqc = stakingQueryClient({ addr: client.env.apiURL });
      const staking = await (await stakingqc.queryParams()).data;
      
      const qc = queryClient({ addr: client.env.apiURL });
      const node_info = await (await qc.serviceGetNodeInfo()).data;
      
      const bankqc = bankQueryClient({ addr: client.env.apiURL });
      const tokens = await (await bankqc.queryTotalSupply()).data;

      const chainId = node_info.default_node_info?.network ?? "";
      const chainName = chainId?.toUpperCase() + " Network";
      const addrPrefix = client.env.prefix ?? "cosmos";
      const rpc = client.env.rpcURL;
      const rest = client.env.apiURL;

      const bip44 = {
        coinType: 118,
      };

      const bech32Config = {
        bech32PrefixAccAddr: addrPrefix,
        bech32PrefixAccPub: addrPrefix + "pub",
        bech32PrefixValAddr: addrPrefix + "valoper",
        bech32PrefixValPub: addrPrefix + "valoperpub",
        bech32PrefixConsAddr: addrPrefix + "valcons",
        bech32PrefixConsPub: addrPrefix + "valconspub",
      };

      const currencies = tokens.supply?.map((x) => ({
        coinDenom: x.denom?.toUpperCase() ?? "",
        coinMinimalDenom: x.denom ?? "",
        coinDecimals: 0,
      })) ?? [];

      const stakeCurrency = {
        coinDenom: staking.params?.bond_denom?.toUpperCase() ?? "",
        coinMinimalDenom: staking.params?.bond_denom ?? "",
        coinDecimals: 0,
      };

      const feeCurrencies = tokens.supply?.map((x) => ({
        coinDenom: x.denom?.toUpperCase() ?? "",
        coinMinimalDenom: x.denom ?? "",
        coinDecimals: 0,
      })) ?? [];

      chainInfo.value = {
        chainId,
        chainName,
        rpc,
        rest,
        stakeCurrency,
        bip44,
        bech32Config,
        currencies,
        feeCurrencies,
      };

    } catch (err) {
      console.error("Error fetching chain info:", err);
      error.value = err instanceof Error ? err.message : "Failed to fetch chain info";
      chainInfo.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const chainInfoJson = computed(() => {
    if (chainInfo.value) {
      return JSON.stringify(chainInfo.value, null, 2);
    }
    return null;
  });

  return {
    chainInfo,
    chainInfoJson,
    fetchChainInfo,
    isLoading,
    error,
  };
};
