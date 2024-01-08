// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract UserDataStorage {
    struct UserData {
        string name;
        string email;
    }

    mapping(address => UserData) public users;

    event UserAdded(address indexed userAddress, string name, string email);

    function addUser(string memory _name, string memory _email) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(users[msg.sender].name).length == 0, "User already exists");

        users[msg.sender] = UserData({
            name: _name,
            email: _email
        });

        emit UserAdded(msg.sender, _name, _email);
    }

    function getUserData(address _userAddress) public view returns (string memory name, string memory email) {
        return (users[_userAddress].name, users[_userAddress].email);
    }
}