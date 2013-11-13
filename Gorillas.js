// =========
// Gorilla
// =========
/*



*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL SHIPS
// ====================

function createInitialGorillas() {

    entityManager.generateGorilla({
        cx : 70,
        cy : 250,
        player : 1
    });

    entityManager.generateGorilla({
        cx : g_canvas.width - 70,
        cy : 250,

        sprite : g_sprites.gorilla2,
        player : 2
    })
    
}


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
    
    entityManager.update(du);

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


var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');


var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

//Not needed
//var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltGorillas();

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

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        gorilla   : "gorilla-icon.png",
        gorilla2  : "gorilla-icon2.png",
        banana : "Banana.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.gorilla  = new Sprite(g_images.gorilla);
    g_sprites.gorilla.scale = 0.0005;
    g_sprites.gorilla2 = new Sprite(g_images.gorilla2);

    g_sprites.banana = new Sprite(g_images.banana);
    g_sprites.banana.scale = 0.25;


    entityManager.init();
    createInitialGorillas();
    randomWind();

    main.init();
}

// Kick it off
requestPreloads();
