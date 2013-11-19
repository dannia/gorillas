// =========
// Power-ups
// =========

"use strict";

/*jslint browser: true, devel: true, white: true */

// A generic contructor which accepts an arbitrary descriptor object

function Powerup(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
}

Powerup.prototype = new Entity();
    
// Initial, inheritable, default values
Powerup.prototype.rotation = 0;
Powerup.prototype.cx = 200;
Powerup.prototype.cy = 200;
Powerup.prototype.velX = 1;
Powerup.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Powerup.prototype.lifeSpan = 20000 / NOMINAL_UPDATE_INTERVAL;

Powerup.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.velY +=  NOMINAL_GRAVITY;

    this.cx = 0;
    this.cy += this.velY * du;
    this.rotation = 0;

    var hitEntity = this.findHitEntity();

    if ((this.lifeSpan < 0) || (this._isDeadNow) || (this.cy > 620) || (hitEntity)) 
    {
        if(hitEntity)
        {
            //Effects?
            var canTakeHit = hitEntity.takeBananaHit(this.velX, this.velY);
            if (canTakeHit) canTakeHit.call(hitEntity); 
        }
        
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Powerup.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Powerup.prototype.getRadius = function () {
    return 10;
};

Pow.prototype.render = function (ctx) {
    g_sprites.banana.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};