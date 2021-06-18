const hre = require('hardhat');
const { readJson } = require('./readJson');

const TOKEN_CONTRACT = 'BlueToken';
const FAUCET_CONTRACT = 'Faucet';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Attaching contracts with the account:', deployer.address);

  const json = await readJson();

  const BlueToken = await hre.ethers.getContractFactory('BlueToken');
  const bluetoken = await BlueToken.attach(json[TOKEN_CONTRACT][hre.network.name].address);

  await bluetoken.approve(json[FAUCET_CONTRACT][hre.network.name].address, ethers.utils.parseEther('1000000'));
  console.log(`${FAUCET_CONTRACT}: ${json[FAUCET_CONTRACT][hre.network.name].address} has been approved`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
