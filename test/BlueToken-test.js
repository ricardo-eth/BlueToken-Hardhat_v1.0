/* eslint-disable quotes */
/* eslint-disable no-undef */

const { expect } = require('chai');

describe('BlueToken', function () {
  let owner, BlueToken, bluetoken;
  const INITIAL_SUPPLY = 1000000000;

  beforeEach(async function () {
    owner = await ethers.getSigner();
    BlueToken = await ethers.getContractFactory('BlueToken');
    bluetoken = await BlueToken.connect(owner).deploy(INITIAL_SUPPLY);
    await bluetoken.deployed();
  });
  describe('Deployment', function () {
    it('Should have name BlueToken', async function () {
      expect(await bluetoken.name()).to.equal('BlueToken');
    });
    it('Should have symbol BTKn', async function () {
      expect(await bluetoken.symbol()).to.equal('BTKn');
    });
    it(`Should have total supply of ${INITIAL_SUPPLY.toString()} BTKn`, async function () {
      expect(await bluetoken.totalSupply()).to.equal(ethers.utils.parseEther(`${INITIAL_SUPPLY}`));
    });
    it('Should mint total supply to owner', async function () {
      expect(await bluetoken.balanceOf(owner.address)).to.equal(ethers.utils.parseEther(`${INITIAL_SUPPLY}`));
    });
  });
});
