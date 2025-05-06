<template>
  <div class="modal" :class="{ show: show }">
    <div class="modal-content">
      <header class="modal-header">
        <div class="util">
          <button @click.prevent.capture="$emit('close')">X</button>
        </div>
      </header>
      <div class="modal-body">
        <h6 class="text">
          {{ item?.text }}
        </h6>
      </div>
    </div>
    <!-- dim -->
    <div class="dim" @click.prevent.capture="$emit('close')" />
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: [Object, null],
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
});

watch(
  () => props.show,
  (n) => {
    // 모달이 열릴 때
    if (n) {
    }
  }
);
</script>

<style lang="scss" scoped>
.modal-content {
  width: 98vw;
  height: calc(100vh - 80px);
}
.modal-header {
  text-align: center;
  padding-top: 32px;

  position: relative;
  .util {
    position: absolute;
    top: 0;
    right: 0;
    button {
      border: 0;
      font-size: 24px;
    }
  }
}
.modal-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h6.text {
    text-align: center;
    font-size: 56px;
  }
}

.modal-footer {
}

.modal {
  .dim {
    pointer-events: none;
    backdrop-filter: blur(8px);
  }
}
</style>
