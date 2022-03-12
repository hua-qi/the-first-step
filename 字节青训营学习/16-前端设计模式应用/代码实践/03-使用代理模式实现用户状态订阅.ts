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

  // 单一职责原则：一个方法或一个对象尽量只做一件事情
  online() {
    this.status = "online";

    // 代理模式优化，去除该方法，保持单一职责原则
    // this.followers.forEach(({ notify }) => {
    //   notify(this);
    // });
  }
}

export const createProxyUser = (name: string) => {
  const user = new User(name);

  const proxyUser = new Proxy(user, {
    set: (target, prop: keyof User, value) => {
      target[prop] = value;
      if (prop === "status") {
        notifyStatusHandlers(target, value);
      }
      return true;
    },
  });

  const notifyStatusHandlers = (user: User, status: "online" | "offline") => {
    if (status === "online") {
      user.followers.forEach(({ notify }) => {
        notify(user);
      });
    }
  };

  return proxyUser;
};
