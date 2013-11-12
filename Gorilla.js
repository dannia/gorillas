// ==========
// Gorilla STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Gorilla(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.gorilla;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this._isWarping = false;
};

Gorilla.prototype = new Entity();

Gorilla.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Gorilla.prototype.KEY_THRUST = 'W'.charCodeAt(0);
Gorilla.prototype.KEY_RETRO  = 'S'.charCodeAt(0);
Gorilla.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Gorilla.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Gorilla.prototype.KEY_PWRDWN  = '4'.charCodeAt(0);
Gorilla.prototype.KEY_PWRUP  = '5'.charCodeAt(0);

Gorilla.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Gorilla.prototype.rotation = 0;
Gorilla.prototype.cx = 20;
Gorilla.prototype.cy = 500;
Gorilla.prototype.velX = 0;
Gorilla.prototype.velY = 0;
Gorilla.prototype.launchVel = 2;
Gorilla.prototype.numSubSteps = 1;
Gorilla.prototype.health = 100;
Gorilla.prototype.player = 1;
Gorilla.prototype.power = 1;

// HACKED-IN AUDIO (no preloading)
Gorilla.prototype.warpSound = new Audio(
    "https://notendur.hi.is/~pk/308G/Asteroids_Exercise/sounds/GorillaWarp.ogg");

Gorilla.prototype.warp = function () {
    this._isWarping = true;
    this._scaleDirn = -1;
    this.warpSound.play();
    
    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

Gorilla.prototype._updateWarp = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;
    
    if (this._scale < 0.2) {
        this.halt();
        this._scaleDirn = 1;
        
    } else if (this._scale > 1.2) { // default = 1.0
        // So that the Gorilla gets a little bigger than normal
        // then 'snaps' back to it's normal 1.0 size.
    
        this._scale = 1;
        
        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);
        
    }
};
    
Gorilla.prototype.update = function (du) {
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if(this.player == turnHandler())
    {
        if(turnTimer <= 0)
        {
            endTurn(this.player);
            nextTurn();
        }
    }

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    // Handle firing
    this.adjustPower();
    this.maybeFireBullet();

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register
    if(this.health <= 0)
    {
        return entityManager.KILL_ME_NOW;
    }
    else
    {
        spatialManager.register(this);
    }

};

Gorilla.prototype.computeSubStep = function (du) {
    
    var thrust = this.computeThrustMag();

    // Apply thrust directionally, based on our rotation
    var accelX = +Math.sin(this.rotation) * thrust;
    var accelY = -Math.cos(this.rotation) * thrust;
    
    accelY += this.computeGravity();

    this.applyAccel(accelX, accelY, du);
    
    //this.wrapPosition();
    
    if (thrust === 0 || g_allowMixedActions) {
        this.updateRotation(du);
    }
};

var NOMINAL_GRAVITY = 0.12;

Gorilla.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

var NOMINAL_THRUST = +0.2;
var NOMINAL_RETRO  = -0.1;

Gorilla.prototype.computeThrustMag = function () {
    
    var thrust = 0;
    
    if (turnHandler() === this.player)
    {
        if ((keys[this.KEY_LEFT]) && (this.cx > this.getRadius())) {
            this.cx--;
        }
        if ((keys[this.KEY_RIGHT]) && (this.cx < (g_canvas.width - this.getRadius()))) {
            this.cx++;
        }
    }

    return thrust;
};

Gorilla.prototype.applyAccel = function (accelX, accelY, du) {
    
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    
    // s = s + v_ave * t
    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;
    
    // bounce
    if (g_useGravity) {

	var minY = g_sprites.gorilla.height / 2;
	var maxY = g_canvas.height - minY;

	// Ignore the bounce if the Gorilla is already in
	// the "border zone" (to avoid trapping them there)
	if (this.cy > maxY || this.cy < minY) {
	    // do nothing
	} else if (nextY > maxY || nextY < minY) {
            this.velY = 0;//oldVelY * -0.9;
            intervalVelY = this.velY;
        }
    }
    
    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};

Gorilla.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE] && turnHandler() === this.player) {

    
            var dX = +Math.sin(this.rotation);
            var dY = -Math.cos(this.rotation);
            var launchDist = this.getRadius() * 1.2;
            
            var relVel = this.launchVel;
            var relVelX = dX * relVel;
            var relVelY = dY * relVel;
            var xPower = 0;

            if(Math.sin(this.rotation) > 0)
            {
                xPower = this.power;
            }
            else
            {
                xPower = -this.power;
            }

            entityManager.fireBullet(
               this.cx + dX * launchDist, this.cy + dY * launchDist,
               xPower + relVelX, -this.power + relVelY,
               this.rotation);

            console.log(this.power);
            console.log(Math.sin(this.rotation))
            endTurn(this.player);

           
    }
    
};

Gorilla.prototype.adjustPower = function () {

    if (turnHandler() === this.player) {

        if((keys[this.KEY_PWRUP]) && (this.power <= 5))
        {
            this.power += 0.05;
        }
        else if((keys[this.KEY_PWRDWN]) && (this.power >= 0))
        {
            this.power -= 0.05;
        }          
    }
    
};

Gorilla.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Gorilla.prototype.takeBulletHit = function () {
    this.health = this.health-10;
};

Gorilla.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Gorilla.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

var NOMINAL_ROTATE_RATE = 0.1;

Gorilla.prototype.updateRotation = function (du) {
    if(turnHandler() === this.player)
    {
        if (keys[this.KEY_RETRO]) {
            this.rotation -= NOMINAL_ROTATE_RATE * du;
        }
        if (keys[this.KEY_THRUST]) {
            this.rotation += NOMINAL_ROTATE_RATE * du;
        }
    }
};

Gorilla.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, 0 //this.rotation
    );
    this.sprite.scale = origScale;

    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;

    if(turnHandler() === this.player)
    {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.cx  + 40 * Math.sin(this.rotation),this.cy - 40 * Math.cos(this.rotation));
        ctx.lineTo(this.cx  + (45 + 10 * this.power) * Math.sin(this.rotation),this.cy - (45 + 10 * this.power) * Math.cos(this.rotation));
        ctx.stroke();
    }

    ctx.font="14px Arial";
    ctx.fillStyle = 'green';
    ctx.fillText(this.health,this.cx - 15,this.cy-50);
    ctx.font = prevFont;
    ctx.fillStyle = prevColor;
};
