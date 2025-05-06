<template>
  <div>
    <header>
      <h3>어떤 주제의 방인가요?</h3>
    </header>
    <form-input-checkbox
      :items="subjects"
      @input="$emit('input', ['subject', $event])"
      :form="form"
      bind="subject"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: null
  }
  // bind: {
  //   type: String,
  //   default: null,
  // },
});
const subjects = ref([
  {
    text: "회의",
    value: "meeting"
  },
  {
    text: "네트워킹",
    value: "networking"
  },
  {
    text: "QnA",
    value: "qna"
  },
  {
    text: "아이디어 수집",
    value: "get_idea"
  },
  {
    text: "의견 수집",
    value: "get_opinion"
  },
  {
    text: "아무말대잔치",
    value: "etc"
  }
]);
</script>

<style lang="postcss" scoped>
header {
  margin-bottom: 8px;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
