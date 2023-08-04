const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "30440220505c2a650710effa49fadca8aebee50de55f192f5308c364f90259a2bece98f202206a89090333eedca16b3afe117c1791108e17533693b3ab88411de9fb3c56715d": 100,
  "3045022100f40a9f14134ee9656d29e16b7bd9aee0fa10bf532bc503bec5c899dd4ad6cb7e022073a877b3e4afa1171a156a78d95c11ee2ba558c12a45694e90be6d51043717f3": 50,
  "3045022100f7f54894ae1cea9c9978db451678a934a67f527051f2bbbec691be8551e16b2902202fdeacc4495f12ac4e18fc0cb4208831ab55b6dad429326e95832d6c73f6f5aa": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
