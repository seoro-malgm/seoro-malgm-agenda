<template>
  <div>
    <form-input-text
      title="주최 혹은 주관처를 입력하세요(선택사항)"
      @input="($event) => $emit('input', ['host', $event])"
      :form="form"
      bind="host"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: null,
  },
  // bind: {
  //   type: String,
  //   default: null,
  // },
});
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 8px;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
