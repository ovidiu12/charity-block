pragma solidity >=0.4.22 <0.7.0;


contract CharityCampaign {
    //make a spending request in order to spend the funded money
    struct SpendingRequest {
        string description;
        uint256 amount;
        address payable recipient;
        bool isComplete;
        uint256 nrOfApprovals;
        //who approved the request
        mapping(address => bool) allApprovals;
    }

    SpendingRequest[] public spendingRequests;
    //needs a minimum contribution
    uint256 public minDonation;
    //how much money the campaign needs to be funded
    uint256 public goal;
    //the owner of the campaign
    address public admin;
    bool public isFunded;
    string public title;
    string public description;
    //mapping of people who donated
    mapping(address => bool) public donors;
    //mapping of people who donated & with what amount
    mapping(address => uint256[]) public donorsAmounts;
    uint256 public donorsCount;
    // array of cover image hashes
    string[] public coverImageHash;

    modifier restrictedAccess() {
        require(msg.sender == admin, "you can't perform this action");
        _;
    }

    constructor(
        uint256 min,
        uint256 fundingGoal,
        address creator,
        string memory campaignTitle,
        string memory campaignDescription,
        string memory imageHash
    ) public {
        minDonation = min;
        goal = fundingGoal;
        admin = creator;
        title = campaignTitle;
        description = campaignDescription;
        coverImageHash.push(imageHash);
    }

    function finishCampaign() public restrictedAccess {
        require(
            address(this).balance >= goal,
            "balance needs to be bigger than the goal"
        );

        isFunded = true;
    }

    function donateToCampaign(address sender) public payable {
        require(
            msg.value > minDonation,
            "you need to meet the minimum donation requirement"
        );
        require(!isFunded, "campaign ended");
        donors[sender] = true;
        if (donorsAmounts[sender].length == 0) {
            donorsCount++;
        }
        donorsAmounts[sender].push(msg.value);
    }

    function createSpendingRequest(
        string memory spendingDescription,
        uint256 amount,
        address payable recipient
    ) public restrictedAccess {
        SpendingRequest memory spendingReq = SpendingRequest({
            description: spendingDescription,
            amount: amount,
            recipient: recipient,
            isComplete: false,
            nrOfApprovals: 0
        });

        spendingRequests.push(spendingReq);
    }

    function approveSpendingRequest(uint256 index) public {
        //gets the request from the main state of the contract
        SpendingRequest storage request = spendingRequests[index];

        require(
            donors[msg.sender],
            "you must donate to this campaign before approving a request"
        );
        require(
            !request.allApprovals[msg.sender],
            "address already approved request"
        );
        //add address into the approvals array
        request.allApprovals[msg.sender] = true;
        //increase nr of approvals
        request.nrOfApprovals++;
    }

    function completeSpendingRequest(uint256 index)
        public
        payable
        restrictedAccess
    {
        SpendingRequest storage request = spendingRequests[index];

        require(!request.isComplete, "request is already completed");
        require(
            (request.nrOfApprovals > (donorsCount / 2)),
            "at least 50% of approvals are required"
        );

        request.recipient.transfer(request.amount);
        request.isComplete = true;
    }

    function getData()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            bool,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            goal,
            minDonation,
            address(this).balance, //balance of the campaign
            spendingRequests.length,
            donorsCount,
            admin,
            isFunded,
            title,
            description,
            coverImageHash[0]
        );
    }

    function didApprovedRequest(uint256 index, address approver)
        public
        view
        returns (bool)
    {
        SpendingRequest storage request = spendingRequests[index];

        return request.allApprovals[approver];
    }

    function didDonate(address donorAddress) external view returns (bool) {
        return donors[donorAddress];
    }

    function getAmountDonated(address donorIndex)
        public
        view
        returns (uint256[] memory)
    {
        return donorsAmounts[donorIndex];
    }
}
