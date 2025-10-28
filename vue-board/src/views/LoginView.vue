<script setup>
// import
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

// useAuthStore 인스턴스
const authStore = useAuthStore();
const router = useRouter();

// state
const userId = ref("");
const password = ref("");
const loginError = ref("");

// actions
const loginHandler = () => {
  //  오류 메세지 초기화
  loginError.value = "";
  // authStore의 login 액션 호출
  const success = authStore.login(userId.value, password.value);

  if (success) {
    // 로그인 성공 시 "HomeView.vue로 이동"
    router.push({ name: "HomeView" });
  } else {
    // 로그인 실패 시 오류
    loginError.value = "로그인 실패";
  }
};

// 로그아웃 핸들러
const logoutHandler = () => {
  authStore.logout();
  // 로그아웃 후 홈으로 이동
  router.push({ name: "LoginView" });
};
</script>
<template>
  <div class="login-container">
    <header class="header">
      <h1>LoginView</h1>
      <p>Welcome :: Good Bye</p>
    </header>
    <main class="main-content">
      <!-- 로그인 상태가 아닐 때만 폼을 보여줌 -->
      <form v-if="!authStore.isLoggedIn" @submit.prevent="loginHandler">
        <div class="input-group">
          <label for="userId">사용자 ID</label>
          <input id="userId" v-model.trim="userId" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <!-- 로그인 오류 메세지 표시 -->
        <p v-if="loginError" style="color: red">{{ loginError }}</p>
        <!-- 제출 handler -->
        <button type="submit">LOGIN</button>
      </form>
      <div class="logout-section">
        <button @click="logoutHandler">LOGOUT</button>
      </div>
    </main>
  </div>
</template>
<style scoped>
/* Base Container Style */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: "Arial", sans-serif;
  background-color: #f7f9fc; /* Light background for the page */
  min-height: 100vh;
}

/* Header Style */
.header {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 5px;
  color: #007bff; /* Primary color */
}

.header p {
  font-size: 1.1em;
  color: #666;
}

/* Main Content Wrapper */
.main-content {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Login Form Style */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
  font-size: 0.95em;
}

.input-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.input-group input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  outline: none;
}

/* Error Message Style */
.error-message {
  color: #dc3545 !important; /* Red color for error */
  text-align: center;
  margin-top: -10px; /* Adjust spacing above the button */
  font-size: 0.9em;
}

/* Button Styles (Login & Logout) */
button {
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition:
    background-color 0.3s,
    opacity 0.3s;
  width: 100%;
}

.login-button {
  background-color: #007bff; /* Primary Blue */
  color: white;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #0056b3;
}

.logout-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee; /* Separator line */
}

.logout-button {
  background-color: #6c757d; /* Secondary Gray */
  color: white;
}

.logout-button:hover {
  background-color: #5a6268;
}
</style>
