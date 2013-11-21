// Running Sprites

"use strict";

/*jslint browser: true, devel: true, white: true */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

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

var g_sprites;

function preloadDone() {
    
    var celWidth  = 150;
    var celHeight = 150;
    var numCols = 4;
    var numRows = 1;
    var numCels = 30;
    
    g_sprites = [];
    var sprite;
    
    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            sprite = new Sprite(col * celWidth, row * celHeight,
                                celWidth, celHeight) 
            g_sprites.push(sprite);
        }
    }
    
    // Remove any superfluous ones from the end
    g_sprites.splice(numCels);
    
    console.dir(g_sprites);
    
    main();
}

var g_cel = 0;

function main() {
    clearCanvas();
    
    ctx.fillText(""+g_cel, 10, 10);
    
    var cel = g_sprites[g_cel]

    // Primary instance
    cel.drawAt(50, 50);
    
    // Horizontal run
    //cel.drawAt(50 + g_cel * 10, 50);
    
    // Diagonal run
    //cel.drawAt(50 + g_cel * 5, g_cel * 10);
    
    // Backwards
    ctx.scale(-1, 1);
    //cel.drawAt(-50 - cel.width, 250);
    ctx.scale(-1, 1);
    
    ++g_cel;
    if (g_cel === g_sprites.length) g_cel = 0;
    
    // A poor man's cross-browser "requestAnimationFrame"
    setTimeout(main, 50);
}

preload();
