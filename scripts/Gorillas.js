// =========
// Gorillas
// =========

"use strict";

/*jslint browser: true, devel: true, white: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();

    if(gameState === 1)
    {
        turnHandler.timer();
        entityManager.update(du);
    }
    // Clears the entities and sets the gameState to 0 , wich is menu State
    if(gameState === 3)
    {
        entityManager.clearEntities(du);
    }
    
    // Prevent perpetual firing!
    eatKey(Gorilla.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = true;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_RESET = keyCode('R');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_MENU = 27;

//Not needed
//var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_RESET)) entityManager.resetGorillas();

    if (eatKey(KEY_1)) entityManager.generateGorilla({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.gorilla});

    if (eatKey(KEY_2)) entityManager.generateGorilla({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.gorilla2
        });

    if (eatKey(KEY_MENU)) turnHandler.backToMenu();

    //if (eatKey(KEY_K)) entityManager.killNearestGorilla(
     //   g_mouseX, g_mouseY);

}

// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if(gameState === 1)
    {
        level.render(ctx);
        entityManager.render(ctx);

        if(!turnHandler.gameOver)
        {
            turnHandler.displayTime();      //Temporary
            turnHandler.displayWind();      //Temporary
        }
        else
        {
            turnHandler.displayWinner();
        }

        if(turnHandler.playerTurn === 0 && !turnHandler.gameOver)
        {
            turnHandler.displayPressSpace();
        }
        
    }
    else if(gameState === 4)
    {
        info.render();
    }
    else if(gameState === 0)
    {
        menu.render();
    }

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        gorilla   : "sprites/gorilla-icon.png",
        gorilla2  : "sprites/gorilla-icon2.png",
        banana :    "sprites/Banana.png",
        tombstone : "sprites/tombstone.png",
        powerup :   "sprites/powerup.png",
        level1 :    "levels/level1.png",
        level2 :    "levels/level2.png",
        level3 :    "levels/level3.png",
        level4 :    "levels/level4.png",
        level1back :    "levels/level01.png",
        level2back :    "levels/level02.png",
        level3back :    "levels/level03.png",
        level4back :    "levels/level04.png",
        logo : "logo/logo.png"
        //http://fallenpixel.net/wp-content/uploads/2012/03/hunting-by-jian-guo.jpg
        //http://www.newgrounds.com/art/view/katatafisch/wda-prehistoric-jungle
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    g_sprites.level1 = new Sprite(g_images.level1);
    g_sprites.level2 = new Sprite(g_images.level2);
    g_sprites.level3 = new Sprite(g_images.level3);
    g_sprites.level4 = new Sprite(g_images.level4);

    g_sprites.level1back = new Sprite(g_images.level1back);
    g_sprites.level2back = new Sprite(g_images.level2back);
    g_sprites.level3back = new Sprite(g_images.level3back);
    g_sprites.level4back = new Sprite(g_images.level4back);

    g_sprites.logo = new Sprite(g_images.logo);

    g_sprites.gorilla  = new Sprite(g_images.gorilla);
    g_sprites.gorilla.scale = 0.0005;
    g_sprites.gorilla2 = new Sprite(g_images.gorilla2);
    g_sprites.tombstone = new Sprite(g_images.tombstone);
    g_sprites.powerup = new Sprite(g_images.powerup);

    g_sprites.banana = new Sprite(g_images.banana);
    g_sprites.banana.scale = 0.25;

    backgrounds = [g_sprites.level1back ,g_sprites.level2back, g_sprites.level3back, g_sprites.level4back];

    main.init();
}

// Kick it off
requestPreloads();