<template>
  <section>
    <header class="flex items-center justify-between">
      <h2 class="text-3xl text-black font-semibold p-0 m-0 mb-2.5 flex-1">
        Mes Tokens Personnalisés
      </h2>
      <button
        @click="fetchCustomTokens"
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Chargement...' : 'Actualiser' }}
      </button>
    </header>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      Erreur: {{ error }}
    </div>

    <table class="table-auto w-full">
      <thead v-if="customTokens.tokens.length">
        <tr>
          <td class="text-left text-xs text-black opacity-70">Ticker</td>
          <td class="text-left text-xs text-black opacity-70">Description</td>
          <td class="text-left text-xs text-black opacity-70">Denom</td>
          <td class="text-right text-xs text-black opacity-70">Supply</td>
          <td class="text-right text-xs text-black opacity-70">Propriétaire</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(token, index) in customTokens.tokens"
          :key="index"
          class="py-2 border-b border-gray-200"
        >
          <td class="py-3 font-semibold text-lg">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ token.ticker }}
            </span>
          </td>
          <td class="py-3 text-gray-700">
            {{ token.description }}
          </td>
          <td class="py-3 text-sm text-gray-500 font-mono">
            {{ token.denom }}
          </td>
          <td class="text-right py-3 font-bold text-black">
            {{ new Intl.NumberFormat("en-GB").format(token.supply) }}
          </td>
          <td class="text-right py-3 text-sm text-gray-600 font-mono">
            {{ token.owner.slice(0, 10) }}...{{ token.owner.slice(-6) }}
          </td>
        </tr>
      </tbody>
    </table>

    <template v-if="isLoading">
      <div role="status" class="w-100 animate-pulse flex flex-col">
        <div
          class="flex flex-row justify-between py-7 items-center flex-1"
          v-for="n in 3"
          :key="'loading-skel-' + n"
        >
          <div class="flex flex-1 items-center">
            <div
              class="w-8 h-8 mr-4 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
            <div class="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-20"></div>
          </div>
          <div
            class="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-40 -mr-2"
          ></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </template>

    <div
      v-if="!isLoading && !customTokens.tokens.length"
      class="text-left text-black opacity-75 text-md font-normal py-8"
    >
      Aucun token personnalisé trouvé
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCustomTokens } from "../def-composables/useCustomTokens";

const { customTokens, fetchCustomTokens, isLoading, error } = useCustomTokens();

onMounted(() => {
  fetchCustomTokens();
});
</script>
