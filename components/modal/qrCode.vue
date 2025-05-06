<template>
  <div class="modal" :class="{ show: show }">
    <div class="modal-content">
      <header class="modal-header">
        <h4>
          {{ title ? `${title}에 참여해보세요!` : "링크를 공유해보세요!" }}
        </h4>
        <div class="util">
          <button @click="$emit('close')">X</button>
        </div>
      </header>
      <section class="modal-body">
        <div class="qrcode">
          <!-- <template v-if="pending"> -->
          <!-- <div class="pending-qr"> -->
          <!-- <span>QR코드를 생성중입니다 ...</span> -->
          <!-- </div> -->
          <!-- </template> -->
          <!-- <template v-else> -->
          <canvas id="canvas" ref="canvas" />
          <!-- </template> -->
          <div class="board-id">
            <h6>혹은 방 ID 입력</h6>
            <div class="id">
              {{ bid }}
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer d-block">
        <div class="">방 주소 :</div>
        <div class="row mx-n1">
          <div class="col-12 col-md-9 p-1">
            <input class="form-control" type="text" :value="url" disabled />
          </div>
          <div class="col-12 col-md-3 p-1">
            <button @click="copyText(url, '주소를')" class="text-nowrap w-100">
              복사하기
            </button>
          </div>
        </div>
      </footer>
    </div>
    <!-- dim -->
    <div class="dim" @click="$emit('close')" />
  </div>
</template>

<script setup>
import { copyText } from "@/utils/commons";
import QRCode from "qrcode";
const props = defineProps({
  bid: {
    type: String,
    required: true,
    default: "undefined"
  },
  title: {
    type: String,
    default: null
  },
  url: {
    type: String,
    required: true,
    default: "url"
  },
  show: {
    type: Boolean,
    required: true,
    default: false
  }
});

const canvas = ref(null);
const pending = ref(false);

watch(
  () => props.show,
  n => {
    // 모달이 열릴 떼 QR코드 생성
    if (n) {
      const w = window?.outerWidth || window?.innerWidth;
      // console.log(window?outerWidth);
      // pending.value = true;
      // console.log("pending.value1:", pending.value);
      QRCode.toCanvas(
        canvas.value,
        props.url,
        {
          // text: url.value,
          width: w >= 640 ? 400 : 280,
          height: w >= 640 ? 400 : 280,
          type: "terminal"
        },
        function (error) {
          if (error) console.error(error);
          // console.log("success!");
        }
      );
      // pending.value = false;
    }
  }
);
</script>

<style lang="postcss" scoped>
.modal-content {
  padding: 8px;
}
.modal-header {
  text-align: center;
  padding: 40px 20px 0;
  h4 {
    font-size: 24px;
    font-weight: 700;
    color: $primary;
    @media (min-width: 1280px) {
      font-size: 30px;
    }
  }
  position: relative;
  .util {
    position: absolute;
    top: 0;
    right: 0;
    button {
      border: 0;
      font-size: 18px;
    }
  }
}
.modal-body {
  // margin-top: 12px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .board-id {
    text-align: center;
    margin-bottom: 16px;
    h6 {
      font-size: 17px;
    }
    .id {
      font-size: 30px;
      font-weight: 700;
    }
  }
}

.modal-footer {
  .input-group {
    display: flex;
    align-items: stretch;
    width: 100%;
    justify-content: space-between;
    input {
      display: block;
      width: 100%;
      font-size: 16px;
      padding: 0.25rem;
    }
    button {
      font-size: 14px;
      white-space: nowrap;
    }
  }
}
.pending-qr {
  width: 400px;
  height: 400px;
  background-color: #ededed;
  position: relative;
  span {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
