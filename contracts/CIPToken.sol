// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

contract CIPToken is
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    ERC20PermitUpgradeable
{
    function initialize(address initRecipient_) public initializer {
        string memory name_ = "CIPHEREM";
        string memory symbol_ = "CIP";

        __ERC20_init(name_, symbol_);

        __ERC20Burnable_init();

        __ERC20Permit_init(name_);

        _mint(initRecipient_, 300_000_000e18);
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
}
