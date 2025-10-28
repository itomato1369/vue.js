<script setup>
// -----import-----
import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post.js";
import { useAuthStore } from "@/stores/auth.js";

// -----useRoute/useRouter/-----
const route = useRoute();
const router = useRouter(); // router 인스턴스 접근

// -----useStore-----
const postStore = usePostStore();
const authStore = useAuthStore();

// -----state-----
const currentPostId = computed(() => route.params.id);
// const post = computed(() => postStore.getPostById(currentPostId.value));
// 댓글 입력 상태
const replyContent = ref("");
// 게시글 데이터를 저장할 ref 추가
const currentPostData = ref(null);
// post의 computed 속성을 새로운 ref로 수정
const post = computed(() => currentPostData.value);

// Confirmation/Alert states
// 사용자 알림 메세지
const uiMessage = ref("");
// 게시글 삭제 확인 모달
const showPostConfirm = ref(false);
// 댓글 삭제 확인 모달
const showReplyConfirm = ref(false);
// 삭제할 댓글 ID 임시 저장
const replyToDeleteId = ref(null);

// -----getter-----
// 글 수정 권한 체크
const canModifyPost = computed(() => {
  return post.value ? authStore.canModify(post.value.writer) : false;
});
// 게시글 날짜
const writeDate = computed(() => {
  if (post.value && post.value.write_date) {
    return new Date(post.value.write_date).toLocaleString();
  }
  return "날짜 정보 없음";
});

// -----function-----
onBeforeMount(async () => {
  const postId = currentPostId.value;

  // 게시글 목록 로드 대신, 개별 게시글 로드 액션 호출
  const fetchedPost = await postStore.fetchPostById(postId);

  if (fetchedPost) {
    currentPostData.value = fetchedPost; // 데이터 저장
    console.log("Found Post:", fetchedPost);
  } else {
    console.warn("Post not found");
    // 게시글을 찾지 못하면 목록으로 리다이렉트하는 등의 추가 처리가 필요합니다.
  }

  console.log("------");

  // 댓글 목록 로드는 유지
  if (postId) {
    await postStore.fetchReplies(postId);
  }

  // // 게시글 목록을 미리 가져옴
  // await postStore.fetchPosts();

  // // -----디버깅 로그-----
  // console.log("---PostView Debugging");
  // console.log("Current Post ID:", currentPostId.value);
  // console.log("Posts in Store:", postStore.posts.value?.length);

  // // posts 배열에 해당 ID의 게시글이 있는지 확인
  // const foundPost = postStore.posts.value?.find(
  //   (p) => String(p.id) === String(currentPostId.value),
  // );
  // if (foundPost) {
  //   console.log("Found Post:", foundPost);
  // } else {
  //   console.warn("Post not found ");
  // }
  // console.log("------");

  // // 컴포넌트 마운트 시 댓글 목록 로드
  // if (currentPostId.value) {
  //   await postStore.fetchReplies(currentPostId.value);
  // }
});
// -----actions-----
// 게시글 삭제 확인창 열기
const confirmDeletePost = () => {
  if (canModifyPost.value) {
    showPostConfirm.value = true;
  } else {
    uiMessage.value = "삭제할 권한이 없습니다";
  }
};

// 게시글 삭제 최종 처리 Delte
const deletePostHandler = async (confirmed) => {
  // 확인 모달 닫기
  showPostConfirm.value = false;
  if (confirmed) {
    const postId = route.params.id;
    await postStore.deletePost(postId);
    // 목록으로 이동
    router.push({ name: "HomeView" });
  }
};

// 댓글 등록
const addReplyHandler = async () => {
  if (!authStore.isLoggedIn) {
    uiMessage.value = "댓글 작성은 로그인 하고 나서";
    return;
  }
  if (replyContent.value.trim() === "") {
    uiMessage.value = "댓글 내용을 입력하세요";
    return;
  }

  const newReply = {
    board_id: currentPostId.value,
    // 로그인된 사용자 ID를 작성자로
    writer: authStore.currentUserId,
    reply_content: replyContent.value,
  };
  // 댓글 등록 액션 실행
  await postStore.addReply(newReply);
  // 입력 필드 초기화
  replyContent.value = "";
  // 댓글 목록 다시 불러오기 반응형
  if (currentPostId.value) {
    await postStore.fetchReplies(currentPostId.value);
  }
};

