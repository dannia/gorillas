// ======
// Banana
// ======

"use strict";

/*jslint browser: true, devel: true, white: true */

// A generic contructor which accepts an arbitrary descriptor object

function Banana(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    this.fireSound.play();
    
/*
    // Diagnostics to check inheritance stuff
    this._bananaProperty = true;
    console.dir(this);
*/

}

Banana.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Banana.prototype.fireSound = new Audio(
    "https://notendur.hi.is/~pk/308G/Asteroids_Exercise/sounds/bulletFire.ogg");
Banana.prototype.zappedSound = new Audio(
    "https://notendur.hi.is/~pk/308G/Asteroids_Exercise/sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Banana.prototype.rotation = 0;
Banana.prototype.cx = 200;
Banana.prototype.cy = 200;
Banana.prototype.velX = 1;
Banana.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Banana.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Banana.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.velY +=  NOMINAL_GRAVITY;
    this.velX +=  turnHandler.windPower/50;

    this.cx += this.velX * du;
    this.cy += this.velY * du;
    this.rotation += (2*NOMINAL_GRAVITY) * du;

    //Bouncing off the walls
    //Bugged .. sometimes gets stuck !
    if((this.cx >= canvas.width) || (this.cx <= 0))
    {
        this.velX = - this.velX;
    }


    if (this.lifeSpan < 0) 
    {
        if(turnHandler.playerTurn !== 6)
        {
            turnHandler.nextTurn();
        }
        return entityManager.KILL_ME_NOW;
    }

    if(this._isDeadNow) 
    {
        if(turnHandler.playerTurn !== 6)
        {
            turnHandler.nextTurn();
        }
        return entityManager.KILL_ME_NOW;
    }

    // Þarf að bæta:
    if (this.cy > 620) 
    {
        if(turnHandler.playerTurn !== 6)
        {
            turnHandler.nextTurn();
        }
        return entityManager.KILL_ME_NOW;
    }


    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        if(turnHandler.playerTurn !== 6)
        {
            turnHandler.nextTurn();
        }
        var canTakeHit = hitEntity.takeBananaHit(this.velX, this.velY);
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }
    spatialManager.register(this);
};

Banana.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Banana.prototype.getRadius = function () {
    return 7;
};

Banana.prototype.render = function (ctx) {
    g_sprites.banana.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};