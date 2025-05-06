<template>
  <div class="px-1">
    <div class="row mx-n1 align-items-stretch">
      <div class="col-12 col-lg-10 px-1">
        <div id="board">
          <!-- <section class="utils">
            <button @click="showModalQrCode = true">방 링크 복사하기</button>
          </section> -->
          <header class="board-header">
            <h2>
              <client-only>
                {{ docItem?.title || "" }}
              </client-only>
            </h2>
            <!-- <div class="utils"></div> -->
          </header>
          <section class="w-100 h-100">
            <client-only>
              <section class="board-body">
                <template v-if="pending">
                  <span class="spinner" />
                </template>
                <template v-else>
                  <template v-if="viewType === 'list'">
                    <div class="p-3">
                      <ul class="board-list row">
                        <li
                          v-for="(item, i) in items"
                          :key="i"
                          class="col-12 col-lg-3 mb-4"
                        >
                          <message-bubble
                            :item="item"
                            @on-click="$event => onClicked($event)"
                          />
                        </li>
                      </ul>
                    </div>
                  </template>
                  <template v-if="viewType === 'canvas' && items?.length">
                    <canvas-board
                      :items="items"
                      :focused="
                        !!(showItemDetail && itemSelected) || showModalQrCode
                      "
                      @on-click="$event => onClicked($event)"
                    />
                  </template>
                </template>
              </section>
            </client-only>
          </section>

          <!-- <footer class="board-footer">
      <h5>{{ docItem?.title || "방" }}에 참여하기</h5>
      <div class="qrcode">
        <canvas id="canvas" ref="canvas" />
        <div class="board-id">
          <h6>QR 혹은 ID 직접 입력:</h6>
          <div class="id">
            {{ bid }}
          </div>
        </div>
      </div>
    </footer> -->
        </div>
      </div>
      <div class="col-12 col-lg-2 px-1">
        <div
          class="border border-primary border-left-0 d-flex flex-column align-items-stretch"
        >
          <header class="p-3 border-bottom border-primary">
            <h3 class="text-24 text-center text-primary py-2">
              이 방에 참여하기
            </h3>
            <!-- <div class="utils"></div> -->
          </header>
          <section class="h-100">
            <div class="p-3 text-center border-bottom border-primary">
              <div class="qrcode">
                <canvas id="canvas" ref="canvas" />
                <!-- <div class="board-id">
                  <h6>QR 혹은 ID 직접 입력:</h6>
                  <div class="id">
                    {{ bid }}
                  </div>
                </div> -->
              </div>
            </div>
            <div class="p-3 border-bottom border-primary">
              <h4 class="text-18">참여방법</h4>
              <ul class="mt-2 p-0 mb-0 text-18">
                <li>1. QR코드로 접속한다</li>
                <li>2. 글을 입력한다</li>
                <li>
                  3. <span class="text-primary">'방으로 업로드'</span> 버튼을
                  눌러 방으로 글을 전송한다
                </li>
              </ul>
            </div>
            <div class="p-3">
              <img src="/logo.svg" alt="서로맑음 스튜디오 로고" class="w-100" />
              <div class="text-13 text-gray-500 mt-4">
                &copy; 2023
                <a href="https://seoro-malgm.studio/" target="_blank">
                  Seoro-Malgm Studio
                </a>
                all rights reserved
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <client-only>
      <modal-text-detail
        :show="!!(showItemDetail && itemSelected)"
        :item="itemSelected"
        @close="
          showItemDetail = false;
          itemSelected = null;
        "
      />
      <modal-qr-code
        :bid="bid"
        :title="docItem?.title"
        :url="url"
        :show="showModalQrCode"
        @close="showModalQrCode = false"
      />
    </client-only>
  </div>
</template>

<script setup>
import QRCode from "qrcode";

definePageMeta({
  layout: "dashboard"
});
import { setWatcher } from "@/server/lib/firestore";

// route
const router = useRouter();
const route = useRoute();
const bid = computed(() => {
  return route.params?.bid;
});

// pending
const pending = ref(true);

// doc id 불러오기
const { data: docItem } = await useFetch("/document/doc-id", {
  method: "GET",
  query: {
    collectionName: "board",
    bid: bid.value
  }
}).catch(err => {
  window.alert("존재하지 않는 방입니다.");
  router.push("/");
});

// head
useHead({
  title: `${docItem.value.title} | 아젠다 콜렉터 : 문제를 해결하는 서로맑음 스튜디오의 커뮤니티 툴`
});
const config = useRuntimeConfig();
// console.log("config:", config);
const url = computed(() => {
  return `${config.public.BASE_URL}/typing/${bid.value}`;
  // return `http://192.168.68.87:3000/typing/${bid.value}`;
});

// client side
const items = ref([]);
const updateMessages = async newMessages => {
  items.value = newMessages; // messages를 업데이트
  pending.value = false;
};

let unsubscribe;

const canvas = ref(null);
onMounted(async () => {
  // 실시간 감지 데이터
  await setWatcher("board", docItem.value.id, updateMessages)
    .then(unsub => {
      // 여기에서 unsubscribe는 setWatcher 함수가 반환한 값
      unsubscribe = unsub;
      // QR코드 제작
      QRCode.toDataURL(
        canvas.value,
        url.value,
        {
          // text: url.value,
          width: 200,
          height: 200,
          type: "terminal"
        },
        function (error) {
          if (error) console.error(error);
          // console.log("success!");
        }
      );
    })
    .catch(error => {
      // 에러 처리
      console.error("An error occurred:", error);
      window.alert("존재하지 않는 방입니다.");
      router.push("/");
    });
});
// 마운트 분리시 onSnapshot 종료
onUnmounted(() => {
  unsubscribe();
});

// 보기 모드
const viewType = ref("canvas");

// qr코드 모달
const showModalQrCode = ref(false);

const showItemDetail = ref(false);
const itemSelected = ref(null);
const onClicked = item => {
  if (showModalQrCode.value) return;
  showItemDetail.value = true;
  itemSelected.value = item;
};
</script>

<style lang="scss" scoped>
#board {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 32px);
  max-height: calc(100vh - 32px);
  // @media (min-width: 1280px) {

  // }

  // overflow-y: auto;
  // padding-bottom: 12px;
  margin: 0 auto;
  header.board-header {
    align-self: stretch;
    padding: 1rem 0;
    border: 1px solid $primary;
    border-bottom-width: 0;
    h2 {
      text-align: center;
      font-size: 40px;
      color: $primary;
      font-weight: 700;
    }
  }
  .utils {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1rem;
    // border: 1px solid $primary;
    // border-bottom-width: 0;
    button {
      padding: 0.5rem;
      border-radius: 0;
      border-bottom-width: 0;
    }
  }
  .board-body {
    align-self: stretch;
    height: calc(100% - 3px);
    border: 1px solid $primary;
    display: flex;
    align-items: stretch;
  }

  .board-footer {
    position: fixed;
    top: 0;
    right: 1rem;
    padding: 10px 18px 10px 10px;
    z-index: 1000;
    border: 1px solid $primary;
    background-color: white;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
    > h5 {
      text-align: center;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid $primary;
    }

    .qrcode {
      display: flex;
      align-items: flex-end;
      #canvas {
      }
      .board-id {
        text-align: left;
        padding-bottom: 16px;
        h6 {
          font-size: 14px;
          line-height: 1;
        }
        .id {
          font-size: 24px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
