// -----import-----
import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

// Pinia 스토어 정의
// -----export-----
export const usePostStore = defineStore("post", () => {
  // -----state-----
  // 게시글 목록 상태
  const posts = ref([]);
  // 댓글 목록 상태
  const replies = ref([]);

  // -----getter가공된 state 반환-----
  // route 파라미터에서 id 가져오기
  const getPostById = (postId) => {
    // id 비교를 문자열로 통일
    const idString = String(postId);
    // posts 배열에서 해당 ID를 가진 게시글을 찾음
    return posts.value.find((post) => String(post.id) === idString);
  };

  // -----action : 데이터 변경 게시글 CRUD-----
  const addPost = async (newPost) => {
    try {
      const result = await axios.post("http://localhost:3000/board", { param: newPost });
      posts.value.push({ ...newPost, id: result.data.insertId });
    } catch (err) {
      console.error("게시글 등록 실패:", err.message);
    }
  };

  // 게시글 삭제
  const deletePost = async (id) => {
    try {
      // DB에서 삭제
      await axios.delete(`http://localhost:3000/board/${id}`);
      // 로컬 상태에서 삭제
      posts.value = posts.value.filter((post) => String(post.id) !== String(id));
    } catch (err) {
      console.error("게시글 삭제 실패:", err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/boards");
      posts.value = response.data;
    } catch (err) {
      console.error("게시글 목록 로드 실패:", err.message);
    }
  };

  // ----- actions 댓글 CRUD-----
  // 특정 게시글의 댓글 목록을 서버에서 가져와 상태를 갱신
  const fetchReplies = async (boardId) => {
    try {
      const response = await axios.get(`http://localhost:3000/board/${boardId}`);

      // -----디버깅 : 서버에서 받은 원본 데이터 확인-----
      console.log("Raw Response Data for fetchReplies", response.data);
      if (typeof response.data === "object" && response.data !== null) {
        console.log("Response Keys:", Object.keys(response.data));
      }

      const postIndex = posts.value.findIndex((p) => String(p.id) === String(boardId));
      // respons.data.post가 존재할 경우에만 갱신
      if (response.data.post) {
        // 게시글 상세 정보 갱신 또는 추가
        if (postIndex !== -1) {
          // 기존 게시글 갱신
          posts.value[postIndex] = response.data.post;
        } else {
          // fetchPosts에서 누락된 경우 posts 배열에 추가하여
          posts.value.push(response.data.post);
        }
      }
      let fetchedReplies = response.data.replies;
      if (!fetchedReplies && Array.isArray(response.data)) {
        // 서버가 댓글 배열 자체를 반환하는 경우
        fetchedReplies = response.data;
      } else if (!fetchedReplies && typeof response.data === "object" && response.data !== null) {
        // 서버가 replies 키를 사용하지 않고 댓글 목록을 직접 반환하는 경우 (다만, 이 경우는 post 갱신이 안 될 가능성이 높음)
        // 여기서는 response.data.replies가 없으면 빈 배열로 설정 (안정성 확보)
        fetchedReplies = [];
      }
      // 댓글 목록을 가져오기
      replies.value = Array.isArray(fetchedReplies) ? fetchedReplies : [];
    } catch (err) {
      console.error("댓글 로드 실패:", err.message);
      replies.value = [];
    }
  };
  const fetchPostById = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3000/board/${postId}`);

      if (response.data && response.data.post) {
        return response.data.post;
      }
      return response.data;
    } catch (err) {
      console.error(`게시글 ${postId} 로드 실패`, err.message);
      return null;
    }
  };

  // 댓글 등록
  const addReply = async (newReply) => {
    try {
      // 서버로 댓글 데이터 전송
      await axios.post("http://localhost:3000/board/reply-add", {
        param: newReply,

        // PostView.vue에서 fetchReplises를 호출하여 전체 목록 갱신
      });
    } catch (err) {
      console.error("댓글 등록 실패:", err.message);
    }
  };

  // 댓글 삭제
  const deleteReply = async (replyId, boardId) => {
    try {
      // DB에서 삭제
      await axios.delete(`http://localhost:3000/board/reply-delete/${replyId}`);
      // 로컬 상태에서 삭제
      replies.value = replies.value.filter((reply) => String(reply.reply_id) !== String(replyId));
    } catch (err) {
      console.error("댓글 삭제 실패:", err.message);
    }
  };

  return {
    posts,
    replies,
    getPostById,
    addPost,
    deletePost,
    fetchPosts,
    fetchReplies,
    addReply,
    deleteReply,
    fetchPostById,
  };
});
