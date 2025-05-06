<template>
  <div id="wrapper" :class="{ focused: focused }">
    <div id="container" ref="p5Container" />
  </div>
</template>

<script setup>
import p5 from "p5";

const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
  focused: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits();

const p5Container = ref(null);
let sketch;
let list = [];
let bubbleSize = 150;
let fontSize = 15;
let textBoxSize = 110;

const checkCollision = (item1, item2) => {
  const dx = item1.x - item2.x;
  const dy = item1.y - item2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < bubbleSize;
};

watchEffect(() => {
  if (!p5Container.value) return;
  const w = p5Container.value.offsetWidth;
  const h = p5Container.value.offsetHeight;

  // 새로운 아이템이 추가되었는지 확인
  if (props.items.length > list.length) {
    const newItemsCount = props.items.length - list.length;
    const newItems = props.items.slice(0, newItemsCount);

    for (const item of newItems) {
      let x, y;
      let collision = true;

      while (collision) {
        x = item.x ?? Math.random() * (w - bubbleSize * 0.95) + bubbleSize * 0.95;
        y = item.y ?? Math.random() * (h - bubbleSize * 0.95) + bubbleSize * 0.95;
        collision = list.some((existingItem) => checkCollision({ x, y }, existingItem));
      }

      const speedX = Math.random() * 4 - 2;
      const speedY = Math.random() * 4 - 2;
      list.push({ x, y, speedX, speedY, text: item.text, size: 20, status: "growing" });
    }
  }
});

onMounted(() => {
  sketch = new p5((p) => {
    p.setup = () => {
      const w = p5Container.value.offsetWidth;
      const h = p5Container.value.offsetHeight;
      p.createCanvas(w, h);
    };

    p.draw = () => {
      p.background(255);
      p.textSize(fontSize);
      p.textAlign(p.CENTER, p.CENTER);
      // 풍선들 간의 충돌 체크
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          if (checkCollision(list[i], list[j])) {
            // 풍선들이 충돌했을 때의 처리
            [list[i].speedX, list[j].speedX] = [list[j].speedX, list[i].speedX];
            [list[i].speedY, list[j].speedY] = [list[j].speedY, list[i].speedY];
          }
        }
      }

      for (const item of list) {
        // 풍선 위치 업데이트
        item.x += item.speedX;
        item.y += item.speedY;
        if (item.x < bubbleSize || item.x > p.width - bubbleSize) item.speedX *= -1;
        if (item.y < bubbleSize || item.y > p.height - bubbleSize) item.speedY *= -1;
        // 크기가 점점 커지는 로직
        if (item.status === "growing") {
          item.size += 2; // 크기를 점점 증가시킵니다. 증가 속도는 조절 가능합니다.
          if (item.size >= bubbleSize) {
            item.status = "moving"; // 크기가 200에 도달하면 이동을 시작합니다.
          }
        }

        const fillColor =
          p.dist(p.mouseX, p.mouseY, item.x, item.y) < textBoxSize ? "#e4a79d" : "#fff0ed";
        p.fill(fillColor);
        p.stroke("#000");
        p.ellipse(item.x, item.y, item.size);
        p.fill(0);

        let isMouseOver = p.dist(p.mouseX, p.mouseY, item.x, item.y) < item.size / 2; // 마우스가 풍선 위에 있는지 여부
        // 커서 스타일 변경
        if (isMouseOver) {
          p.cursor("pointer");
        } else {
          p.cursor("default");
        }

        // 텍스트 생략 처리
        let displayText = item.text;
        if (p.textWidth(displayText) > textBoxSize) {
          let ellipsis = "...";
          let maxWidth = textBoxSize - p.textWidth(ellipsis);
          for (let i = displayText.length; i > 0; i--) {
            let subStr = displayText.substring(0, i);
            if (p.textWidth(subStr) <= maxWidth) {
              displayText = subStr + ellipsis;
              break;
            }
          }
        }

        // 텍스트 그리기
        p.text(displayText, item.x, item.y);
      }

      p.mouseClicked = () => {
        if (props.focused) {
          // $nextTick();
          return;
        }
        for (const item of list) {
          if (p.dist(p.mouseX, p.mouseY, item.x, item.y) < textBoxSize) {
            emit("on-click", item);
            break;
          }
        }
      };
    };

    p.windowResized = () => {
      const w = p5Container.value.offsetWidth;
      const h = p5Container.value.offsetHeight;
      p.resizeCanvas(w, h);
    };
  }, p5Container.value);
});

onBeforeUnmount(() => {
  sketch.remove();
});
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  &.focused {
    pointer-events: none;
  }
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
