// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract Upload is Initializable, UUPSUpgradeable, OwnableUpgradeable{

//struct of Access
    struct Access{
        address user;
        bool access;
    }

    //Maping data type
    mapping(address => string[])value;
    mapping(address =>mapping(address => bool)) ownership;
    mapping(address=>Access[]) accessList;
    mapping(address=>mapping(address=>bool)) previousData;


    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function add(address _user,string memory url)public{
        value[_user].push(url);
    }

    function deleteUserContent(address _user,uint index)external{
        delete value[_user][index];
    }

    //Give access for the users
    function allow(address user)external{
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user]){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }else{
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user] = true;

        }
        
    }

    function disallow(address user)public{
        ownership[msg.sender][user]=false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user==user){
                accessList[msg.sender][i].access = false;
            }
        }
    } 

    function display(address _user)external view returns(string[] memory){
        require(_user==msg.sender || ownership[_user][msg.sender],"You don't have the access");
        return value[_user];
    }

    function shareAccess()public view returns(Access[] memory){
        return  accessList[msg.sender];
    }
}