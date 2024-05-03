const { ethers } = require("ethers");
// const { Defender } = require("@openzeppelin/defender-sdk");
const Safe = require("@safe-global/protocol-kit").default;
const { EthersAdapter } = require("@safe-global/protocol-kit");

const ABI = [
  "function transfer(address to, uint256 value) returns (bool)",
];

const IToken = new ethers.Interface(ABI);
const ADDRESS_WMATIC =  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270" // wmatic,



async function doTransaction(signer:any){


const safeAddress = "0x2e200757fFeb98ac68e26C1931F259fa3Ac247c9";
const receiver = "0xFEBC231959550fFecd1AD1Ae22A3d6Bb55471B6a";
const amount = 0.001


  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safeSdk = await Safe.create({
    ethAdapter: ethAdapter,
    safeAddress: safeAddress,
  });

  const encodedData = IToken.encodeFunctionData("transfer", [
    receiver,
    ethers.parseUnits(String(amount), 18),
  ]);

  const transactions = [
    {
      to: ADDRESS_WMATIC,
      data: encodedData,
      value: 0,
      operation: 0,
    },
  ];

  const txs = await safeSdk.createTransaction({ transactions });
  const signedTx = await safeSdk.signTransaction(txs);
  console.log('signedTx', signedTx)
  return signedTx

 //const r = await safeSdkRelay.executeTransaction(signedTx);
  //return r.hash
}


export default doTransaction