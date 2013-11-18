/*

entityManager.js

A module which handles arbitrary entity-management for "Gorillas"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_bananas : [],
_gorillas   : [],
_bricks : [],

// "PRIVATE" METHODS

_findNearestGorilla : function(posX, posY) {
    var closestGorilla = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._gorillas.length; ++i) {

        var thisGorilla = this._gorillas[i];
        var gorillaPos = thisGorilla.getPos();
    }
    return {
        theGorilla : closestGorilla,
        theIndex: closestIndex
    };
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bananas, this._gorillas, this._bricks];
},

fireBanana: function(cx, cy, velX, velY, rotation,power) {
    this._bananas.push(new Banana({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,

        rotation : rotation,
    }));
},

generateGorilla : function(descr) {
    this._gorillas.push(new Gorilla(descr));
},

generateBrick : function(descr){
    this._bricks.push(new Brick(descr));
},


killNearestGorilla : function(xPos, yPos) {
    var theGorilla = this._findNearestGorilla(xPos, yPos).theGorilla;
    if (theGorilla) {
        theGorilla.kill();
        console.log("Killed A gorilla");
    }
},

yoinkNearestGorilla : function(xPos, yPos) {
    var theGorilla = this._findNearestGorilla(xPos, yPos).theGorilla;
    if (theGorilla) {
        theGorilla.setPos(xPos, yPos);
    }
},

resetGorillas: function() {
    this._forEachOf(this._gorillas, Gorilla.prototype.reset);
},

haltGorillas: function() {
    this._forEachOf(this._gorillas, Gorilla.prototype.halt);
},

checkBricksY : function(nextX,nextY,X,Y,radius) {
    var collideY = false;
    for (var i = 0; i < this._bricks.length; i++)
    {
        if(this._bricks[i].collidesWithY(nextX,nextY,X,Y,radius))
        {
            collideY = true;
        }
    }
    return collideY;
},

checkBricksX : function(nextX,nextY,X,Y,radius) {
    var collideX = false;
    for (var i = 0; i < this._bricks.length; i++)
    {
        if(this._bricks[i].collidesWithX(nextX,nextY,X,Y,radius))
        {
            collideX = true;
        }
    }
    return collideX;
},

deleteAll : function()
{
    for (var c = 0; c < this._categories.length; ++c) {

    var aCategory = this._categories[c];
    var i = 0;

    while (i < aCategory.length) {

        aCategory[i].kill();

        if (status === this.KILL_ME_NOW) {
            // remove the dead guy, and shuffle the others down to
            // prevent a confusing gap from appearing in the array
            aCategory.splice(i,1);
        }
        else {
            ++i;
        }
    }
}
},


update: function(du) {
    if(gameState === 1)
    {

        turnHandler.timer();

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                var status = aCategory[i].update(du);

                if (status === this.KILL_ME_NOW) {
                    // remove the dead guy, and shuffle the others down to
                    // prevent a confusing gap from appearing in the array
                    aCategory.splice(i,1);
                }
                else {
                    ++i;
                }
            }
        }
    }
    else if(gameState === 3)
    {

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                aCategory[i].kill();
                var status = aCategory[i].update(du);

                if ((status === this.KILL_ME_NOW) || (status === this._isDeadNow)) {
                    console.log("KILLING THINGS");
                    // remove the dead guy, and shuffle the others down to
                    // prevent a confusing gap from appearing in the array
                    aCategory.splice(i,1);
                }
                else {
                    ++i;
                }
            }
        }
        gameState = 0;
    }
    else if(gameState === 0)
    {

    }
},

render: function(ctx) {

    if(gameState === 1)
    {

        levelBackground.drawCentredAt(ctx,400,300,0);

        if(turnHandler.playerTurn != 6)
        {
            turnHandler.displayTime();   //Temporary
            turnHandler.displayWind(); //Temporary
        }
        else
        {
            turnHandler.displayWinner();
        }

        var debugX = 10, debugY = 100;

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];

            if (!this._bShowRocks && 
                aCategory == this._rocks)
                continue;

            for (var i = 0; i < aCategory.length; ++i) {

                aCategory[i].render(ctx);
                //debug.text(".", debugX + i * 10, debugY);

            }
            debugY += 10;
        }
    }
    else if(gameState === 0)
    {
        menu.render();
    }

},
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
