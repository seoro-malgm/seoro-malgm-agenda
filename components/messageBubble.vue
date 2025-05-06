<template>
  <div class="message" v-if="item?.text" @click="$emit('on-click', item)">
    <strong class="text">{{ item?.text }}</strong>
    <div class="message-footer">
      <small>{{ getDate(item?.createdAt) }}</small>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: [Object, String, Boolean, Function],
    default: null
  }
});

const getDate = time => {
  return new Date(time).toLocaleString();
};
</script>

<style lang="postcss" scoped>
.message {
  padding: 16px;
  background-color: $secondary;
  border-radius: 8px;
  transition: all 0.2s $default-ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05) translateY(-8px);
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.3);
  }
  position: relative;
  &:after {
    content: "";
    border: 8px solid transparent;

    /* (B1-2) NECESSARY TO POSITION THE "TAIL" */
    position: absolute;
    /* (B2-1) DOWN TRIANGLE */
    border-top-color: $secondary;
    border-bottom: 0;

    /* (B2-2) POSITION AT BOTTOM */
    bottom: -8px;
    left: 20%;
    margin-left: -8px;
  }
  .text {
    font-size: 16px;
    font-weight: 700;
  }
  .message-footer {
    small {
      font-size: 18px;
      color: $secondary;
    }
  }
}
</style>
