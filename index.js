const process = require("process");
const {deployScript} = require("./src/rpc/deploy");

const deploy = async () => {
  const args = process.argv;
  if (args.length != 3) {
    throw new Error("Command arguments size must be 3");
  }

  const path = args[2];
  await deployScript(path);
};

deploy();
