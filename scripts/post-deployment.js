const hre = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Attaching contracts with the account:', deployer.address);
  const BlueToken = await hre.ethers.getContractFactory('BlueToken');
  const bluetoken = await BlueToken.attach('0xa6db68cfe4c4735d1a2158bc4e2d6c663e038cd7');

  await bluetoken.approve('0x9049778C0907566fF7EdB77F60a662a04D82AD3D', ethers.utils.parseEther('1000000'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
