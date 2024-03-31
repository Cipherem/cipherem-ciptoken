// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

contract CIPToken is
    OwnableUpgradeable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    ERC20PermitUpgradeable
{
    struct RecipientData {
        address recipient;
        uint256 amount;
    }

    function initialize(
        address initOwner_,
        RecipientData[] calldata initRecipients_
    ) public initializer {
        string memory name_ = "CIPHEREM";
        string memory symbol_ = "CIP";

        __Ownable_init(initOwner_);

        __ERC20_init(name_, symbol_);

        __ERC20Burnable_init();

        __ERC20Permit_init(name_);

        for (uint256 i = 0; i < initRecipients_.length; i++)
            _mint(initRecipients_[i].recipient, initRecipients_[i].amount);
    }

    function batchMint(RecipientData[] calldata recipients) public onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++)
            _mint(recipients[i].recipient, recipients[i].amount);
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
}
