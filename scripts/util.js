// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


// RANGES
// ======

clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	value = lowBound;
    } else if (value > highBound) {
	value = highBound;
    }
    return value;
},

isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
},


// RANDOMNESS
// ==========

// MISC
// ====

square: function(x) {
    return x*x;
},


// DISTANCES
// =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},


// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

centerText: function (string){

    var stringLength = ctx.measureText(string);
    return ((ctx.canvas.width / 2) - (stringLength.width / 2));
},

renderText : function (ctx,text,xCoord,yCoord,font,style,textAlign){

        var prevFont = ctx.font;
        var prevStyle = ctx.fillStyle;
        var prevTextAlign = ctx.textAlign;

        ctx.font = font;
        ctx.fillStyle = style;
        ctx.textAlign = textAlign;

        ctx.fillText(text,xCoord,yCoord);

        ctx.font = prevFont;
        ctx.fillStyle = prevStyle;
        ctx.textAlign = prevTextAlign;
},

renderButton: function(ctx,y,w,h,color,borderColor,text){

        var oldStyle = ctx.fillStyle;
        var oldTextAlign = ctx.textAlign;

        ctx.textAlign = "center";

        var xCoord = g_canvas.width/2 - (w/2);
        var yCoord = y - (h/2);
        var difference = 3;


        util.fillBox(ctx,xCoord-difference,yCoord-difference,w+ 2 * difference,h + 2* difference,borderColor);

        util.fillBox(ctx,xCoord,yCoord,w,h,color);

        ctx.font = (h/2)+"px Arial Bold";
        ctx.fillStyle = borderColor;

        ctx.fillText(text,xCoord + (w/2),yCoord + h/1.5);

        ctx.fillStyle = oldStyle;
        ctx.textAlign = oldTextAlign;
},


randomPlayer : function()
{   
    return  Math.floor((Math.random()*2)+1);
},

renderLogo : function()
{
    g_sprites.logo.drawCentredAt(ctx,400,70,0);
},


};