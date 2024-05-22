class TodoContext {
  refreshTodo: () => Promise<string>;

  constructor(func: () => Promise<string>) {
    this.refreshTodo = func;
  }
}

export { TodoContext };
