<template>
  <div class="input-group">
    <textarea rows="4" v-model="value" placeholder="내용을 입력하세요" />
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: null,
  },
  bind: {
    type: String,
    default: null,
  },
});
const emits = defineEmits({
  input: (payload) => {
    // console.log("payload:", payload);
    return true;
  },
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
    // emits("input", n);
  }
);
</script>

<style lang="scss" scoped>
.input-group {
  background-color: white;
  border: 1px solid $primary;
  padding: 1rem;
  textarea {
    font-size: 24px;
    width: 100%;
    height: 100%;
  }
}
</style>
