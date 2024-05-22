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
  username: string;
  attributes: Object | undefined;

  constructor() {
    this.username = "";
    this.attributes = undefined;
  }

  setUser(username: string, attributes: Object | undefined) {
    this.username = username;
    this.attributes = attributes;
  }
}

export { User, MyAppContext };
