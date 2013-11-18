// Turn Handler

"use strict";

/*jslint browser: true, devel: true, white: true */


/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var turnHandler = {

     // PlayerTurn kind of gamestate variable
     // controls wich player is allowed to move and 
     // can be used to track game over state, between rounds state or main menu state

    //  PlayerTurn overview
    //  0 = Neither player can move or do anything
    //  1 = Player 1 is in control
    //  2 = Player 2 is in control
    //  5 = Inbetween turns
    //  6 = game is over
     
    originalturnTimer : 166.5/NOMINAL_UPDATE_INTERVAL,
    turnTimer : 166.5/NOMINAL_UPDATE_INTERVAL,
    playerTurn : 1,
    lastPlayer : 0,
    windPower : 0,
    winner : 0,

    turnHandler : function ()
    {
        // Returns what player is allowed to
        // control (1,2 for players) or (0 for no player control)
        return this.playerTurn;
    },

    endTurn : function (lastPl)
    {
        // Passes the current player value (1 or 2) to this function
        // and sets control to 0 (no player)
        this.playerTurn = 0;
        this.lastPlayer = lastPl;
    },

    gameOver : function ()
    {
        // Removes control from both players
        this.playerTurn = 0;
    },

    nextTurn : function ()
    {
        // Uses the variable of the Last Player to have a turn 
        // to give next player control

        this.turnTimer = this.originalturnTimer;
        
        if(this.lastPlayer === 1)
        {
            this.playerTurn = 2;
        }
        else if(this.lastPlayer === 2)
        {
            this.playerTurn = 1;
        }

        this.randomWind();
    },

    timer : function ()
    {
        if((this.turnTimer > 0) && (this.playerTurn === 1 || this.playerTurn === 2)) 
        {
            this.turnTimer = this.turnTimer - NOMINAL_UPDATE_INTERVAL/1000;
        }
        else
        {
            this.turnTimer = 0;
        }
    },

    displayTime : function ()
    {
        // A render function for turn Timer
        // Possibly not the best place to have this function

        var timeToShow = this.turnTimer.toFixed(2);
        var prevFont = ctx.font;
        var prevColor = ctx.fillStyle;
        ctx.font="28px Arial Bold";
        if(timeToShow >= 5)
        {
            ctx.fillStyle = 'white';
        }
        else
        {
            ctx.fillStyle = 'red';
        }


        var stringToDisplay = "Time : " + timeToShow;
        var stringX = util.centerText(stringToDisplay);

        ctx.fillText(stringToDisplay,stringX,45);
        ctx.font = prevFont;
        ctx.fillStyle = prevColor;
    },

    randomWind : function ()
    {
        var randomPower = Math.random()*5;
        var posOrNeg = Math.random();
        if(posOrNeg > 0.5)
        {
            this.windPower = randomPower.toFixed(0);
        }
        else if(posOrNeg <= 0.5)
        {
            this.windPower = -randomPower.toFixed(0);
        }
    },

    displayWind : function ()
    {
        // A render function for wind power
        // Possibly not the best place to have this function

        var windDisplay = "";
        var prevFont = ctx.font;
        var prevColor = ctx.fillStyle;
        var negPowerArray = ["<","<<","<<<","<<<<","<<<<<"];
        var posPowerArray = [">",">>",">>>",">>>>",">>>>>"];
        var colorArray = ["green","yellow","yellow","orange","orange","red"];

        ctx.font="24px Arial Bold";

        if(this.windPower > 0)
        {
            windDisplay = posPowerArray[this.windPower - 1];
            ctx.fillStyle = colorArray[this.windPower];
        }
        else if(this.windPower < 0)
        {
             windDisplay = negPowerArray[Math.abs(this.windPower) - 1];
             ctx.fillStyle = colorArray[Math.abs(this.windPower)];
        }
        else
        {
            windDisplay = "0"
            ctx.fillStyle = colorArray[0];
        }

        var stringToDisplay = "Wind : " + windDisplay;
        var stringX = util.centerText(stringToDisplay);

        ctx.fillText(stringToDisplay,stringX,75);

        ctx.font = prevFont;
        ctx.fillStyle = prevColor;
    },

    displayWinner : function ()
    {
        // A render function for wind power
        // Possibly not the best place to have this function

        var prevFont = ctx.font;
        var prevColor = ctx.fillStyle;


        ctx.font="50px Arial Bold";

        if(this.winner === 1)
        {
            ctx.fillStyle = "blue";
        }
        else
        {
            ctx.fillStyle = "red";
        }

        var stringToDisplay = "Player " + this.winner + " wins !";
        var stringX = util.centerText(stringToDisplay);

        ctx.fillText(stringToDisplay,stringX,200);

        ctx.font = prevFont;
        ctx.fillStyle = prevColor;

        this.playerTurn = 6;

    },

    startGame : function()
    {
        level.setLevel(level.chosenLevel);
        turnHandler.randomWind();
    },

    backToMenu : function()
    {
        this.winner = 0;
        this.playerTurn = 2;
        gameState = 3;
    },

};