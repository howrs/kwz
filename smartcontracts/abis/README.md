
## MissionManager
0xC745295a144548B25d2a71d6A680cbf363C7c67B

### Fuctions 설명

function userStakeToken(uint256 amount) public 
- 부모가 TUSD 스테이킹

getStakeBalance(address userAddress)
- 특정 wallet의 TUSD 스테이킹 양 확인

startSession(address userAddress, address parentAddress, string memory userId, string memory teamId)
- session Start
- userAddress: 자녀의 address
- parentAddress: 부모의 address -> 부모의 address에 할당된 TUSD를 꺼내서 아이에게는 KWZ를 지급해준다.
- userId: 참조용
- teamId: 참조용

stopSession()
- session Stop
- msg.sender (컨트랙트를 호출한 wallet)의 세션을 중단, 만약 리워드를 claim하지 않고 종료하면 보상은 날라간다.

getMissionList(address userAddress) public view returns (MissionData[] memory)
- missionList 조회

updateMission(address userAddress, uint256 missionId, uint32 record)
- 이건 Relayer가 호출해서 미션 상태를 업데이트시킴

claimMissionReward(uint256 missionId)
- 자녀가 호출하는 함수, 1번 미션 완료했으면 1, 2번이면 2번 넣고 호출

## TUSD
0xbf29146F8bC461d101D9Aa755cb84EfCF527Bd9d

## KWZ
0xbf4D6BC5793Fb20e588461783f508F27F87275E1
