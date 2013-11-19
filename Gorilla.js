// ==========
// Gorilla
// ==========

"use strict";

/*jslint browser: true, devel: true, white: true */

// A generic contructor which accepts an arbitrary descriptor object
function Gorilla(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.gorilla;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
};

Gorilla.prototype = new Entity();

Gorilla.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

//Cheaty way of making different controls for each player
//Since we just have one common file for both players ATM

Gorilla.prototype.KEY_CLOCKWISE = 'W'.charCodeAt(0);
Gorilla.prototype.KEY_COUNTER  = 'S'.charCodeAt(0);
Gorilla.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Gorilla.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Gorilla.prototype.KEY_CLOCKWISE2 = 'I'.charCodeAt(0);
Gorilla.prototype.KEY_COUNTER2  = 'K'.charCodeAt(0);
Gorilla.prototype.KEY_LEFT2   = 'J'.charCodeAt(0);
Gorilla.prototype.KEY_RIGHT2  = 'L'.charCodeAt(0);

Gorilla.prototype.KEY_JUMP = 16;    //Shift button

Gorilla.prototype.KEY_PWRDWN  = 'Q'.charCodeAt(0);
Gorilla.prototype.KEY_PWRUP  = 'E'.charCodeAt(0);

Gorilla.prototype.KEY_PWRDWN2  = 'U'.charCodeAt(0);
Gorilla.prototype.KEY_PWRUP2  = 'O'.charCodeAt(0);

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
Gorilla.prototype.opponent = 2;
Gorilla.prototype.isJumping = false;


// HACKED-IN AUDIO (no preloading)
Gorilla.prototype.warpSound = new Audio(
    "https://notendur.hi.is/~pk/308G/Asteroids_Exercise/sounds/GorillaWarp.ogg");

    
Gorilla.prototype.update = function (du) {

    spatialManager.unregister(this);

    if(this.player == turnHandler.playerTurn)
    {
        if(turnHandler.turnTimer <= 0)
        {
            turnHandler.endTurn(this.player);
            turnHandler.nextTurn();
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
    this.maybeFireBanana();

    if((this.health <= 0) || this.cy > g_canvas.height)
    {

        turnHandler.winner = this.opponent;     
        turnHandler.playerTurn = 6;
        return entityManager.KILL_ME_NOW;
    }
    else
    {
        spatialManager.register(this);
    }
};

Gorilla.prototype.computeSubStep = function (du) {
    
    var jumpPwr = 0;
    var accelX = 0;
    var accelY = 0;

    if (this.checkPermission() === 1)
    {
        if ((keys[this.KEY_LEFT]) && (this.cx > this.getRadius())) {
            this.velX = -1;
        }
        if ((keys[this.KEY_RIGHT]) && (this.cx < (g_canvas.width - this.getRadius()))) {
            this.velX = 1;
        }
    }
    else if (this.checkPermission() === 2)
    {
        if ((keys[this.KEY_LEFT2]) && (this.cx > this.getRadius())) {
            this.velX = -1;
        }
        if ((keys[this.KEY_RIGHT2]) && (this.cx < (g_canvas.width - this.getRadius()))) {
            this.velX = 1;
        }
    }

    if ((keys[this.KEY_JUMP]) && (turnHandler.playerTurn === this.player) && (!this.isJumping))
    {
        jumpPwr = 4;
        this.isJumping = true;
    }

    accelY += this.computeGravity() - jumpPwr;

    this.applyAccel(accelX, accelY, du);
    
    this.updateRotation(du);
};

Gorilla.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
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


    var collideY = entityManager.checkBricksY(nextX,nextY,this.cx,this.cy,this.getRadius());
    var collideX = entityManager.checkBricksX(nextX,nextY,this.cx,this.cy,this.getRadius());

    var minY = g_sprites.gorilla.height / 2;
    var maxY = g_canvas.height - minY;

    if(collideY === true)
    {
            if(this.velY > 0)
            {
                this.isJumping = false;
            }
            this.velY = 0;
            intervalVelY = this.velY;
    }

    if(collideX === true) 
    {
        this.velX = 0;
        intervalVelX = this.velX;
    }

    // s = s + v_ave * t
    this.cy += du * intervalVelY;
    this.cx += du * intervalVelX;

    // So the gorilla won't go on forever

    if(!this.isJumping)
    {
        this.velX = 0;
    }
};

Gorilla.prototype.maybeFireBanana = function () {

    if (keys[this.KEY_FIRE] && turnHandler.playerTurn === this.player) {

        var dX = +Math.sin(this.rotation);
        var dY = -Math.cos(this.rotation);
        var launchDist = this.getRadius() * 1.2;
        
        var relVel = this.launchVel;
        var relVelX = dX * relVel;
        var relVelY = dY * relVel;

        var xPower = 0;
        var yPower = 0;

        xPower = (2 * this.power*(Math.sin(this.rotation)));

        // Calculating if angle is up or downwards so that the power can be adjusted
        // and if the y-angle is close to horizontal

        if ((this.cy - (45 + 10 * this.power) * Math.cos(this.rotation)) < this.cy)
        {
            yPower = -(2 * this.power * (Math.cos(this.rotation)));
        }
        else
        {
            yPower = -(2 * this.power * (Math.cos(this.rotation)));
        }

        entityManager.fireBanana(
           this.cx + dX * launchDist, this.cy + dY * launchDist,
           xPower + relVelX, yPower + relVelY,
           this.rotation);

        turnHandler.endTurn(this.player);       
    }
    else if(keys[this.KEY_FIRE] && turnHandler.playerTurn === 6)
    {
        turnHandler.backToMenu();
    }
    
};

Gorilla.prototype.adjustPower = function () {

    //Adjust the power of the shot for this character

    if (this.checkPermission() === 1) {

        if((keys[this.KEY_PWRUP]) && (this.power <= 5))
        {
            this.power += 0.05;
        }
        else if((keys[this.KEY_PWRDWN]) && (this.power >= 0))
        {
            this.power -= 0.05;
        }          
    }
    else if (this.checkPermission() === 2) {

        if((keys[this.KEY_PWRUP2]) && (this.power <= 5))
        {
            this.power += 0.05;
        }
        else if((keys[this.KEY_PWRDWN2]) && (this.power >= 0))
        {
            this.power -= 0.05;
        }          
    }
    
};

Gorilla.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};

