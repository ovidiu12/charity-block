pragma solidity >=0.4.22 <0.7.0;

import "./CharityCampaign.sol";
import "./CharityToken.sol";


contract Main is CharityToken {
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

    function getActiveCampaigns()
        public
        view
        returns (CharityCampaign[] memory)
    {
        return activeCampaigns;
    }
}
