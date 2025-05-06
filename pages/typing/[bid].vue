<template>
  <div id="typing">
    <div class="top-header mt-5 pt-3">
      <!-- <section class="utils">
        <button @click="showModalQrCode = true">방 링크 복사하기</button>
      </section> -->
      <header class="typing-header">
        <client-only>
          <h2>
            {{ doc.title }}
          </h2>
          <div class="info">
            <div v-if="doc?.host">
              {{ doc.host }}
            </div>
          </div>
        </client-only>
      </header>
    </div>
    <section class="form-wrap mt-4">
      <client-only>
        <form @submit.prevent="submit">
          <form-textarea
            @input="$event => (form.text = $event)"
            :form="form"
            bind="text"
          />
          <div class="form-footer">
            <template v-if="pending">
              <button type="button" :disabled="validate || pending">
                업로드중입니다 ...
              </button>
            </template>
            <template v-else>
              <button type="submit" :disabled="validate">
                방으로 글 업로드
              </button>
            </template>
          </div>
        </form>
      </client-only>
    </section>
    <client-only>
      <modal-qr-code
        :url="url"
        :title="doc.title"
        :show="showModalQrCode"
        @close="showModalQrCode = false"
        :bid="bid"
      />
    </client-only>
  </div>
</template>

<script setup>
// route
const route = useRoute();
const bid = computed(() => {
  return route.params?.bid;
});

// pending
const pending = ref(false);

// doc id 불러오기
const { data: doc } = await useFetch(`/document/doc-id`, {
  method: "GET",
  query: {
    collectionName: "board",
    bid: bid.value
  }
});

// head
useHead({
  title: `${doc.value.title} | 아젠다 콜렉터 : 문제를 해결하는 서로맑음 스튜디오의 커뮤니티 툴`
});

const url = computed(() => {
  return `https://www.agenda-collector.web.app/typing/${bid.value}`;
});

// form
const form = ref({
  text: null
});
const defaultForm = {
  text: null
};

// validate
const validate = computed(() => {
  const { text } = form.value;
  return !text || text === "" || text === " ";
});

// form submit
const submit = async e => {
  pending.value = true;
  try {
    const data = await useFetch(`/message/add`, {
      method: "POST",
      body: {
        bid: bid.value,
        form: {
          ...form.value,
          createdAt: new Date().getTime()
        }
      }
    });
    console.log("data:", data);
    if (data?.status?.value === "success") {
      form.value = {
        text: null
      };
      pending.value = false;
      window.alert("추가했습니다");
    }
  } catch (error) {
    window.alert("에러로 인해 추가에 실패했습니다.");
    pending.value = false;
    console.error("error:", error);
  }
};

// qr코드 모달
const showModalQrCode = ref(false);
</script>

<style lang="postcss" scoped>
#typing {
  display: flex;
  flex-direction: column;
  align-items: center;
  // max-width: 80vw;
  width: 100%;
  height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  margin: 0 auto;
  padding-top: 24px;
  .top-header {
    position: fixed;
    top: 12px;
    left: 0;
    width: 100%;
    z-index: 1040;
    background-color: white;
    header.typing-header {
      align-self: stretch;
      padding: 1rem 0;
      border: 1px solid $primary;
      border-bottom-width: 0;
      border-bottom: 1px solid $primary;
      h2 {
        text-align: center;
        font-size: 24px;
        color: $primary;
        font-weight: 700;
        @media (min-width: 768px) {
          font-size: 32px;
        }
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: center;
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
  }

  .form-wrap {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    @media (min-width: 768px) {
      padding-top: 96px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      height: 100%;
      .input-group {
        border-bottom-width: 0;
        align-self: stretch;
        height: 100%;
        textarea {
          height: 100%;
          max-height: calc(100% - 200px);
        }
      }
      .form-footer {
        padding-bottom: 120px;
        button {
          width: 100%;
          padding: 1rem;
          border-radius: 0;
          border: 1px solid $primary;
          color: $primary;
        }
      }
    }
  }
}
</style>
