const fs = require("fs");
const CKB = require("@nervosnetwork/ckb-sdk-core").default;
const {blake2b, PERSONAL, hexToBytes} = require("@nervosnetwork/ckb-sdk-utils");
const {secp256k1LockScript, secp256k1Dep, getCells, collectInputs, FEE, CKB_UNIT, CKB_MIN_CAPACITY} = require("./helper");
const {CKB_NODE_RPC, DEPLOYER_PRIVATE_KEY} = require("../utils/config");

const ckb = new CKB(CKB_NODE_RPC);

const generateOutputs = async (inputCapacity, binCapacity) => {
  const deployerLockScript = await secp256k1LockScript();
  let outputs = [
    {
      capacity: `0x${binCapacity.toString(16)}`,
      lock: deployerLockScript,
    },
  ];
  const changeCapacity = inputCapacity - FEE - binCapacity;
  outputs.push({
    capacity: `0x${changeCapacity.toString(16)}`,
    lock: deployerLockScript,
  });
  return outputs;
};

const deployScript = async (binPath) => {
  try {
    let bin = await fs.readFileSync(binPath, "hex");
    let binSize = bin.length / 2;
    console.info(`The size of binary file is ${binSize} bytes`);

    const s = blake2b(32, null, null, PERSONAL);
    s.update(hexToBytes(`0x${bin}`));
    const codeHash = `0x${s.digest("hex")}`;
    console.info(`The code hash of script bin is ${codeHash}`);

    const binCapacity = BigInt(binSize) * CKB_UNIT + CKB_MIN_CAPACITY;

    const deployerLockScript = await secp256k1LockScript();
    const liveCells = await getCells(deployerLockScript);
    const {inputs, capacity} = collectInputs(liveCells, binCapacity);
    const outputs = await generateOutputs(capacity, binCapacity);
    const cellDeps = [await secp256k1Dep()];
    const rawTx = {
      version: "0x0",
      cellDeps,
      headerDeps: [],
      inputs,
      outputs,
      outputsData: [`0x${bin}`, "0x"],
    };
    rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? "0x" : {lock: "", inputType: "", outputType: ""}));
    const signedTx = ckb.signTransaction(DEPLOYER_PRIVATE_KEY)(rawTx);
    const txHash = await ckb.rpc.sendTransaction(signedTx);
    console.info(`Deploy script with code and tx hash ${txHash}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  deployScript,
};
