<template>
  <div class="input-group">
    <label class="input-label">
      <span class="input-title">{{ title }}</span>
      <input type="text" v-model="value" placeholder="입력해주세요." />
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "제목"
  },
  form: {
    type: Object,
    default: null
  },
  bind: {
    type: String,
    default: null
  }
});
const emits = defineEmits({
  input: payload => {
    // console.log("payload:", payload);
    return true;
  }
});
const value = ref(null);
watch(
  () => value.value,
  (n, o) => {
    emits("input", n);
  }
);
watch(
  () => props.form[props.bind],
  (n, o) => {
    value.value = n;
    emits("input", n);
  }
);
</script>

<style lang="postcss" scoped>
.input-group {
  margin-bottom: 4px;
  .input-label {
    .input-title {
      display: block;
      font-size: 20px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    input {
      width: calc(100% - 8px);
      padding: 4px;
      border: 0;
      border-bottom: 1px solid $primary;
      font-size: 20px;
    }
  }
}
</style>
