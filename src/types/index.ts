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
  id: string;
  username: string;
  attributes: Object | undefined;

  constructor() {
    this.id = "";
    this.username = "";
    this.attributes = "";
  }

  setUser(id: string, username: string, attributes: Object | undefined) {
    this.id = id;
    this.username = username;
    this.attributes = attributes;
  }
}

export { User, MyAppContext };
