const HDKey = require('hdkey')
const Wallet = require('./index.js')

function CSEHDKey () {
}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new CSEHDKey()
  ret._hdkey = hdkey
  return ret
}

CSEHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

CSEHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

CSEHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

CSEHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

CSEHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

CSEHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

CSEHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = CSEHDKey
