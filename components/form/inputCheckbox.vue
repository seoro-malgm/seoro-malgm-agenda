<template>
  <div class="input-group">
    <ul class="checkbox-list">
      <li v-for="(item, i) in items" :key="i" class="list-item">
        <label class="input-label">
          <input type="checkbox" :value="item.value" v-model="value" />
          <span class="input-text">{{ item.text }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: []
  }
});
const emits = defineEmits({
  input: payload => {
    return true;
  }
});
const value = ref([]);
watch(
  () => value.value,
  (n, o) => {
    emits("input", n);
  }
);
</script>

<style lang="postcss" scoped>
.input-group {
  margin-bottom: 4px;
  .checkbox-list {
    .list-item {
      margin-bottom: 12px;
    }
  }
  .input-label {
    display: flex;
    align-items: center;

    input {
      border: 0;
      border-bottom: 1px solid $primary;
      width: 20px;
      height: 20px;
    }
    .input-text {
      display: block;
      font-size: 20px;
      font-weight: 700;
      margin-left: 8px;
    }
  }
}
</style>
