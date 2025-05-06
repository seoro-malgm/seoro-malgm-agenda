<template>
  <div
    class="flex flex-col items-stretch justify-between self-stretch h-full py-12 max-h-[calc(100%-6rem)]"
  >
    <section
      class="py-4 w-full mx-auto self-stretch flex items-center justify-center h-full"
    >
      <client-only>
        <nuxt-link
          class="w-full h-full flex items-center justify-center text-primary text-2xl border border-primary rounded hover:bg-primary hover:text-white transition-colors"
          to="/create"
          >방 만들기</nuxt-link
        >
      </client-only>
    </section>
    <section
      class="py-4 w-full mx-auto self-stretch flex items-center justify-center h-full"
    >
      <client-only>
        <button
          class="w-full h-full flex items-center justify-center text-primary text-2xl border border-primary rounded hover:bg-primary hover:text-white transition-colors"
          @click="showForm"
        >
          방 참가하기
        </button>
      </client-only>
    </section>
  </div>
</template>

<script setup>
const router = useRouter();
const showForm = async () => {
  try {
    const data = await window.prompt("방 id를 입력하세요");
    if (data) {
      router.push(`/typing/${data}`);
    }
  } catch (error) {
    console.error("error:", error);
  }
};

// const config = useRuntimeConfig();
// const url = getRequestURL();
// const name = computed(() => {
//   return { ...config, url };
// });
</script>

<style lang="scss" scoped>
#index {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  align-self: stretch;
  height: 100%;
  padding: 3rem 0;
  max-height: calc(100% - 6rem);
  // height: 100%;
  // min-height: 100vh;
  > section {
    padding: 1rem 0;
    width: 100%;
    margin: auto;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $primary;
      font-size: 24px;
    }
  }
}
</style>
