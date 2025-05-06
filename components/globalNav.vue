<template>
  <header id="header">
    <nav id="gnb">
      <div class="d-flex justify-content-center">
        <h1
          class="text-15 text-md-16 fw-700 px-3 py-2 border border-primary rounded-pill text-nowrap"
        >
          아젠다 콜렉터 | 문제를 해결하는 서로맑음 스튜디오의 커뮤니티 툴
        </h1>
      </div>

      <div class="uitl">
        <!-- ... -->
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
#header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  // background-color: white;
  padding: 1rem;
  // width: 100%;
  // max-width: 100vw;
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
