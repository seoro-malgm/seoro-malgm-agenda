<template>
  <header id="header">
    <nav id="gnb">
      <div class="d-flex justify-content-center">
        <h1
          class="text-15 text-md-16 fw-700 px-3 py-2 border border-primary rounded-pill text-nowrap"
        >
          서로맑음 아젠다 | 서로맑음이 의견을 모으고, 소통합니다
        </h1>
      </div>

      <div class="uitl">
        <!-- ... -->
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="postcss" scoped>
#header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  #gnb {
    display: flex;
    align-items: center;
    width: 100%;
    @media (min-width: 768px) {
      padding: 0;
      max-width: 576px;
      justify-content: center;
    }
  }
}
</style>
