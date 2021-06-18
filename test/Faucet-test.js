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
      expect(await faucet.transferAmount()).to.be.equal(TRANSFER_AMOUNT);
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
    it('Should emit a transfer event', async function () {
      await expect(tx).to.emit(bluetoken, 'Transfer').withArgs(owner.address, alice.address, TRANSFER_AMOUNT);
    });
    it('Should revert if claim already', async function () {
      await tx;
      await expect(faucet.connect(alice).claimToken()).to.be.revertedWith('Faucet: you need to wait');
    });
    it('Should pass', async function () {
      await tx;
      await ethers.provider.send('evm_increaseTime', [DELAY_HOUR * 3600]);
      await ethers.provider.send('evm_mine');
      const tx2 = faucet.connect(alice).claimToken();
      await expect(() => tx2).to.changeTokenBalances(
        bluetoken,
        [owner, alice],
        [TRANSFER_AMOUNT.mul(-1), TRANSFER_AMOUNT]
      );
    });
  });
  describe('Setter', function () {
    it('Should set a new Delay', async function () {
      await faucet.connect(owner).setDelay(48);
      expect(await faucet.delay()).to.be.equal(172800);
    });
    it('Should set a new transfer amount', async function () {
      await faucet.connect(owner).setTransferAmount(TRANSFER_AMOUNT.mul(10));
      expect(await faucet.transferAmount()).to.be.equal(TRANSFER_AMOUNT.mul(10));
    });
    it('Should revert if not Owner', async function () {
      await expect(faucet.connect(alice).setDelay(1)).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
  describe('Getter', function () {
    it('Delay', async function () {
      expect(await faucet.delay()).to.be.equal(259200);
    });
    it('TransferAmount', async function () {
      expect(await faucet.transferAmount()).to.be.equal(TRANSFER_AMOUNT);
    });
  });
  describe('TimeRest', function () {
    it('Should return second left', async function () {
      await faucet.connect(alice).claimToken();
      expect(await faucet.connect(alice).timeRest()).to.be.equal(259200);
    });
    it('Should return 0 when claim available', async function () {
      expect(await faucet.connect(alice).timeRest()).to.be.equal(0);
    });
  });
  /*
  describe('Bob', function () {
    it(`Should set Bob to ${DELAY_HOUR} Hours`, async function () {
      await faucet.connect(bob).claimToken();
      expect(await faucet.delayOf(bob.address)).to.be.equal(
        Number(ethers.provider._fastQueryDate.toString().slice(0, 10)) + DELAY_HOUR * 3600
      );
    });
  });
  */
});
