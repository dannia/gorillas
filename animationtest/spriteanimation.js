// Running Sprites

"use strict";

/*jslint browser: true, devel: true, white: true */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// UTILS
// =====

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var g_spriteSheet;

var which = false;
    
function preload() {
    
    g_spriteSheet = new Image();
    g_spriteSheet.onload = preloadDone;
    g_spriteSheet.src = "GorillaSpriteSheet.png";
}

function Sprite(sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = g_spriteSheet;
}

Sprite.prototype.drawAt = function (x, y) {
    ctx.drawImage(this.image, 
                  this.sx, this.sy, this.width, this.height,
                  x, y, this.width, this.height);
}

var g_idle, g_walking, g_throwing, g_death;

function preloadDone() {
    
    //Idle
    var celWidth  = 134;
    var celHeight = 145;
    var numCols = 4;
    var numRows = 1;
    var numCels = 4;

    //Walking
    var wcelWidth  = 136;
    var wcelHeight = 145;
    var wnumCols = 4;
    var wnumRows = 1;
    var wnumCels = 4;
    
    //Throwing
    var tcelWidth  = 206;
    var tcelHeight = 145;
    var tnumCols = 6;
    var tnumRows = 1;
    var tnumCels = 6;
    
    //Death
    var dcelWidth  = 134;
    var dcelHeight = 145;
    var dnumCols = 4;
    var dnumRows = 1;
    var dnumCels = 3;

    g_idle = [];
    g_walking = [];
    g_throwing = [];
    g_death = [];
    var sprite,wsprite,tsprite,dsprite;

    //Idle
    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            sprite = new Sprite(col * celWidth, row * celHeight,
                                celWidth, celHeight) 
            g_idle.push(sprite);
        }
    }

    //Walking
        for (var row = 0; row < wnumRows; ++row) {
        for (var col = 0; col < wnumCols; ++col) {
            wsprite = new Sprite(col * wcelWidth, row+1 * wcelHeight,
                                wcelWidth, wcelHeight) 
            g_walking.push(wsprite);
        }
    }

    //Thorwing
        for (var row = 0; row < tnumRows; ++row) {
        for (var col = 0; col < tnumCols; ++col) {
            tsprite = new Sprite(col * celWidth, row+4.45 * celHeight,
                                tcelWidth, tcelHeight) 
            g_throwing.push(tsprite);
        }
    }

    //Death
        for (var row = 0; row < dnumRows; ++row) {
        for (var col = 0; col < dnumCols; ++col) {
            dsprite = new Sprite(col * dcelWidth, row+5.65 * dcelHeight,
                                dcelWidth, dcelHeight) 
            g_death.push(dsprite);
        }
    }
    
    // Remove any superfluous ones from the end
    g_idle.splice(numCels);
    g_walking.splice(wnumCels);
    g_throwing.splice(tnumCels);
    g_death.splice(dnumCels);
    
    console.dir(g_idle);
    
    main();
}

var g_cel = 0;
var g_celw = 0;
var g_celt = 0;
var g_celd = 0;


function main() {
    clearCanvas();
    
    ctx.fillText(""+g_cel, 10, 10);
    ctx.fillText(""+g_celw, 10, 20);
    ctx.fillText(""+g_celt, 10, 30);
    ctx.fillText(""+g_celd, 10, 40);
    
    var cel = g_idle[g_cel];
    var celw = g_walking[g_celw];
    var celt = g_throwing[g_celt];
    var celd = g_death[g_celd];

    // Primary instance
    cel.drawAt(5, 50);
    celw.drawAt(170, 50);
    celt.drawAt(310, 50);
    celd.drawAt(545, 50);

    // Horizontal run
    //cel.drawAt(50 + g_cel * 10, 50);
    
    // Diagonal run
    //cel.drawAt(50 + g_cel * 5, g_cel * 10);
    
    // Backwards
    ctx.scale(-1, 1);
    cel.drawAt(-5 - cel.width, 250);
    celw.drawAt(-170 - celw.width, 250);
    celt.drawAt(-310 - celt.width, 250);
    celd.drawAt(-545 - celd.width, 250);
    ctx.scale(-1, 1);
    
    ++g_cel;
    ++g_celw;
    ++g_celt;
    ++g_celd;

    if (g_cel === g_idle.length) g_cel = 0;
    if (g_celw === g_walking.length) g_celw = 0;
    if (g_celt === g_throwing.length) g_celt = 0;
    if (g_celd === g_death.length) g_celd = 0;
    
    // A poor man's cross-browser "requestAnimationFrame"
    setTimeout(main, 170);
}

preload();
