const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

// 由于 download-git-repo 使用回调机制，在此进行 promify 操作，转变为 promise
const download = promisify(require("download-git-repo"));
const open = require("open");

const { reactRepo, repoPreviewUrl } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");

// 创建项目相关 action
const createProjectAction = async (project, others) => {
  console.log("Waiting for creating the project~");
  // 1. clone 项目
  // project 对应模板下载本地路径
  // clone: true 表示执行 git clone
  await download(reactRepo, project, { clone: true });

  // 2. 根据当前模板所使用的包管理工具 npm / yarn，选择不同的命令
  const yarnLockPath = path.resolve(process.cwd(), project, "yarn.lock");
  const isYarnExist = fs.existsSync(yarnLockPath);
  const manager = isYarnExist ? "yarn" : "npm";

  // 平台判断 仅在当前运行环境为 Windows 时，才使用 shell
  const isWin = process.platform === "win32";

  // 3. 下载模板依赖
  await commandSpawn(manager, ["install"], {
    cwd: `./${project}`,
    shell: isWin,
  });

  // 4. run build 命令（由于所使用模板，需要进行一次 build 才能进行预览）
  await commandSpawn(manager, ["run", "build"], {
    cwd: `./${project}`,
    shell: isWin,
  });

  // 5. run serve 命令
  // 如果使用 await 关键字，该进程执行完毕会处于阻塞状态
  // 故而使用异步操作，开启浏览器等待后续项目热更新
  commandSpawn(manager, ["run", "serve"], {
    cwd: `./${project}`,
    shell: isWin,
  });

  // 5. 打开浏览器
  open(repoPreviewUrl);
};

// 添加组件相关 action
const addComponentAction = async (name, others) => {};

module.exports = {
  createProjectAction,
  addComponentAction,
};
