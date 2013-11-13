// Turn Handler

"use strict";

/*jslint browser: true, devel: true, white: true */


/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var originalturnTimer = 250/NOMINAL_UPDATE_INTERVAL;
var turnTimer = 250/NOMINAL_UPDATE_INTERVAL;
var playerTurn = 1;
var lastPlayer = 0;
var windPower = 0;

function turnHandler()
{
    // Returns what player is allowed to
    // control (1,2 for players) or (0 for no player control)
    return playerTurn;
}

function endTurn(lastPl)
{
    // Passes the current player value (1 or 2) to this function
    // and sets control to 0 (no player)
    playerTurn = 0;
    lastPlayer = lastPl;
}

function gameOver()
{
    // Removes control from both players
    playerTurn = 0;
}

function nextTurn()
{
    // Uses the variable of the Last Player to have a turn 
    // to give next player control

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

    randomWind();
}

function timer()
{
    if(turnTimer > 0)
    {
        turnTimer = turnTimer - NOMINAL_UPDATE_INTERVAL/1000;
    }
    else
    {
        turnTimer = 0;
    }
}

function displayTime()
{
    // A render function for turn Timer
    // Possibly not the best place to have this function

    var timeToShow = turnTimer.toFixed(2);
    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;
    ctx.font="28px Arial Bold";
    ctx.fillStyle = 'white';
    ctx.fillText("Time : " + timeToShow,(g_canvas.width/2)-90,45);
    ctx.font = prevFont;
    ctx.fillStyle = prevColor;
}

function randomWind()
{
    var randomPower = Math.random()*5;
    var posOrNeg = Math.random();
    if(posOrNeg > 0.5)
    {
        windPower = randomPower.toFixed(0);
    }
    else if(posOrNeg <= 0.5)
    {
        windPower = -randomPower.toFixed(0);
    }
}

function displayWind()
{
    // A render function for wind power
    // Possibly not the best place to have this function

    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;
    ctx.font="24px Arial Bold";
    ctx.fillStyle = 'white';
    ctx.fillText("Wind : " + windPower,(g_canvas.width/2)-55,75);
    ctx.font = prevFont;
    ctx.fillStyle = prevColor;
}