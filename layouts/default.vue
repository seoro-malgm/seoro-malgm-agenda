<template>
  <div>
    <div class="flex items-center justify-center">
      <div
        class="w-full mx-auto px-4 flex flex-col justify-between md:max-w-[576px]"
      >
        <global-nav />
        <main class="h-screen max-h-[calc(100vh-56px)] pt-14">
          <slot></slot>
        </main>
      </div>
    </div>
    <global-footer />
  </div>
</template>

<script setup></script>
