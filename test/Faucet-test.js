/* eslint-disable quotes */
/* eslint-disable no-undef */

const { expect } = require('chai');

describe('Faucet', function () {
  let owner, alice, bob, BlueToken, bluetoken, Faucet, faucet, tx;
  const INITIAL_SUPPLY_TOKEN = 1000000000;
  const INITIAL_SUPPLY = ethers.utils.parseEther('1000000000');
  const TRANSFER_AMOUNT = ethers.utils.parseEther('1');
  const DELAY_HOUR = 72;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    BlueToken = await ethers.getContractFactory('BlueToken');
    bluetoken = await BlueToken.connect(owner).deploy(INITIAL_SUPPLY_TOKEN);
    await bluetoken.deployed();
    Faucet = await ethers.getContractFactory('Faucet');
    faucet = await Faucet.connect(owner).deploy(bluetoken.address, TRANSFER_AMOUNT, DELAY_HOUR);
    await faucet.deployed();
    await bluetoken.connect(owner).approve(faucet.address, INITIAL_SUPPLY);
  });
  describe('Deployment', function () {
    it(`TransferAmount ✓`, async function () {
      expect(await faucet.transfertAmount()).to.be.equal(TRANSFER_AMOUNT);
    });
    it('DelayHour ✓', async function () {
      expect(await faucet.delay()).to.be.equal(DELAY_HOUR * 3600); // in seconds
    });
  });
  describe('ClaimToken', function () {
    beforeEach(async function () {
      tx = faucet.connect(alice).claimToken();
    });
    it(`Should transfer ${TRANSFER_AMOUNT} BlueToken to claimer`, async function () {
      await expect(() => tx).to.changeTokenBalances(
        bluetoken,
        [owner, alice],
        [TRANSFER_AMOUNT.mul(-1), TRANSFER_AMOUNT]
      );
    });
    it(`Should set Alice to ${DELAY_HOUR} Hours`, async function () {
      await tx;
      expect(await faucet.delayOf(alice.address)).to.be.equal(
        Number(ethers.provider._fastQueryDate.toString().slice(0, 10)) + DELAY_HOUR * 3600 + 17
      );
    });
  });
});
