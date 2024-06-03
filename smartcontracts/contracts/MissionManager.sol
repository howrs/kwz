// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@thirdweb-dev/contracts/extension/Ownable.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC20.sol";

contract MissionManager is Ownable {
    uint256 public latestSessionId;
    uint256 public latestMissionId;
    mapping(address => uint256) public userSessionIdMap;

    struct MissionData {
        uint256 missionId;
        string missionName;
        string description;
        string userId;
        string teamId;
        uint256 sessionId;
        uint32 goal;
        uint32 record;
        bool success;
        uint256 reward;
        bool rewardClaimed;
    }
    mapping(address => MissionData) public userMissionMap1;
    mapping(address => MissionData) public userMissionMap2;

    address private _relayer;
    IERC20 public rewardToken;
    IERC20 public stakeToken;
    address private vaultAddress;

    mapping(address => uint256) public userStakeAmount;
    mapping(uint256 => address) public sessionIdToParentMap;

    constructor(address _rewardTokenAddress, address _stakeTokenAddress, address _vaultAddress) {
        rewardToken = IERC20(_rewardTokenAddress);
        stakeToken = IERC20(_stakeTokenAddress);
        vaultAddress = _vaultAddress;
    }

    function relayer() public view returns (address) {
        return _relayer;
    }

    function userStakeToken(uint256 amount) public {
        // transfer ERC20 token to vault
        stakeToken.transferFrom(msg.sender, vaultAddress, amount);
        userStakeAmount[msg.sender] += amount;
    }

    function getStakeBalance(address userAddress) public view returns (uint256) {
        return userStakeAmount[userAddress];
    }
    
    /**
     *  This function returns who is authorized to set the owner of your contract.
     *
     *  As an EXAMPLE, we'll only allow the current owner to set the contract's new owner.
     *
     *  You MUST complete the body of this function to use the `Ownable` extension.
     */
    function _canSetOwner() internal virtual view override returns (bool) {
        return msg.sender == owner();
    }

    function setupOwner(address _newOwner) public {
        require(msg.sender == owner(), "Ownable: caller is not the owner");
        _setupOwner(_newOwner);
    }

    function setupRelayer(address _newRelayer) public {
        require(msg.sender == owner(), "Ownable: caller is not the owner");
        _relayer = _newRelayer;
    }

    function startSession(address userAddress, address parentAddress, string memory userId, string memory teamId) public returns (uint256) {
        // generate uuid for a session in solidity
        uint256 sessionId = userSessionIdMap[userAddress];
        if (sessionId == 0) {
            latestSessionId++;
            sessionId = latestSessionId;
            userSessionIdMap[userAddress] = sessionId;
            latestMissionId++;

            sessionIdToParentMap[sessionId] = parentAddress;

            MissionData memory mission1 =  MissionData(
              latestMissionId, "Mission 1", "Step Count", userId, teamId, sessionId, 10000, 0, false, 10 * 1000000000000000000, false);
            
            MissionData memory mission2 =  MissionData(
              latestMissionId, "Mission 2", "Calorie", userId, teamId, sessionId, 10000, 0, false,  20 * 1000000000000000000, false);
            
            userMissionMap1[userAddress] = mission1;
            
            userMissionMap2[userAddress] = mission2;
        }
        return sessionId;
    }

    function getMissionList(address userAddress) public view returns (MissionData[] memory) {
        MissionData[] memory missionList = new MissionData[](2);
        missionList[0] = userMissionMap1[userAddress];
        missionList[1] = userMissionMap2[userAddress];
        return missionList;
    }

    function updateMission(address userAddress, uint256 missionId, uint32 record) public {
        require(msg.sender == relayer(), "Ownable: caller is not the relayer");

        uint256 sessionId = userSessionIdMap[userAddress];
        require(sessionId != 0, "Session not started");

        MissionData storage mission = userMissionMap1[userAddress];
        if (mission.missionId == missionId) {
            mission.record = record;
            if (record >= mission.goal) {
                mission.success = true;
            }
        }

        mission = userMissionMap2[userAddress];
        if (mission.missionId == missionId) {
            mission.record = record;
            if (record >= mission.goal) {
                mission.success = true;
            }
        }
    }

    function claimMissionReward(uint256 missionId) public {
        uint256 sessionId = userSessionIdMap[msg.sender];
        require(sessionId != 0, "Session not started");
        address parentWallet = sessionIdToParentMap[sessionId];
        sessionIdToParentMap[userSessionIdMap[msg.sender]];
        MissionData storage mission = userMissionMap1[msg.sender];
        if (mission.missionId == missionId && mission.success && !mission.rewardClaimed) {
            mission.rewardClaimed = true;
            // transfer ERC20 token to user
            rewardToken.transfer(msg.sender, mission.reward);
            stakeToken.transfer(vaultAddress, mission.reward);
            userStakeAmount[parentWallet] -= mission.reward;
        }

        mission = userMissionMap2[msg.sender];
        if (mission.missionId == missionId && mission.success && !mission.rewardClaimed) {
            mission.rewardClaimed = true;
            // transfer ERC20 token to user
            rewardToken.transfer(msg.sender, mission.reward);
            stakeToken.transfer(vaultAddress, mission.reward);
            userStakeAmount[parentWallet] -= mission.reward;
        }
    }

    function stopSession() public {
        userSessionIdMap[msg.sender] = 0;
    }
}