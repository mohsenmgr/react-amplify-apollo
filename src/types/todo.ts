import dayjs from "dayjs";

interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  photo?: string;
  dueDate?: dayjs.Dayjs | undefined | string;
  done: boolean;
  createdAt?: String | Date | Number;
}

export type { Todo };
