interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  photo?: string;
  dueDate?: Date;
  done: boolean;
  createdAt?: String | Date | Number;
}

export type { Todo };
