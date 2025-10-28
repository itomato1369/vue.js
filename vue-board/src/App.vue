<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <!-- 사용자 정보 저장할 용도 useAuthStore생성
   사용자의 로그인 정보를 관리
   글 삭제/ 수정시 권한여부 체크 
   
   로그인 화면 로그인 처리시 useAuthStore를 활용해서 정보를 저장
   
   댓글 tbl_reply 생성 (댓글 번호, 댓글 내용, 댓글 작성자, 생성일자, 원본글 번호)
   상세화면의 아래부분에 댓글 출력-->
</template>
