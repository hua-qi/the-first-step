const program = require("commander");

const { createProjectAction, addComponentAction } = require("./actions");

const createCommanders = () => {
  // [others...] 接收 <project> 之后的可选参数(长度可变)
  program
    .command("create <project> [others...]")
    .description("clone a repository to a folder")
    .action(createProjectAction);

  program
    .command("addcpn <name>")
    .description(
      "add react component, e.g. huaqi-react-demo addcpn HelloWorld -d src/components"
    )
    .action(addComponentAction);
};

module.exports = createCommanders;
