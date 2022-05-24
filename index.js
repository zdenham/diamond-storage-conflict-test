const ethers = require('ethers');

const NUM_STORAGE_SLOTS = 1000000;

// used to make arbitrary random
// strings for input to keccak256
function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const runTest = () => {
  const bigNums = [];
  for (let i = 0; i < NUM_STORAGE_SLOTS; i++) {
    const randInputString = makeid(100);
    const hashBytes32 = ethers.utils.solidityKeccak256(
      ['string'],
      [randInputString]
    );

    const bigNumFromHash = ethers.BigNumber.from(hashBytes32);
    bigNums.push(bigNumFromHash);
  }

  const sortedBigNums = bigNums.sort((a, b) => {
    return a.sub(b).lte(0) ? -1 : 1;
  });

  let minDiffBits = ethers.BigNumber.from(
    '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
  );

  for (let i = 0; i < sortedBigNums.length - 1; i++) {
    const dif = sortedBigNums[i + 1].sub(sortedBigNums[i]);
    if (dif.lte(minDiffBits)) {
      minDiffBits = dif;
    }
  }

  console.log(
    'THE MINIMUM Diff IN STORAGE POSITION (Bits): ',
    minDiffBits.toString()
  );
};

runTest();
