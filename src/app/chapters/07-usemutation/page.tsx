"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/lib/api";
import { useState } from "react";
import { Todo } from "@/types";

export default function UseMutationPage() {
  return (
    <ChapterLayout chapterNumber={7} title="useMutation">
      {/* 섹션 1: 개요 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          useMutation이란?
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>useMutation</strong>은 서버 데이터를 생성, 수정, 삭제할 때
            사용합니다. useQuery가 데이터를 &quot;읽기&quot;위한 것이라면,
            useMutation은 데이터를 &quot;쓰기&quot;위한 것입니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700 dark:text-blue-300">
                useQuery (읽기)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                GET 요청, 데이터 조회
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="font-bold text-green-700 dark:text-green-300">
                useMutation (쓰기)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                POST, PUT, PATCH, DELETE 요청
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 2: 옵션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  옵션
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>mutationFn</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  실제 mutation을 수행하는 비동기 함수 (필수)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>onMutate</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 시작 전 호출. Optimistic Update에 사용
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>onSuccess</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 성공시 호출
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>onError</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 실패시 호출
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>onSettled</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  성공/실패 관계없이 완료시 호출
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>retry</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  실패시 재시도 횟수 (기본값: 0)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock title="기본 구조">{`const mutation = useMutation({
  mutationFn: (newTodo) => createTodo(newTodo),
  onMutate: async (newTodo) => {
    // mutation 시작 전
    console.log('시작:', newTodo);
  },
  onSuccess: (data, variables, context) => {
    // 성공시
    console.log('성공:', data);
  },
  onError: (error, variables, context) => {
    // 실패시
    console.error('실패:', error);
  },
  onSettled: (data, error, variables, context) => {
    // 완료시 (성공/실패 무관)
    console.log('완료');
  },
});`}</CodeBlock>
      </section>

      {/* 섹션 3: 반환값 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          반환값
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  속성
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>mutate</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation을 실행하는 함수 (콜백 방식)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>mutateAsync</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation을 실행하는 함수 (Promise 반환)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>isPending</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 실행 중 여부
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>isSuccess</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 성공 여부
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>isError</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 실패 여부
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>data</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 결과 데이터
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>error</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  발생한 에러
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>reset</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  mutation 상태 초기화
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock title="mutate vs mutateAsync">{`// mutate: 콜백 방식
mutation.mutate(data, {
  onSuccess: () => {
    // 성공 처리
  },
});

// mutateAsync: Promise 방식 (try-catch 사용)
try {
  const result = await mutation.mutateAsync(data);
  // 성공 처리
} catch (error) {
  // 에러 처리
}`}</CodeBlock>
      </section>

      {/* 섹션 4: Query Invalidation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Query Invalidation (캐시 무효화)
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            Mutation 후에는 관련된 쿼리를 무효화하여 최신 데이터를 다시
            가져와야 합니다. <code>queryClient.invalidateQueries</code>를
            사용합니다.
          </p>
        </div>

        <CodeBlock title="Query Invalidation 예시">{`const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    // 'todos' 쿼리 무효화 -> 자동으로 refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

// 더 구체적인 무효화
queryClient.invalidateQueries({ queryKey: ['todos', 'list'] });

// 정확히 일치하는 쿼리만 무효화
queryClient.invalidateQueries({
  queryKey: ['todos'],
  exact: true
});`}</CodeBlock>
      </section>

      {/* 섹션 5: 예제 - CRUD */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          예제: Todo CRUD
        </h2>
        <TodoCrudDemo />
      </section>

      {/* 섹션 6: 전체 코드 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          전체 코드 예시
        </h2>
        <CodeBlock title="Todo CRUD 구현">{`function TodoApp() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  // 조회
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // 생성
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  // 수정 (토글)
  const updateMutation = useMutation({
    mutationFn: ({ id, completed }) => updateTodo(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      createMutation.mutate({ title });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일 입력"
        />
        <button disabled={createMutation.isPending}>
          {createMutation.isPending ? '추가 중...' : '추가'}
        </button>
      </form>

      {todos?.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => updateMutation.mutate({
              id: todo.id,
              completed: !todo.completed
            })}
          />
          <span>{todo.title}</span>
          <button onClick={() => deleteMutation.mutate(todo.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}`}</CodeBlock>
      </section>
    </ChapterLayout>
  );
}

// Todo CRUD 데모 컴포넌트
function TodoCrudDemo() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  // 조회
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos-demo"],
    queryFn: fetchTodos,
  });

  // 생성
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos-demo"] });
      setTitle("");
    },
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodo(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos-demo"] });
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos-demo"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createMutation.mutate({ title });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: Todo 앱
      </h3>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새 할일 입력"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          disabled={createMutation.isPending || !title.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {createMutation.isPending ? "추가 중..." : "추가"}
        </button>
      </form>

      {/* Mutation 상태 표시 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {createMutation.isPending && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            생성 중...
          </span>
        )}
        {updateMutation.isPending && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
            수정 중...
          </span>
        )}
        {deleteMutation.isPending && (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
            삭제 중...
          </span>
        )}
      </div>

      {/* Todo 목록 */}
      {isLoading ? (
        <div className="text-center py-4">로딩 중...</div>
      ) : (
        <ul className="space-y-2">
          {todos?.map((todo: Todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  updateMutation.mutate({
                    id: todo.id,
                    completed: !todo.completed,
                  })
                }
                className="w-5 h-5"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteMutation.mutate(todo.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 정보 */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>동작 확인:</strong>
        </p>
        <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
          <li>- 할일 추가 후 목록이 자동으로 갱신됩니다</li>
          <li>- 체크박스 클릭시 완료 상태가 토글됩니다</li>
          <li>- 삭제 버튼 클릭시 항목이 제거됩니다</li>
          <li>- Devtools에서 캐시 업데이트를 확인해보세요</li>
        </ul>
      </div>
    </div>
  );
}
