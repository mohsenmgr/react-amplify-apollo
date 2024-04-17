interface ContextObject {
  user: User;
  loggedIn: boolean;
}

class User {
  id: String | undefined;
  username: String | undefined;
  attributes: Object | undefined;

  constructor() {
    this.id = undefined;
    this.username = undefined;
    this.attributes = undefined;
  }
}

export type { ContextObject };
export { User };
