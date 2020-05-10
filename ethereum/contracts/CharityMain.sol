pragma solidity >=0.4.22 <0.7.0;

import "./CharityCampaign.sol";
import "./CharityToken.sol";


contract CharityMain is CharityToken {
    CharityCampaign[] public activeCampaigns;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 decimalUnits,
        uint256 initialSupply
    )
        public
        CharityToken(tokenName, tokenSymbol, decimalUnits, initialSupply)
    {}

    function createCampaign(
        uint256 minDonation,
        uint256 goal,
        string memory title,
        string memory description,
        string memory coverImage
    ) public {
        CharityCampaign newCampaign = new CharityCampaign(
            minDonation,
            goal,
            msg.sender,
            title,
            description,
            coverImage
        );

        activeCampaigns.push(newCampaign);
    }
    
    function donate(uint256 index) public payable returns (bool){
        CharityCampaign campaign = CharityCampaign(activeCampaigns[index]);
        campaign.donateToCampaign{value: msg.value}(msg.sender);
        rewardToken(msg.sender, msg.value);
        return true;
    }
    
    
    function getActiveCampaigns()
        public
        view
        returns (CharityCampaign[] memory)
    {
        return activeCampaigns;
    }
}
