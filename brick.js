// ======
// BRICK
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object

function Brick(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
}

Brick.prototype = new Entity();

    
// Initial, inheritable, default values
Brick.prototype.cx = 200;
Brick.prototype.cy = 200;
Brick.prototype.halfWidth = 30;
Brick.prototype.halfHeight = 10;

Brick.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if(this._isDeadNow) 
    {
        nextTurn();
        console.log("killed by ideadNOW");
        return entityManager.KILL_ME_NOW;
    }

    /*var hitEntity = this.findHitEntity();
    if (hitEntity) {
        nextTurn();
        console.log("killed by hit something");
        var canTakeHit = hitEntity.takeBrickHit(this.velX, this.velY);
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }*/
    
    spatialManager.register(this);
};

Brick.prototype.getRadius = function () {
    return 10;
};

Brick.prototype.takeBananaHit = function () {
    
};

Brick.prototype.collidesWithy = function (nextX, nextY, 
                                          r) {
    var brickEdge = this.cy;

    // Check Y coords
    if ((nextY - r < brickEdge) || (nextY + r > brickEdge)) {
        // Check X coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

Brick.prototype.collidesWithx = function (nextX, nextY, 
                                          r) {
    var brickEdge = this.cx;

    // Check X coords
    if ((nextX - r < brickEdge+25) || (nextX + r > brickEdge-25)) {
        // Check Y coords
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

Brick.prototype.render = function (ctx) {

     var oldStyle = ctx.fillStyle;

     ctx.fillStyle = 'green';

     ctx.fillRect(this.cx - this.halfWidth,
             this.cy - this.halfHeight,
             this.halfWidth * 2,
             this.halfHeight * 2);

    ctx.fillStyle = oldStyle;
};