<template>
  <div>
    <div class="container mx-auto">
      <div class="grid grid-cols-1">
        <div>
          <IgntCustomTokens class="px-2.5 mb-10" />
          <IgntChainInfo class="px-2.5 mb-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IgntCustomTokens from "../components/IgntCustomTokens.vue";
import IgntChainInfo from "../components/IgntChainInfo.vue";
</script>