// 댓글 삭제 확인
const confirmDeleteReply = (replyId, writerId) => {
  if (authStore.canModify(writerId)) {
    replyToDeleteId.value = replyId;
    showReplyConfirm.value = true;
  } else {
    uiMessage.value = "댓글 삭제할 권한이 없다";
  }
};
// 댓글 삭제 최종 처리 Delete
const deleteReplyHandler = async (confirmed) => {
  // 확인 모달 닫기
  showReplyConfirm.value = false;
  if (confirmed && replyToDeleteId.value) {
    await postStore.deleteReply(replyToDeleteId.value, currentPostId.value);
  }
  replyToDeleteId.value = null;
};
// 댓글 작성 권한 체크
const canModifyReply = (writerId) => authStore.canModify(writerId);
</script>
<template>
  <div class="post-view-container">
    <div v-if="uiMessage">
      <p>{{ uiMessage }}</p>
      <button @click="uiMessage = ''">닫기</button>
    </div>
    <header>
      <h1>상세화면, PostView</h1>
    </header>
    <main v-if="post">
      <div>
        <h3>Title: {{ post.title }}</h3>
        <p>Content: {{ post.content }}</p>
        <p>
          <em>Writer: {{ post.writer }}</em>
        </p>
        <p>Date: {{ writeDate }}</p>
      </div>
      <p v-if="canModifyPost">
        <button v-on:click="confirmDeletePost">Delete</button>
      </p>
    </main>
    <main v-else>
      <p>게시글을 불러오는 중입니다...</p>
    </main>
    <section>
      <RouterLink to="/">Back to the List</RouterLink>
    </section>
    <hr />
    <!-- 댓글 섹션 -->
    <section>
      <!-- 댓글 작성 폼 -->
      <h3>REPLY ({{ postStore.replies?.length || 0 }})</h3>
      <div class="reply-form">
        <div v-if="authStore.isLoggedIn">
          <p>
            Reply Writer: <strong>{{ authStore.user.name }}({{ authStore.user.id }})</strong>
          </p>
          <textarea v-model="replyContent" placeholder="댓글을 입력해주세요" rows="3"></textarea>
          <button @click="addReplyHandler" :disabled="!replyContent.trim()">SUBMIT REPLY</button>
        </div>
        <div v-else>
          <p>
            댓글을 작성하려면 로그인 하세요
            <RouterLink to="/login"></RouterLink>
          </p>
        </div>
      </div>
      <!-- 댓글 목록 -->
      <div v-if="postStore.replies?.length > 0" class="reply=list">
        <div v-for="reply in postStore.replies" :key="reply.reply_id" class="reply-item">
          <div>
            <p>
              {{ reply.writer }}
              <span>작성일시: {{ new Date(reply.write_date).toLocaleString() }}</span>
            </p>
            <button
              v-if="canModifyReply(reply.writer)"
              @click="confirmDeleteReply(reply.reply_id, reply.writer)"
            >
              Delete
            </button>
          </div>
          <p>{{ reply.reply_content }}</p>
        </div>
      </div>
      <div v-else>
        <p>아직 댓글이 없습니다 NO Reply</p>
      </div>
    </section>

    <!-- 확인 모달 (게시글 삭제) -->
    <div v-if="showPostConfirm" class="confirmation-modal">
      <div class="modal-content">
        <p>게시글 삭제</p>
        <button @click="deletePostHandler(true)">YES</button>
        <button @click="deletePostHandler(false)">NO</button>
      </div>
    </div>

    <!-- 확인 모달 (댓글 삭제) -->
    <div v-if="showReplyConfirm" class="confirmation-modal">
      <div class="modal-content">
        <p>댓글 삭제</p>
        <button @click="deleteReplyHandler(true)">YES</button>
        <button @click="deleteReplyHandler(false)">NO</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 기본 레이아웃 및 컨테이너 */
.post-view-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: #f9fafb; /* 연한 배경 */
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

/* 헤더 및 제목 */
header {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

/* 게시글 상세 내용 */
main {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
}

main h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

main p {
  line-height: 1.6;
  color: #4b5563;
}

main em {
  font-style: normal;
  font-weight: 500;
  color: #6366f1; /* 메인 색상 */
}

/* 게시글 삭제 버튼 */
main button {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  margin-top: 1rem;
}
main button:hover {
  background-color: #dc2626;
}

/* 목록으로 돌아가기 링크 */
section a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 0;
  display: inline-block;
}
section a:hover {
  text-decoration: underline;
  color: #4f46e5;
}

hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #e5e7eb;
}

/*
--------------------------------------------------
댓글 섹션 스타일
--------------------------------------------------
*/
section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

/* 댓글 작성 폼 */
.reply-form {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.reply-form strong {
  color: #1f2937;
}

.reply-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  resize: vertical;
  font-size: 1rem;
  box-sizing: border-box;
}

.reply-form button {
  padding: 0.6rem 1.2rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.reply-form button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.reply-form button:hover:not(:disabled) {
  background-color: #4f46e5;
}

/* 로그인 안내 */
.reply-form div:last-child {
  text-align: center;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 4px;
  color: #4b5563;
}
.reply-form div:last-child a {
  color: #6366f1;
  font-weight: 600;
  text-decoration: underline;
}

/* 댓글 목록 */
.reply-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  border-radius: 6px;
  border-left: 5px solid #a5b4fc; /* 포인트 컬러로 구분선 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}
.reply-item:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.reply-item > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.reply-item p:first-child {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.reply-item span {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-left: 10px;
  font-weight: 400;
}

.reply-item button {
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  background-color: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fca5a5;
  border-radius: 4px;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.reply-item button:hover {
  background-color: #ef4444;
  color: white;
}

/* 댓글 없을 때 */
section > div:last-child {
  text-align: center;
  padding: 2rem;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  color: #6b7280;
}

/*
--------------------------------------------------
모달 및 UI 메시지 스타일
--------------------------------------------------
*/
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  min-width: 300px;
}

.modal-content p {
  margin-bottom: 20px;
  font-weight: 600;
  color: #333;
}

.modal-content button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.modal-content button:first-of-type {
  /* YES 버튼 */
  background-color: #6366f1;
  color: white;
}

.modal-content button:last-of-type {
  /* NO 버튼 */
  background-color: #e5e7eb;
  color: #4b5563;
}

.modal-content button:first-of-type:hover {
  background-color: #4f46e5;
}
.modal-content button:last-of-type:hover {
  background-color: #d1d5db;
}

/* UI 메시지 박스 */
.post-view-container > div:first-child {
  background-color: #fffbeb; /* 노란색 계열 배경 */
  border: 1px solid #fcd34d;
  color: #92400e;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}
.post-view-container > div:first-child button {
  background: none;
  border: none;
  color: #92400e;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
</style>
