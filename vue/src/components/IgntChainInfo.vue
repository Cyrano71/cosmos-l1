<template>
  <section>
    <header class="flex items-center justify-between">
      <h2 class="text-3xl text-black font-semibold p-0 m-0 mb-2.5 flex-1">
        Informations de la Chaîne
      </h2>
      <button
        @click="fetchChainInfo"
        :disabled="isLoading"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Chargement...' : 'Actualiser' }}
      </button>
    </header>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      Erreur: {{ error }}
    </div>

    <div v-if="chainInfo" class="space-y-4">
      <!-- Informations principales -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Informations Principales</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="font-medium">Chain ID:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.chainId }}</span>
          </div>
          <div>
            <span class="font-medium">Nom:</span>
            <span class="ml-2">{{ chainInfo.chainName }}</span>
          </div>
          <div>
            <span class="font-medium">RPC:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.rpc }}</span>
          </div>
          <div>
            <span class="font-medium">REST API:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.rest }}</span>
          </div>
        </div>
      </div>

      <!-- Configuration Bech32 -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Configuration Bech32</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="font-medium">Adresse:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.bech32Config.bech32PrefixAccAddr }}</span>
          </div>
          <div>
            <span class="font-medium">Clé publique:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.bech32Config.bech32PrefixAccPub }}</span>
          </div>
          <div>
            <span class="font-medium">Validateur:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.bech32Config.bech32PrefixValAddr }}</span>
          </div>
          <div>
            <span class="font-medium">Consensus:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.bech32Config.bech32PrefixConsAddr }}</span>
          </div>
        </div>
      </div>

      <!-- Monnaie de stake -->
      <div class="bg-yellow-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Monnaie de Stake</h3>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <span class="font-medium">Dénomination:</span>
            <span class="ml-2">{{ chainInfo.stakeCurrency.coinDenom }}</span>
          </div>
          <div>
            <span class="font-medium">Dénomination minimale:</span>
            <span class="ml-2 font-mono text-sm">{{ chainInfo.stakeCurrency.coinMinimalDenom }}</span>
          </div>
          <div>
            <span class="font-medium">Décimales:</span>
            <span class="ml-2">{{ chainInfo.stakeCurrency.coinDecimals }}</span>
          </div>
        </div>
      </div>

      <!-- Configuration BIP44 -->
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Configuration BIP44</h3>
        <div>
          <span class="font-medium">Type de coin:</span>
          <span class="ml-2">{{ chainInfo.bip44.coinType }}</span>
        </div>
      </div>

      <!-- Devises -->
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Devises Disponibles ({{ chainInfo.currencies.length }})</h3>
        <div class="max-h-40 overflow-y-auto">
          <div v-for="(currency, index) in chainInfo.currencies" :key="index" class="mb-2 p-2 bg-white rounded">
            <div class="font-medium">{{ currency.coinDenom }}</div>
            <div class="text-sm text-gray-600 font-mono">{{ currency.coinMinimalDenom }}</div>
            <div class="text-xs text-gray-500">Décimales: {{ currency.coinDecimals }}</div>
          </div>
        </div>
      </div>

      <!-- JSON complet -->
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">JSON Complet</h3>
        <button
          @click="copyToClipboard"
          class="mb-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Copier le JSON
        </button>
        <pre class="bg-white p-4 rounded border text-xs overflow-x-auto">{{ chainInfoJson }}</pre>
      </div>
    </div>

    <template v-if="isLoading">
      <div role="status" class="w-100 animate-pulse flex flex-col">
        <div class="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded-lg dark:bg-gray-700 w-1/2 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded-lg dark:bg-gray-700 w-2/3"></div>
        <span class="sr-only">Loading...</span>
      </div>
    </template>

    <div
      v-if="!isLoading && !chainInfo"
      class="text-left text-black opacity-75 text-md font-normal py-8"
    >
      Aucune information de chaîne disponible
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useChainInfo } from "../def-composables/useChainInfo";

const { chainInfo, chainInfoJson, fetchChainInfo, isLoading, error } = useChainInfo();

const copyToClipboard = async () => {
  if (chainInfoJson.value) {
    try {
      await navigator.clipboard.writeText(chainInfoJson.value);
      alert("JSON copié dans le presse-papiers !");
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  }
};

onMounted(() => {
  fetchChainInfo();
});
</script>
