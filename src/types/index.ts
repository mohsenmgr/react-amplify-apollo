class MyAppContext {
  user: User;
  loggedIn: boolean;
  callback: (context: MyAppContext) => void;

  constructor() {
    this.user = new User();
    this.loggedIn = false;
    this.callback = (_context: MyAppContext) => {
      throw new Error("callback function not Implemented");
    };
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }
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

  setUser(
    id: String | undefined,
    username: String | undefined,
    attributes: Object | undefined
  ) {
    this.id = id;
    this.username = username;
    this.attributes = attributes;
  }
}

export { User, MyAppContext };