Gorilla.prototype.takeBananaHit = function (velX,velY) {

    var damage = util.square(velX) + util.square(velY);
    damage = Math.sqrt(damage);
    damage = Math.floor(damage);
    this.health -= damage;
};

Gorilla.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
};

Gorilla.prototype.updateRotation = function (du) 
{

    if(this.checkPermission() === 1)
    {
        if (keys[this.KEY_COUNTER]) {
            this.rotation -= NOMINAL_ROTATE_RATE * du;
        }
        if (keys[this.KEY_CLOCKWISE]) {
            this.rotation += NOMINAL_ROTATE_RATE * du;
        }
    }

    else if(this.checkPermission() === 2)
    {
        if (keys[this.KEY_COUNTER2]) {
            this.rotation -= NOMINAL_ROTATE_RATE * du;
        }
        if (keys[this.KEY_CLOCKWISE2]) {
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

    this.renderHealth(ctx);

    if(turnHandler.playerTurn === this.player)
    {
        this.renderAim(ctx);
    }   
};

Gorilla.prototype.renderHealth = function (ctx) {

    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;
    var prevTextAlign = ctx.textAlign;


    // Render the healthbar of the gorilla
    // Should possibly be a function on its own

    ctx.font="16px Arial Bold";

    ctx.textAlign="center"; 

    if(this.health >= 60)
    {
        ctx.fillStyle = 'green';
    }
    else if((20 < this.health) && (this.health < 60))
    {
        ctx.fillStyle = 'orange';
    }
    else if(this.health <= 20)
    {
        ctx.fillStyle = 'red';
    }

    ctx.fillText(this.health,this.cx ,this.cy-70);

    ctx.font = prevFont;
    ctx.fillStyle = prevColor;
    ctx.textAlign = prevTextAlign;
};

Gorilla.prototype.renderAim = function (ctx) {

    var prevLineWidth = ctx.lineWidth;
    var prevStrokeStyle = ctx.strokeStyle;

    // Render the power and aim bar of the gorilla
    // Should possibly be a function on its own

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.cx  + 40 * Math.sin(this.rotation),this.cy - 40 * Math.cos(this.rotation));
    ctx.lineTo(this.cx  + (45 + 10 * this.power) * Math.sin(this.rotation),
                this.cy - (45 + 10 * this.power) * Math.cos(this.rotation));
    ctx.stroke();

    ctx.strokeStyle = prevStrokeStyle;
    ctx.lineWidth = prevLineWidth;
};

Gorilla.prototype.checkPermission = function () {

    if ((turnHandler.playerTurn === 1) && (1 === this.player)) 
    {
        return 1;
    }
    else if((turnHandler.playerTurn === 2) && (2 === this.player))  
    {
        return 2;
    }
};