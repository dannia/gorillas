// ======
// BRICK
// ======

"use strict";

/*jslint browser: true, devel: true, white: true */

// A generic contructor which accepts an arbitrary descriptor object

function Brick(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
}

Brick.prototype = new Entity();

    
// Initial, inheritable, default values
Brick.prototype.cx = 200;
Brick.prototype.cy = 200;
Brick.prototype.halfWidth = 20;
Brick.prototype.halfHeight = 20;

Brick.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this._isDeadNow)
    {
        return entityManager.KILL_ME_NOW;
    }
    
    spatialManager.register(this);
};

Brick.prototype.getRadius = function () {
    return 20;
};

Brick.prototype.takeBananaHit = function () {
    
};

Brick.prototype.powerUp = function (){
    return false;
};

Brick.prototype.collidesWithY = function (nextX, nextY, X, Y, r) {
    var brickEdge = this.cy;

    // Check Y coords
    if ((nextY - r < brickEdge + this.getRadius()) && (nextY + r > brickEdge - this.getRadius())) {
        // Check X coords
        if (X + r >= this.cx - this.getRadius() &&
            X - r <= this.cx + this.getRadius()) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

Brick.prototype.collidesWithX = function (nextX, nextY, X, Y, r) {
    var brickEdge = this.cx;

    // Check X coords
    if ((nextX - r < brickEdge + this.getRadius()) && (nextX + r > brickEdge - this.getRadius())) {
        // Check Y coords
        if (Y + r >= this.cy - this.getRadius() &&
            Y - r <= this.cy + this.getRadius()) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

Brick.prototype.render = function (ctx) {

    if(g_renderBricks)
    {
         var oldStyle = ctx.fillStyle;

         ctx.fillStyle = 'blue';

         ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);

        ctx.fillStyle = oldStyle;
    }
};