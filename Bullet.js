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

function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    this.fireSound.play();
    
/*
    // Diagnostics to check inheritance stuff
    this._bulletProperty = true;
    console.dir(this);
*/

}

Bullet.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio(
    "https://notendur.hi.is/~pk/308G/Asteroids_Exercise/sounds/bulletFire.ogg");
Bullet.prototype.zappedSound = new Audio(
    "https://notendur.hi.is/~pk/308G/Asteroids_Exercise/sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if (this.lifeSpan < 0) 
    {
        nextTurn();
        console.log("killed by lifespan");
        return entityManager.KILL_ME_NOW;
    }

    if(this._isDeadNow) 
    {
        nextTurn();
        console.log("killed by ideadNOW");
        return entityManager.KILL_ME_NOW;
    }

    this.velY +=  NOMINAL_GRAVITY;
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 0.25 * du;
    //this.rotation = util.wrapRange(this.rotation,
                                   //0, consts.FULL_CIRCLE);

    // Þarf að bæta:
    if (this.cy > 620) 
    {
        nextTurn();
        console.log("killed by outside the borders");
        return entityManager.KILL_ME_NOW;
    }


    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        nextTurn();
        console.log("killed by hit something");
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Bullet.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Bullet.prototype.getRadius = function () {
    return 4;
};

Bullet.prototype.takeBulletHit = function () {
    
    this.kill();
    
    // Make a noise when I am zapped by another bullet
    this.zappedSound.play();
};

Bullet.prototype.render = function (ctx) {
    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};