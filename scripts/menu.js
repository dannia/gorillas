// menu.js
//

"use strict";

var menu = {

    buttons : [],

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

render : function() {

    backgrounds[level.chosenLevel - 1].drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2,0);

    util.renderLogo();

    util.renderButton(ctx,250,200,50,'black','white','Play');
    util.renderButton(ctx,350,200,50,'black','white','Level ' + level.chosenLevel);
    util.renderButton(ctx,450,200,50,'black','white', 'Information');

},

handleClick : function(x,y){

    if((x > g_canvas.width/2 - 100) && (x < g_canvas.width/2 + 100))
    {

        if(y > 225 && y < 275)
        {
            gameState = 1;
            turnHandler.startGame();
        }

        if(y > 325 && y < 375)
        {
            level.chosenLevel++;
            if(level.chosenLevel > level.levelCount)
            {
                level.chosenLevel = 1;

            }
        }

        if(y > 425 && y < 475)
        {
            gameState = 4;
        }

    }
},

};