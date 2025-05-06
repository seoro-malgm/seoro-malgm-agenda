<template>
  <div>
    <header>
      <h3>
        😉 반갑습니다! <br />
        새로운 방을 만들기 위해 몇 가지를 여쭤볼게요.
      </h3>
    </header>
    <form-input-text
      title="무엇을 위한 방인가요? 제목을 입력해주세요."
      :form="form"
      bind="title"
      @input="($event) => $emit('input', ['title', $event])"
    />
    <small>예시: OO모임 주간회의, XX행사 QnA</small>
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
