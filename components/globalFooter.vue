<template>
  <footer id="footer" :class="{ fluid: fluid }">
    <nav>
      &copy; 2023. &nbsp;<a
        href="https://Seoro-Malgm Studio.kr/"
        target="_blank"
      >
        Seoro-Malgm Studio
      </a>
      &nbsp; all rights reserved
    </nav>
  </footer>
</template>

<script setup>
const props = defineProps({
  fluid: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="postcss" scoped>
#footer {
  padding: 0.5rem 0;
  width: 100%;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  > nav {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100vw;
    padding: 0 1rem;
    a {
      display: inline;
      width: unset;
    }
    @media (min-width: 768px) {
      padding: 0;
      max-width: 576px;
    }
  }
  &.fluid {
    margin: 0 1rem;
    > nav {
      @media (min-width: 768px) {
        padding: 0;
        max-width: calc(100% - 2rem);
      }
    }
  }
}
</style>
