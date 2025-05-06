<template>
  <div class="flex w-full h-full pt-4">
    <form class="self-stretch w-full flex flex-col" @submit.prevent="onSubmit">
      <header class="mb-4">
        <div
          class="inline-block border border-primary rounded-full px-2 py-0.5 text-sm md:text-base text-gray-600"
        >
          {{ componentIndex + 1 }} / {{ steps?.length }}
        </div>
      </header>
      <section class="self-stretch h-full">
        <client-only>
          <component
            :is="steps[componentIndex]?.component"
            @input="$event => (form[$event[0]] = $event[1])"
            :form="form"
          />
        </client-only>
      </section>
      <section class="pb-[100px] flex items-stretch">
        <template v-if="componentIndex === 0">
          <button
            type="button"
            class="w-full p-4 text-lg bg-[#d7d7d7] max-w-[30%] mr-2"
            :disabled="pending"
            @click="$router.push('/')"
          >
            처음으로
          </button>
        </template>
        <template v-else-if="componentIndex >= 1">
          <button
            v-if="componentIndex >= 1"
            type="button"
            @click="onPrevStep"
            class="w-full p-4 text-lg bg-[#d7d7d7] max-w-[30%] mr-2"
            :disabled="pending"
          >
            뒤로
          </button>
        </template>

        <template v-if="steps?.length === componentIndex + 1">
          <button
            type="submit"
            class="w-full p-4 text-lg bg-primary text-white"
            :disabled="pending"
          >
            <template v-if="pending"> 방을 만드는 중입니다 ... </template>
            <template v-else> 만들기 완료 </template>
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="w-full p-4 text-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            @click="onNextStep(componentIndex)"
            :disabled="pending"
          >
            다음으로
          </button>
        </template>
      </section>
    </form>
  </div>
</template>

<script setup>
import { createHash } from "@/utils/helper";
import createTitle from "@/components/create/title.vue";
import createSubject from "@/components/create/subject.vue";
import createHost from "@/components/create/host.vue";
// components
const steps = [
  {
    key: "title",
    required: true,
    component: createTitle
  },
  {
    key: "subject",
    required: true,
    component: createSubject
  },
  {
    key: "host",
    required: false,
    component: createHost
  }
];
// 컴포넌트 순서
const componentIndex = ref(0);

// form
const form = ref({
  title: null, // 제목
  subject: [], // 주제
  host: null // 주관 및 주최처
});

// 다음순서
const onNextStep = index => {
  // console.log("steps[index]:", steps[index]);
  const currentValue = form.value[steps[index]?.key];
  const isRequired = steps[index]?.required;
  if (isRequired) {
    if (!currentValue || currentValue === "" || currentValue === " ") {
      window.alert("필수 값을 입력하지 않았습니다");
      return;
    } else {
      componentIndex.value += 1;
    }
  } else {
    componentIndex.value += 1;
  }
};
// 이전순서
const onPrevStep = evt => {
  componentIndex.value -= 1;
};

const pending = ref(false);

// validate
// const validate = computed(() => {
//   return !form.value.title || form.value.title === "";
// });
const router = useRouter();

// form submit
const onSubmit = async e => {
  pending.value = true;
  try {
    const hash = createHash();
    const data = await useFetch(`/document/add`, {
      method: "POST",
      body: {
        form: {
          ...form.value,
          bid: hash,
          createdAt: new Date().toLocaleString()
        }
      }
    });
    if (data?.status?.value === "success") {
      console.log("data:", data);
      pending.value = false;
      router.replace({
        path: `/board/${hash}`
      });
    }
  } catch (error) {
    pending.value = false;
    window.alert("에러로 인해 방 만들기에 실패했습니다");
    console.error("error:", error);
  }
};
</script>

<style lang="postcss" scoped>
.form-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .form {
    align-self: stretch;
    width: 100%;
    display: flex;
    flex-direction: column;
    .form-header {
      margin-bottom: 4px;
      .status {
        border: 1px solid $primary;
        border-radius: 40rem;
        padding: 2px 8px;
        display: inline-block;
      }
    }
    .form-body {
      align-self: stretch;
      height: 100%;
    }
    .form-footer {
      padding-bottom: 100px;
      display: flex;
      align-items: stretch;
      button {
        width: 100%;
        padding: 1rem;
        font-size: 18px;
        &.prev-button {
          max-width: 30%;
          margin-right: 8px;
          background-color: #d7d7d7;
        }
      }
    }
  }
}
</style>
