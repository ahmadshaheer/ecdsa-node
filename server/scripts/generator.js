const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
let signature;
console.log("private key:", toHex(privateKey));

signMessage("ethereum", privateKey).then((sign) => {
  const [signature, recoveryBit] = sign;

  console.log("signature:", toHex(sign));
  const publicKey = secp.recoverPublicKey(
    hashMessage("ethereum"),
    signature,
    recoveryBit
  );
  console.log("publicKey", publicKey);
});

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);

  return hash;
}

async function signMessage(msg, privateKey) {
  const hash = hashMessage(msg);
  const sign = await secp.sign(hash, privateKey, { recovered: true });
  return sign;
}
