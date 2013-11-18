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

    var prevFont = ctx.font;
    var prevColor = ctx.fillStyle;

    ctx.font="60px Arial Bold";
    ctx.fillStyle = "white";

    var stringToDisplay = "GORILLAS !";
    var stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,100);


    // Player 1 text

    ctx.font="30px Arial Bold";
    ctx.fillStyle = "blue";

    stringToDisplay = "Player 1 Controls : ";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,150);

    ctx.font="20px Arial Bold";
    ctx.fillStyle = "white";

    stringToDisplay = "A and D to move around - W and S to aim - Q and E to control Power";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,200);

    stringToDisplay = "Shift to jump - Spacebar to shoot";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,225);

    ctx.font="30px Arial Bold";
    ctx.fillStyle = "red";


    //Player 2 text

    stringToDisplay = "Player 2 Controls : ";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,340);

    ctx.font="20px Arial Bold";
    ctx.fillStyle = "white";

    stringToDisplay = "J and L to move around - I and K to aim - U and O to control Power";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,400);

    stringToDisplay = "Shift to jump - Spacebar to shoot";
    stringX = util.centerText(stringToDisplay);

    ctx.fillText(stringToDisplay,stringX,425);



    util.renderButton(ctx,500,200,50,'black','white','Back');

},

handleClick : function(x,y){

if((x > g_canvas.width/2 - 100) && (x < g_canvas.width/2 + 100))
    {
        if(y > 475 && y < 525)
        {
            gameState = 0;
        }
    }
},

};