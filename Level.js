// ======
// Levels Stuff
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// A generic contructor which accepts an arbitrary descriptor object

var level = {

    levelCount : 4,
    chosenLevel : 1,
    maxWind : 5,

    resetLevel : function ()
    {
        NOMINAL_GRAVITY = 0.12;
        this.maxWind = 5;
    },

    setLevel : function(lvl)
    {
        if(lvl === 1)
        {
            this.setLevel1();         
        }
        else if(lvl === 2)
        {
            this.setLevel2();
        }
        else if(lvl === 3)
        {
           this.setLevel3();
        }
        else if(lvl === 4)
        {
            this.setLevel4();
        }
    },

    setLevel1 : function()
    {
        levelBackground = g_sprites.level1;

        NOMINAL_GRAVITY = 0.12;
        this.maxWind = 5;

        entityManager.generateGorilla({
            cx : 70,
            cy : 350,
            player : 1,
            opponent : 2
        });

        entityManager.generateGorilla({
            cx : g_canvas.width - 70,
            cy : 350,

            sprite : g_sprites.gorilla2,
            player : 2,
            opponent : 1
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

    setLevel2: function()
    {
        levelBackground = g_sprites.level2;

        NOMINAL_GRAVITY = 0.12;
        this.maxWind = 5;

        entityManager.generateGorilla({
            cx : 70,
            cy : 250,
            player : 1,
            opponent : 2
        });

        entityManager.generateGorilla({
            cx : g_canvas.width - 70,
            cy : 250,

            sprite : g_sprites.gorilla2,
            player : 2,
            opponent : 1
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

    setLevel3 : function()
    {
        levelBackground = g_sprites.level3;

        NOMINAL_GRAVITY = 0.06;
        this.maxWind = 0;

        entityManager.generateGorilla({
            cx : 70,
            cy : 120,
            player : 1,
            opponent : 2
        });

        entityManager.generateGorilla({
            cx : g_canvas.width - 70,
            cy : 120,

            sprite : g_sprites.gorilla2,
            player : 2,
            opponent : 1
        });

        var currentx = 280;
        var currenty = 460;

        //Build bricks.. sad sad way

        for (var i = 0; i < 7; i++) {

            entityManager.generateBrick({cx: currentx,cy: currenty})

            currentx = currentx + 40;
        };

        currentx = 320;
        currenty = 240;

        for (var i = 0; i < 5; i++) {

            entityManager.generateBrick({cx: currentx,cy: currenty})

            currentx = currentx + 40;
        };


        entityManager.generateBrick({cx: 20 ,cy: 200});
        entityManager.generateBrick({cx: 60 ,cy: 200});
        entityManager.generateBrick({cx: 100 ,cy: 200});


        entityManager.generateBrick({cx: 60 ,cy: 410});
        entityManager.generateBrick({cx: 100 ,cy: 410});

        entityManager.generateBrick({cx: g_canvas.width - 20 ,cy: 200});
        entityManager.generateBrick({cx: g_canvas.width - 60 ,cy: 200});
        entityManager.generateBrick({cx: g_canvas.width - 100 ,cy: 200});

        entityManager.generateBrick({cx: g_canvas.width - 60 ,cy: 410});
        entityManager.generateBrick({cx: g_canvas.width - 100 ,cy: 410});
    },

    setLevel4 : function()
    {
        levelBackground = g_sprites.level4;

        NOMINAL_GRAVITY = 0.12;
        this.maxWind = 3;

        entityManager.generateGorilla({
            cx : 70,
            cy : 300,
            player : 1,
            opponent : 2
        });

        entityManager.generateGorilla({
            cx : g_canvas.width - 70,
            cy : 120,

            sprite : g_sprites.gorilla2,
            player : 2,
            opponent : 1
        });

        var currentx = 20;
        var currenty = 540
        //Build bricks.. sad sad way

        for (var i = 0; i < 20; i++) {

            entityManager.generateBrick({cx: currentx,cy: currenty})

            currentx = currentx + 40;
        };

        entityManager.generateBrick({cx: g_canvas.width/2 - 20 ,cy: 500});
        entityManager.generateBrick({cx: g_canvas.width/2 + 20 ,cy: 500});
        entityManager.generateBrick({cx: g_canvas.width/2 - 20 ,cy: 460});
        entityManager.generateBrick({cx: g_canvas.width/2 + 20 ,cy: 460});
        entityManager.generateBrick({cx: g_canvas.width/2 - 20 ,cy: 420});
        entityManager.generateBrick({cx: g_canvas.width/2 + 20 ,cy: 420});
        entityManager.generateBrick({cx: g_canvas.width/2 - 20 ,cy: 380});
        entityManager.generateBrick({cx: g_canvas.width/2 + 20 ,cy: 380});
    }
};