import { ref, computed } from "vue";
import { defineStore } from "pinia";

// use + counter + store  = useCounterStore 선언
export const useCounterStore = defineStore("counter", () => {
  // 저장소 state
  const count = ref(0);
  // 실제 변경된 값을 가져옴 getter
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    // action 상태값을 변경하는 기능
    count.value++;
  }

  return { count, doubleCount, increment };
});
