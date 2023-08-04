import secp from "ethereum-cryptography/secp256k1";
import server from "./server";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  signature,
  setSignature,
}) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    const publicKey = secp.recoverPublicKey(messageHash, sig, recoveryBit);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input
          placeholder="Type a signature"
          value={signature}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
