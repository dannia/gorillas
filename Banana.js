// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


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

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    this.velY +=  NOMINAL_GRAVITY;
    this.velX += windPower/50;

    this.cx += this.velX * du;
    this.cy += this.velY * du;
    this.rotation += 0.25 * du;

    //Bouncing off the walls

    if((this.cx >= canvas.width) || (this.cx <= 0))
    {
        this.velX = - this.velX;
    }
    //this.rotation = util.wrapRange(this.rotation,
                                   //0, consts.FULL_CIRCLE);


    if (this.lifeSpan < 0) 
    {
        nextTurn();
        return entityManager.KILL_ME_NOW;
    }

    if(this._isDeadNow) 
    {
        nextTurn();
        return entityManager.KILL_ME_NOW;
    }

    // Þarf að bæta:
    if (this.cy > 620) 
    {
        nextTurn();
        return entityManager.KILL_ME_NOW;
    }


    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        nextTurn();
        var canTakeHit = hitEntity.takeBananaHit(this.velX, this.velY);
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Banana.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Banana.prototype.getRadius = function () {
    return 4;
};

Banana.prototype.takeBananaHit = function () {
    
    this.kill();
    
    // Make a noise when I am zapped by another banana
    this.zappedSound.play();
};

Banana.prototype.render = function (ctx) {
    g_sprites.banana.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};