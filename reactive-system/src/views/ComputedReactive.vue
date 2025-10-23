<script setup>
// Composition API setup 지정 , 함수기반
import { reactive, computed } from "vue";

// ★Data 변경 => 화면이 자동 refresh★
const data = reactive({
  PI: 3.14,
  radius: Math.round(Math.random() * 10),
});

// 계산된 속성
const area = computed(() => {
  return data.radius * data.radius * data.PI;
});
// 반영형 데이터radius 5초 마다 값 변경 refresh
setInterval(() => {
  data.radius = Math.round(Math.random() * 10);
}, 5000);
</script>

<template>
  <body>
    <p>반지름이 {{ data.radius }}이고, 원주율이 {{ data.PI }}인 원의 면적은 {{ area }}다</p>
  </body>
</template>

<style scoped>
/* 1. 기본 설정 및 레이아웃 */
body {
  font-family: "Georgia", serif; /* 클래식한 느낌의 폰트 */
  background-color: #f8f8f8;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 2. <p> 태그 (메인 문구) 스타일 */
p {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 1.25em;
  color: #333;
  line-height: 1.6;
  max-width: 600px;
  text-align: center;
  border-left: 5px solid #007bff; /* 파란색 강조선 */
}

/* 3. 값 강조 (반응성 데이터) */
/* {{ data.radius }}, {{ data.PI }}, {{ area }}에 해당하는 부분에 스타일을 직접 적용할 수 없으므로,
   템플릿에서 <span> 태그를 사용하여 클래스를 적용하는 것을 가정하고 CSS를 작성합니다. */

/* 예시: 템플릿이 <p>반지름이 <span class="value">{{ data.radius }}</span>...인 원의 면적은 <span class="result">{{ area }}</span>다</p> 라면 */

/* 중요 변수 값 스타일 */
.value {
  font-weight: bold;
  color: #007bff; /* 파란색 */
  background-color: #e6f0ff;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 3px;
}

/* 최종 결과 값 스타일 */
.result {
  font-weight: 900;
  color: #28a745; /* 녹색으로 최종 결과 강조 */
  font-size: 1.3em;
  border-bottom: 3px solid #28a745;
  padding-bottom: 1px;
}

/* 추가적인 수학적 기호 스타일링 (PI) */
.math-symbol {
  font-style: italic;
  font-weight: bold;
  color: #dc3545; /* 빨간색 계열 */
}
</style>
