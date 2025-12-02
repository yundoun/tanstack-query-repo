import { Todo, Post, User } from "@/types";

// 공유 데이터 저장소
// 실제 프로젝트에서는 데이터베이스를 사용합니다

export const todosStore = {
  data: [
    { id: 1, title: "TanStack Query 설치하기", completed: true, createdAt: "2024-01-01T00:00:00Z" },
    { id: 2, title: "QueryClient 설정하기", completed: true, createdAt: "2024-01-02T00:00:00Z" },
    { id: 3, title: "useQuery 학습하기", completed: false, createdAt: "2024-01-03T00:00:00Z" },
    { id: 4, title: "useMutation 학습하기", completed: false, createdAt: "2024-01-04T00:00:00Z" },
    { id: 5, title: "캐싱 전략 이해하기", completed: false, createdAt: "2024-01-05T00:00:00Z" },
  ] as Todo[],

  getAll() {
    return [...this.data];
  },

  getById(id: number) {
    return this.data.find((t) => t.id === id);
  },

  create(title: string) {
    const newTodo: Todo = {
      id: Math.max(...this.data.map((t) => t.id), 0) + 1,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.data.push(newTodo);
    return newTodo;
  },

  update(id: number, updates: Partial<Todo>) {
    const index = this.data.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  },

  delete(id: number) {
    const index = this.data.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const deleted = this.data[index];
    this.data = this.data.filter((t) => t.id !== id);
    return deleted;
  },
};

export const postsStore = {
  data: [
    { id: 1, title: "TanStack Query 소개", body: "TanStack Query는 강력한 서버 상태 관리 라이브러리입니다.", userId: 1 },
    { id: 2, title: "useQuery 기초", body: "useQuery는 데이터를 가져오는 기본 훅입니다.", userId: 1 },
    { id: 3, title: "useMutation 사용법", body: "useMutation은 데이터를 변경할 때 사용합니다.", userId: 2 },
    { id: 4, title: "캐싱 전략", body: "TanStack Query의 캐싱은 매우 강력합니다.", userId: 2 },
    { id: 5, title: "staleTime vs gcTime", body: "두 옵션의 차이를 이해하는 것이 중요합니다.", userId: 1 },
    { id: 6, title: "Infinite Query", body: "무한 스크롤을 구현할 때 사용합니다.", userId: 3 },
    { id: 7, title: "Optimistic Updates", body: "낙관적 업데이트로 UX를 개선할 수 있습니다.", userId: 3 },
    { id: 8, title: "Query Invalidation", body: "캐시 무효화는 데이터 동기화의 핵심입니다.", userId: 1 },
    { id: 9, title: "에러 처리", body: "에러 바운더리와 함께 사용하면 좋습니다.", userId: 2 },
    { id: 10, title: "SSR과 TanStack Query", body: "Next.js와 함께 사용하는 방법을 알아봅니다.", userId: 3 },
  ] as Post[],

  getAll() {
    return [...this.data];
  },

  getById(id: number) {
    return this.data.find((p) => p.id === id);
  },

  getByUserId(userId: number) {
    return this.data.filter((p) => p.userId === userId);
  },

  create(post: Omit<Post, "id">) {
    const newPost: Post = {
      id: Math.max(...this.data.map((p) => p.id), 0) + 1,
      ...post,
    };
    this.data.push(newPost);
    return newPost;
  },

  update(id: number, updates: Partial<Post>) {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  },

  delete(id: number) {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const deleted = this.data[index];
    this.data = this.data.filter((p) => p.id !== id);
    return deleted;
  },
};

export const usersStore = {
  data: [
    { id: 1, name: "김철수", email: "kim@example.com" },
    { id: 2, name: "이영희", email: "lee@example.com" },
    { id: 3, name: "박민수", email: "park@example.com" },
  ] as User[],

  getAll() {
    return [...this.data];
  },

  getById(id: number) {
    return this.data.find((u) => u.id === id);
  },
};
