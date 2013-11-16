// ======
// Levels Stuff
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object


var level = {

    //Not really working atm

    resetLevel : function ()
    {
        NOMINAL_ROTATE_RATE = 0.03;
        NOMINAL_GRAVITY = 0.12;
        entityManager._bananas = [];
        entityManager._gorillas   = [];
        entityManager._bricks = [];
    },

    setLevel1 : function()
    {
        levelBackground = g_sprites.level1;

        NOMINAL_ROTATE_RATE = 0.03;
        NOMINAL_GRAVITY = 0.12;

        entityManager.generateGorilla({
            cx : 70,
            cy : 350,
            player : 1
        });

        entityManager.generateGorilla({
            cx : g_canvas.width - 70,
            cy : 350,

            sprite : g_sprites.gorilla2,
            player : 2
        });

        var currentx = 0;
        var currenty = 550;

        //Build bricks.. sad sad way

        for (var i = 0; i < 22; i++) {

            entityManager.generateBrick({cx: currentx,cy: currenty})

            currentx = currentx + 40;
        };

        entityManager.generateBrick({cx: g_canvas.width/2 + 120,cy: 520});
        entityManager.generateBrick({cx: g_canvas.width/2 - 120,cy: 520});
        entityManager.generateBrick({cx: g_canvas.width/2 + 120,cy: 490});
        entityManager.generateBrick({cx: g_canvas.width/2 - 120,cy: 490});
        entityManager.generateBrick({cx: g_canvas.width/2 - 90,cy: 490});
        entityManager.generateBrick({cx: g_canvas.width/2 + 90,cy: 490});
        entityManager.generateBrick({cx: g_canvas.width/2 + 60,cy: 460});
        entityManager.generateBrick({cx: g_canvas.width/2 - 60,cy: 460});
        entityManager.generateBrick({cx: g_canvas.width/2 + 60,cy: 430});
        entityManager.generateBrick({cx: g_canvas.width/2 - 60,cy: 430});
        entityManager.generateBrick({cx: g_canvas.width/2 + 30,cy: 400});
        entityManager.generateBrick({cx: g_canvas.width/2 - 30,cy: 400});
        entityManager.generateBrick({cx: g_canvas.width/2 + 30,cy: 370});
        entityManager.generateBrick({cx: g_canvas.width/2 - 30,cy: 370});
        entityManager.generateBrick({cx: g_canvas.width/2,cy: 370});

    },


    setLevel2 : function()
    {
        levelBackground = g_sprites.level2;

        NOMINAL_ROTATE_RATE = 0.03;
        NOMINAL_GRAVITY = 0.12;

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
        });

        var currentx = 0;
        var currenty = 460;

        //Build bricks.. sad sad way

        for (var i = 0; i < 7; i++) {

            entityManager.generateBrick({cx: currentx,cy: currenty})

            currentx = currentx + 40;
        };


        currentx = g_canvas.width;
        currenty = 460;

        //Build bricks.. sad sad way

        for (var i = 0; i < 7; i++) {

            entityManager.generateBrick({cx: currentx,cy: currenty})

            currentx = currentx - 40;
        };

        entityManager.generateBrick({cx: g_canvas.width/2 ,cy: 405});
        entityManager.generateBrick({cx: g_canvas.width/2 + 20 ,cy: 405});
        entityManager.generateBrick({cx: g_canvas.width/2 - 20 ,cy: 405});
        entityManager.generateBrick({cx: g_canvas.width/2 + 40 ,cy: 405});
        entityManager.generateBrick({cx: g_canvas.width/2 - 40 ,cy: 405});
        entityManager.generateBrick({cx: g_canvas.width/2 + 45 ,cy: 405});
        entityManager.generateBrick({cx: g_canvas.width/2 - 45 ,cy: 405});

    },

};

