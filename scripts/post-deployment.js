const hre = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Attaching contracts with the account:', deployer.address);
  const BlueToken = await hre.ethers.getContractFactory('BlueToken');
  const bluetoken = await BlueToken.attach('0xa6db68cfe4c4735d1a2158bc4e2d6c663e038cd7');

  await bluetoken.approve('0xf3857b1946f189352aC5D9bD20DAB0Dd6021D655', ethers.utils.parseEther('1000000'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
