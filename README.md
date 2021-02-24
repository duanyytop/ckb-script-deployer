# ckb-script-deployer

Nervos CKB script deployer

### How to Work

- Edit .env file

```shell
git clone https://github.com/duanyytop/ckb-script-deployer.git
cd ckb-script-deployer
mv .env.example .env
```

You need to copy `.env` file from `.env.example` and input your own DEPLOYER_PRIVATE_KEY, CKB_NODE_RPC and CKB_NODE_INDEXER.

- Installation

```shell
yarn install
```

- Running

```shell
node index.js ./bin/always_success
```

If the script is deployed successfully, the information as blow will be display.

```
The size of binary file is 512 bytes
The code hash of script bin is 0xd483925160e4232b2cb29f012e8380b7b612d71cf4e79991476b6bcf610735f6
Deploy script with code and tx hash 0x6cb20b88912311e6bba89a5fcfc53cfebcc39b99c3cce0796ce3e485a5d47011
```
