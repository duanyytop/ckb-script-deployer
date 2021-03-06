require("dotenv").config();
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const CKB_NODE_RPC = process.env.CKB_NODE_RPC || "http://localhost:8114";
const CKB_NODE_INDEXER = process.env.CKB_NODE_INDEXER || "http://localhost:8116";

module.exports = {
  DEPLOYER_PRIVATE_KEY,
  CKB_NODE_RPC,
  CKB_NODE_INDEXER,
};
