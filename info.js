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


    // Player 1 text

    ctx.font="30px Arial Bold";
    ctx.fillStyle = "blue";

    var stringToDisplay = "Player 1 Controls";
    var stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,160);

    ctx.font="20px Arial Bold";
    ctx.fillStyle = "white";

    stringToDisplay = "A and D to move around - W and S to aim - Q and E to control Power";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,210);

    stringToDisplay = "Shift to jump - Spacebar to shoot";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,240);

    ctx.font="30px Arial Bold";
    ctx.fillStyle = "red";


    //Player 2 text

    stringToDisplay = "Player 2 Controls";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,310);

    ctx.font="20px Arial Bold";
    ctx.fillStyle = "white";

    stringToDisplay = "J and L to move around - I and K to aim - U and O to control Power";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,360);

    stringToDisplay = "Shift to jump - Spacebar to shoot";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,390);

    ctx.font="25px Arial Bold";
    ctx.fillStyle = "white";

    stringToDisplay = "Escape returns you to Main Menu";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,450);



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