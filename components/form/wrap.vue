<template>
  <form
    class="form"
    @submit.prevent="$emit('submit', $event)"
    @change="($event) => $emit('change', $event)"
  >
    <slot />
    <section class="form-footer">
      <button type="submit">submit</button>
    </section>
  </form>
</template>

<script>
export default {
  // props: {
  //   validate: {
  //     type: Boolean,
  //     default: true,
  //   },
  // },
  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.form {
  .form-footer {
    margin-top: 4px;
    padding: 4px 0;
  }
}
</style>
