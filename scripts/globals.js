// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

// Too many globals ...

var NOMINAL_ROTATE_RATE = 0.03;
var levelBackground;
var backgrounds = [];


//Gamestate 0 = menu
//Gamestate 4 = info
//Gamestate 1 = game
//Gamestate 3 = game over waiting for entity clear
var gameState = 0;