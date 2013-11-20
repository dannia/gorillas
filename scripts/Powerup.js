// =========
// Power-ups
// =========

"use strict";

/*jslint browser: true, devel: true, white: true */

// A generic contructor which accepts an arbitrary descriptor object

function Powerup(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = this.sprite || g_sprites.powerup;
}

Powerup.prototype = new Entity();
    
// Initial, inheritable, default values

// PowerUp powers
// 1 = +20 Health
// 2 = -10 Health
// 3 = Hit opponent for 30 damage
// 4 = Double damage

Powerup.prototype.cx = 200;
Powerup.prototype.cy = 200;
Powerup.prototype.velX = 0;
Powerup.prototype.velY = 0;
Powerup.prototype.power = 1;



Powerup.prototype.update = function (du) {

    spatialManager.unregister(this);

    if(this._isDeadNow)
    {
        return entityManager.KILL_ME_NOW;
        turnHandler.powerUpExists = false;
    }

    var hitEntity = this.findHitEntity();

    if(hitEntity)
    {
        var canPowerUp = hitEntity.powerUp(this.power);
        if(canPowerUp)
        {
            turnHandler.powerUpExists = false;
            return entityManager.KILL_ME_NOW;
        }
        else
        {
            spatialManager.register(this);
            this.velY = 0;
        }
    }
    else
    {
        this.velY +=  level.gravity;

        this.cy += this.velY * du;
        spatialManager.register(this);
    }
};

Powerup.prototype.computeGravity = function () {
    return g_useGravity ? level.gravity : 0;
};

Powerup.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};

Powerup.prototype.render = function (ctx) {
    g_sprites.powerup.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

Powerup.prototype.takeBananaHit = function (velX,velY) {
    turnHandler.powerUpExists = false;
    this.kill();
};