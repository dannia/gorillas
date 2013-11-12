// Turn Handler

"use strict";

/*jslint browser: true, devel: true, white: true */


/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var originalturnTimer = 500/NOMINAL_UPDATE_INTERVAL;
var turnTimer = 500/NOMINAL_UPDATE_INTERVAL;
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

    turnTimer = originalturnTimer;
    
    if(lastPlayer === 1)
    {
        playerTurn = 2;
    }
    else if(lastPlayer === 2)
    {
        playerTurn = 1;
    }
}

function timer()
{
    turnTimer = turnTimer - NOMINAL_UPDATE_INTERVAL/1000;
}

function displayTime()
{
    var timeToShow = turnTimer.toFixed(2);
    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;
    ctx.font="28px Arial Bold";
    ctx.fillStyle = 'white';
    ctx.fillText("Time : " + timeToShow,(g_canvas.width/2)-90,45);
    ctx.font = prevFont;
    ctx.fillStyle = prevColor;
}