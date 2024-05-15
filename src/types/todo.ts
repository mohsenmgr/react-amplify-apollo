interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  photo?: string;
  createdAt: String | Date | Number;
}

export type { Todo };
