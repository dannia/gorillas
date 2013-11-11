// Turn Handler

"use strict";

/*jslint browser: true, devel: true, white: true */


/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var turnTimer = 5000 / NOMINAL_UPDATE_INTERVAL;
var playerTurn = 1;
var lastPlayer = 0;

function turnHandler()
{
    return playerTurn;
}

function endTurn(lastPl)
{
    playerTurn = 0;
    lastPlayer = lastPl;
}

function gameOver()
{
    playerTurn = 0;
}

function nextTurn()
{
    console.log(lastPlayer);
    
    if(lastPlayer === 1)
    {
        playerTurn = 2;
    }
    else if(lastPlayer === 2)
    {
        playerTurn = 1;
    }
}