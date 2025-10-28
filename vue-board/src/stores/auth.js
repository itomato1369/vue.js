// Pinia 인증 스토어 생성
// 로그인 상태, 로그아웃, 권한 체크의 핵심 로직

// -----import
import { ref, computed } from "vue";
import { defineStore } from "pinia";

// export
export const useAuthStore = defineStore("auth", () => {
  // state
  // 로그인된 사용자 정보
  const user = ref(null);

  // getter
  const isLoggedIn = computed(() => user.value !== null);
  // 현재 로그인된 사용자의 ID를 반환
  const currentUserId = computed(() => (user.value ? user.value.id : null));

  // actions
  // 테스트를 위한 더미 로그인 처리 password
  const login = (userId, password) => {
    const mockUsers = {
      user1: { id: "user1", password: "5678", name: "관리자", isAdmin: true },
      guest: { id: "guest", password: "1234", name: "손님", isAdmin: false },
    };
    // const userData = mockUsers[(userId, password)];
    const userData = mockUsers[userId];

    if (userData && userData.password == password) {
      user.value = userData;
      // 로컬 스토리지에 저장
      localStorage.setItem("auth_user", JSON.stringify(userData));
      console.log(`[AUTH] ${userData.name}님 로그인`);
      return true;
    }
    user.value = null;
    return false;
  };
  const logout = () => {
    user.value = null;
    localStorage.removeItem("auth_user");
    console.log("[AUTH] 로그아웃");
  };

  // 수정 삭제 권한을 체크
  const canModify = (writerId) => {
    if (!user.value) {
      return false;
    }
    // 관리자는 전부 수정 삭제 가능
    if (user.value.isAdmin) {
      return true;
    }
    // 작성자 본인만 수정 삭제 가능
    return user.value.id === writerId;
  };

  // 새로고침 시 로그인 상태 복구
  const initializeAuth = () => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };
  // 스토어 정의 시 초기화 함수 실행
  initializeAuth();

  return { user, isLoggedIn, currentUserId, login, logout, canModify };
});
