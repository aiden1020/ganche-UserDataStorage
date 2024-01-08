var UserDataStorage = artifacts.require("./UserDataStorage.sol");

module.exports = function (deployer) {
  deployer.deploy(UserDataStorage);
};