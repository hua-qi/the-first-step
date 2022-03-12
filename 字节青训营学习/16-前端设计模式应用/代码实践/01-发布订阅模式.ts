const button = document.getElementById("button");

const doSomthing1 = () => {
  console.log("Send message to user");
};

const doSomthing2 = () => {
  console.log("Log...");
};

// 这里的订阅者只是一个 click 函数
button.addEventListener("click", doSomthing1);
button.addEventListener("click", doSomthing2);

// ...

// 用户上线订阅

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

test("should notify followers when user is online fo r multiple users", () => {
  const user1 = new User("user1");
  const user2 = new User("user2");
  const user3 = new User("user3");

  const mockMotifyUser1 = jest.fn();
  const mockMotifyUser2 = jest.fn();

  user1.subscribe(user3, mockMotifyUser1);
  user2.subscribe(user3, mockMotifyUser2);

  user3.online();

  expect(mockMotifyUser1).toBeCalledwith(user3);
  expect(mockMotifyUser2).toBeCalledwith(user3);
});
