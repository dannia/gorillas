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

    util.renderButton(ctx,200,200,50,'black','white','Play');
    util.renderButton(ctx,300,200,50,'black','white','Level ' + level.chosenLevel);
    util.renderButton(ctx,400,200,50,'black','white', 'Information');
    util.renderButton(ctx,500,200,50,'black','white','Exit');

},

handleClick : function(x,y){

    if((x > g_canvas.width/2 - 100) && (x < g_canvas.width/2 + 100))
    {
        if(y > 175 && y < 225)
        {
            gameState = 1;
            turnHandler.startGame();
        }

        if(y > 275 && y < 325)
        {
            level.chosenLevel++;
            if(level.chosenLevel > level.levelCount)
            {
                level.chosenLevel = 1;

            }
        }
        if(y > 375 && y < 425)
        {
            gameState = 4;
        }
        if(y > 475 && y < 525)
        {
            //main.gameOver();
        }
    }
},

};