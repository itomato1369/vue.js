<script setup>
// ★★5교시 문제★★
import { ref, reactive } from "vue";
// ref: 문자의 원시값을 반응형으로 만들기 위함
// reactive: 객체타입을 반응형으로
//
// const
const qtyKey = ref(1);
// 상품 고유 키 Map의 key
const code = ref("01");
const name = ref("기본 상품");
const price = ref(10000);
const qty = ref(1);
// ref(); 로 감쌌기 때문에 이 변수들의 값이 바뀌면 refresh
//
// Data
// Map은 new 키워드를 사용해서 올바르게 생성
// Map을 사용해서 저장 key , value 쌍으로 데이터를 저장
const mapData = new Map();
mapData.set(1, {
  stuffCode: "01",
  stuffName: "기본 상품",
  stuffPrice: 10000,
  quantity: 1,
});
const mapDataRef = reactive(mapData);
//
// function
// 상품 추가
const addItem = () => {
  // 유효성 검사 필수 값 입력 되어있는지 체크
  if (!name.value || price.value <= 0 || qty.value <= 0) {
    console.warn("정보를 올바르게 입력하세요");
    return;
    // 유효성 검사에는 return이 꼭 있어야한다
  }
  // 새로운 상품 객체 생성
  const newItem = {
    stuffCode: code.value,
    stuffName: name.value,
    stuffPrice: price.value,
    quantity: qty.value,
  };
  // Map에 새로운 항목 추가
  mapDataRef.set(qtyKey.value, newItem);
  // qtyKey.value 키 값  value는 newItem
  // key값 증가 중복이 되면 안되니까
  qtyKey.value++;
  // 입력필드 초기화
  code.value = "" + qtyKey.value;
  // key 값 중복 방지로 + qtyKey.value;
  name.value = "";
  price.value = 0;
  qty.value = 1;
};

// 항목 삭제
const deleteItem = (key) => {
  // key 키 값으로 삭제
  mapDataRef.delete(key);
};

// 수량 변경
const updateQuantity = (key, newStock) => {
  const item = mapDataRef.get(key);
  if (item) {
    item.quantity = Math.max(1, parseInt(newStock) || 1);
    // 최소 수량을 1로 강제함 =>  || 1은  숫자가 아닌 값을 입력했을 때 기본값을 1로 설정
  }
};

// 총 합계 구하기
const totalAmount = () => {
  let total = 0;
  // const 가 아닌 let으로 선언한 이유는
  // 총 합계는 계속해서 변하기 때문 forEach때문
  mapDataRef.forEach((item) => {
    total += item.stuffPrice * item.quantity;
  });
  return total;
};

// 숫자 포맷팅 합계와 가격을 보기 좋게 표시
const formatCurrency = (value) => {
  return value.toLocaleString("ko-KR") + "원";
};
</script>
<template>
  <h2>🛒 장바구니</h2>

  <div style="margin-bottom: 1rem">
    <label>상품코드: <input type="text" v-model="code" /></label><br />
    <label>상품명: <input type="text" v-model="name" /></label><br />
    <label>가격: <input type="number" v-model="price" /></label><br />
    <label>수량: <input type="number" v-model="qty" /></label><br />
    <button @click="addItem">상품 추가</button>
  </div>

  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr style="background-color: #eee">
        <th>상품코드</th>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>합계</th>
        <th>삭제</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[key, item] in mapDataRef" v-bind:key="key">
        <td>{{ item.stuffCode }}</td>
        <td>{{ item.stuffName }}</td>
        <td>{{ formatCurrency(item.stuffPrice) }}</td>
        <td>
          <input
            type="number"
            min="1"
            style="width: 60px"
            v-bind:value="item.quantity"
            v-on:change="updateQuantity(key, $event.target.value)"
          />
        </td>
        <!-- v-on: 축약은 @-->

        <!-- key, $event.target.value 는 사용자의 입력(이벤트)를 받아 데이터를 업데이트 -->

        <!-- 합계 -->
        <td>{{ formatCurrency(item.stuffPrice * item.quantity) }}</td>
        <!-- 삭제 수정 -->
        <td><button v-on:click="deleteItem(key)">❌</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4" style="text-align: right">총합계:</th>
        <th colspan="2">{{ formatCurrency(totalAmount()) }}</th>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped></style>
