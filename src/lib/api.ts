import {
  Post,
  Todo,
  User,
  PaginatedResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
  CreatePostRequest,
} from "@/types";

const BASE_URL = "/api";

// ============================================
// Posts API
// ============================================

// 모든 게시글 가져오기 (페이지네이션)
export async function fetchPosts(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Post>> {
  const res = await fetch(`${BASE_URL}/posts?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// 단일 게시글 가져오기
export async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

// 사용자별 게시글 가져오기
export async function fetchPostsByUser(
  userId: number
): Promise<PaginatedResponse<Post>> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// 게시글 생성
export async function createPost(data: CreatePostRequest): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

// 게시글 수정
export async function updatePost(
  id: number,
  data: Partial<Post>
): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

// 게시글 삭제
export async function deletePost(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

// ============================================
// Todos API
// ============================================

// 모든 할일 가져오기
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

// 단일 할일 가져오기
export async function fetchTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
}

// 할일 생성
export async function createTodo(data: CreateTodoRequest): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

// 할일 수정
export async function updateTodo(
  id: number,
  data: UpdateTodoRequest
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

// 할일 삭제
export async function deleteTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}

// ============================================
// Users API
// ============================================

// 모든 사용자 가져오기
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// 단일 사용자 가져오기
export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// ============================================
// Infinite Posts API (무한 스크롤용)
// ============================================

export interface InfinitePostsResponse {
  data: {
    id: number;
    title: string;
    body: string;
    createdAt: string;
  }[];
  nextCursor: number | null;
  hasNextPage: boolean;
}

export async function fetchInfinitePosts(
  cursor: number = 0,
  limit: number = 10
): Promise<InfinitePostsResponse> {
  const res = await fetch(
    `${BASE_URL}/infinite-posts?cursor=${cursor}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch infinite posts");
  return res.json();
}
