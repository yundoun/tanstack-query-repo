// 실습에서 사용할 타입 정의

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

// API 응답 타입
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Mutation 요청 타입
export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}
