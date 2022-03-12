type Notify = (user: User) => void;

export class User {
  name: string;
  status: "offline" | "online";
  followers: {
    user: User;
    notify: Notify;
  }[];

  constructor(name: string) {
    this.name = name;
    this.status = "offline";
    this.followers = [];
  }

  subscribe(user: User, notify: Notify) {
    user.followers.push({ user, notify });
  }

  online() {
    this.status = "online";

    this.followers.forEach(({ notify }) => {
      notify(this);
    });
  }
}

// ES6 之前 创建对象的 原型对象
const baseUser: User = {
  name: "",
  status: "offline",
  followers: [],

  subscribe(user, notify) {
    user.followers.push({ user, notify });
  },

  online() {
    this.status = "online";

    this.followers.forEach(({ notify }) => {
      notify(this);
    });
  },
};

export const createUser = (name: string) => {
  // 创建对象
  const user: User = Object.create(baseUser);

  user.name = name;
  user.followers = [];

  return user;
};

test("should notify followers wen user is online for user prototypes", () => {
  const user1 = createUser("user1");
  const user2 = createUser("user2");
  const user3 = createUser("user3");

  const mockMotifyUser1 = jest.fn();
  const mockMotifyUser2 = jest.fn();

  user1.subscribe(user3, mockMotifyUser1);
  user2.subscribe(user3, mockMotifyUser2);

  user3.online();

  expect(mockMotifyUser1).toBeCalledwith(user3);
  expect(mockMotifyUser2).toBeCalledwith(user3);
});
