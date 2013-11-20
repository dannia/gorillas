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
Banana.prototype.doubleDmg = false;

// Convert times from milliseconds to "nominal" time units.
Banana.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Banana.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.velY +=  level.gravity;
    this.velX +=  turnHandler.windPower/100; //50

    this.cx += this.velX * du;
    this.cy += this.velY * du;
    this.rotation += (2*level.gravity) * du;

    //Bouncing off the walls
    //Bugged .. sometimes gets stuck !
    if((this.cx >= canvas.width) || (this.cx <= 0))
    {
        this.velX = - this.velX;
    }

    var hitEntity = this.findHitEntity();

    if ((this.lifeSpan < 0) || (this._isDeadNow) || (this.cy > 620) || (hitEntity)) 
    {
        if(hitEntity)
        {
            console.log(this.doubleDmg);
            console.log("HIT");
            if(this.doubleDmg === true)
            {
                console.log("DOUBLE DAMAGE");
                var canTakeHit = hitEntity.takeBananaHit(1.5 * this.velX, 1.5 * this.velY);
                if (canTakeHit) canTakeHit.call(hitEntity); 
            }
            else
            {
                console.log("regular damage");
                var canTakeHit = hitEntity.takeBananaHit(this.velX, this.velY);
                if (canTakeHit) canTakeHit.call(hitEntity); 
            }
        }

        if(!turnHandler.gameOver)
        {
            turnHandler.playerTurn = 0;
        }
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Banana.prototype.powerUp = function(power) {
    return false;
};

Banana.prototype.computeGravity = function () {
    return g_useGravity ? level.gravity : 0;
};

Banana.prototype.getRadius = function () {
    return 7;
};

Banana.prototype.render = function (ctx) {
    g_sprites.banana.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};