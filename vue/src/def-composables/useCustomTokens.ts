import { computed, ref } from "vue";
import { useClient } from "@/composables/useClient";

export interface CustomToken {
  denom: string;
  description: string;
  ticker: string;
  precision: number;
  url: string;
  max_supply: number;
  supply: number;
  can_change_max_supply: boolean;
  owner: string;
}

export const useCustomTokens = () => {
  const client = useClient();
  const tokens = ref<CustomToken[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchCustomTokens = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      
      // Utiliser le client pour récupérer la liste des tokens personnalisés
      const response = await client.ExampleTokenfactoryV_1.query.queryListDenom();
      
      if (response.data && response.data.denom) {
        tokens.value = response.data.denom;
      } else {
        tokens.value = [];
      }
    } catch (err) {
      console.error("Error fetching custom tokens:", err);
      error.value = err instanceof Error ? err.message : "Failed to fetch custom tokens";
      tokens.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const customTokens = computed(() => ({
    tokens: tokens.value,
    isLoading: isLoading.value,
    error: error.value,
  }));

  return {
    customTokens,
    fetchCustomTokens,
    isLoading,
    error,
  };
};
