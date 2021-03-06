// Turn Handler

"use strict";

/*jslint browser: true, devel: true, white: true */

var turnHandler = {

     // PlayerTurn kind of gamestate variable
     // controls wich player is allowed to move and 
     // can be used to track game over state, between rounds state or main menu state

    //  PlayerTurn overview
    //  0 = Neither player can move or do anything
    //  1 = Player 1 is in control
    //  2 = Player 2 is in control
    //  5 = Banana in the air, wait for it to set PlayerTurn to 0
     
    originalturnTimer : 166.5/NOMINAL_UPDATE_INTERVAL,
    turnTimer : 166.5/NOMINAL_UPDATE_INTERVAL,
    powerUpExists : false,
    playerTurn : 0,
    lastPlayer : util.randomPlayer(),
    windPower : 0,
    winner : 0,
    gameOver : false,

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
        this.playerTurn = 5;
        this.lastPlayer = lastPl;
    },

    setGameOver : function (winner)
    {
        this.winner = winner; 
        this.gameOver = true;
        this.playerTurn = 5;
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

        var summonPowerUp = Math.random() * 1;

        if(!this.powerUpExists && level.powerUp && (summonPowerUp >= 0.85))
        {
            var randomPower = Math.floor((Math.random()*5)+1);
            var powerLocation =  Math.floor((Math.random()* level.powerUpY.length));
            this.powerUpExists = true;
             entityManager.generatePowerup({
                cx : level.powerUpX[powerLocation],
                cy : level.powerUpY[powerLocation],
                power : randomPower,
            });
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
        if(turnHandler.turnTimer < 0)
        {
            this.lastPlayer = this.playerTurn;
            turnHandler.playerTurn = 0;
        }
    },

    displayTime : function ()
    {
        var timeToShow = this.turnTimer.toFixed(2);
        var fillStyle = "";

        if(timeToShow >= 5)
        {
            fillStyle = 'white';
        }
        else
        {
            fillStyle = 'red';
        }

        var stringToDisplay = "Time : " + timeToShow;

        util.renderText(ctx,stringToDisplay,g_canvas.width/2,45,"28px Arial Bold",fillStyle,"center");
    },

    randomWind : function ()
    {
        var randomPower = Math.random() * level.maxWind;
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
        var windDisplay = "";
        var fillStyle = "";
        var negPowerArray = ["<","<<","<<<","<<<<","<<<<<"];
        var posPowerArray = [">",">>",">>>",">>>>",">>>>>"];
        var colorArray = ["green","yellow","yellow","orange","orange","red"];

        if(this.windPower > 0)
        {
            windDisplay = posPowerArray[this.windPower - 1];
            fillStyle = colorArray[this.windPower];
        }
        else if(this.windPower < 0)
        {
             windDisplay = negPowerArray[Math.abs(this.windPower) - 1];
             fillStyle = colorArray[Math.abs(this.windPower)];
        }
        else
        {
            windDisplay = "0"
            fillStyle = colorArray[0];
        }

        var stringToDisplay = "Wind : " + windDisplay;

        util.renderText(ctx,stringToDisplay,g_canvas.width/2,75,"24px Arial Bold",fillStyle,"center");
    },

    displayWinner : function ()
    {
        var fillStyle = "";

        if(this.winner === 1)
        {
            fillStyle = "blue";
        }
        else if(this.winner === 2)
        {
            fillStyle = "red";
        }

        util.renderText(ctx,"Player " + this.winner + " wins !",g_canvas.width/2,g_canvas.height/3,"50px Arial Bold",fillStyle,"center");

        util.renderText(ctx,"Press Spacebar",g_canvas.width/2,g_canvas.height/2,"30px Arial Bold",fillStyle,"center");

        this.gameOver = true;

    },

    displayPressSpace : function ()
    {
        var fillStyle = "";
        var stringToDisplay = "";

        if(this.lastPlayer === 1)
        {
            fillStyle = "red";
            stringToDisplay = "Player 2 Press Spacebar";
        }
        else if(this.lastPlayer === 2)
        {
            fillStyle = "blue";
            stringToDisplay = "Player 1 Press Spacebar";

        }
        util.renderText(ctx,stringToDisplay,g_canvas.width/2,g_canvas.height - 30,"40px Arial Bold",fillStyle,"center");
    },

    startGame : function()
    {
        this.lastPlayer = util.randomPlayer();
        this.gameOver = false;
        this.powerUpExists = false;
        level.setLevel(level.chosenLevel);
        this.turnTimer = this.originalturnTimer;
        turnHandler.randomWind();
        this.playerTurn = 0;
    },

    backToMenu : function()
    {
        this.winner = 0;
        gameState = 3;
    },
};