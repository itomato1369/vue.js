<script setup>
import { defineProps, ref, defineEmits, watch } from "vue";
//
const emit = defineEmits(["update-qty", "remove"]);
//
const { item, pcode } = defineProps({
  item: { type: Object, required: true },
  pcode: String,
});
const localQty = ref(1);

// 삭제 버튼 클릭 시 호출할 내부 함수
const removeItem = (code) => {
  emit("remove", code);
};
const applyTotalPrice = (code, item) => {
  emit("update-qty", pcode, { ...item, qty: localQty.value });
};
watch(
  () => item.qty,
  (newQty) => (localQty.value = newQty),
  { immediate: true },
);
</script>

<template>
  <tr>
    <td>{{ item.code }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.price.toLocaleString() }}원</td>
    <td>
      <input
        type="number"
        v-on:change="applyTotalPrice(pcode, item)"
        v-model.number="localQty"
        min="1"
        style="width: 60px"
      />
    </td>
    <td>{{ (item.price * item.qty).toLocaleString() }}원</td>
    <td><button v-on:click="removeItem(item.code)">❌</button></td>
  </tr>
</template>
