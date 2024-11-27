// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Fun {
    uint public x = 125;
    constructor(uint _x) {
        x = _x;
    }

    function setX(uint _x) public {
        x = _x;
    }
}