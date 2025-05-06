<template>
  <div>
    <!-- <global-nav /> -->
    <main class="mb-2 px-3 pt-3 h-auto">
      <slot></slot>
    </main>
    <!-- <global-footer :fluid="true" /> -->
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
#main {
  margin-bottom: 8px;
  padding: 12px 12px 0;
  height: unset;
}
</style>
