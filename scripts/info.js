// info.js
//

"use strict";


var info = {


fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

render : function() {

    //Handles drawing all the information on
    //the info screen
    
    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;

    backgrounds[level.chosenLevel - 1].drawCentredAt(ctx,400,300,0);

    util.fillBox(ctx, g_canvas.width/2 - 352, g_canvas.height/2 - 182, 704, 364, 'white');
    util.fillBox(ctx, g_canvas.width/2 - 350, g_canvas.height/2 - 180, 700, 360, 'black');

    util.renderLogo();


    // Controls Text

    ctx.font="40px Arial Bold";
    ctx.fillStyle = "white";

    var stringToDisplay = "Controls";
    var stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,180);

    ctx.font="24px Arial Bold";

    var stringToDisplay = '"A" and "D" to move left and right';
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,230);

    stringToDisplay = '"W" and "S" to aim';
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,270);

    stringToDisplay = '"Q" to reduce power "E" to increase power';
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,310);

    stringToDisplay = '"Shift" to jump';
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,350);

    stringToDisplay = '"Spacebar" to shoot';
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,390);

    util.renderButton(ctx,550,200,50,'black','white','Back');

},
handleClick : function(x,y){

if((x > g_canvas.width/2 - 100) && (x < g_canvas.width/2 + 100))
    {
        if(y > 525 && y < 575)
        {
            gameState = 0;
        }
    }
},

};