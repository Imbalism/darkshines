console.log("Loading Config");

var CONST = new (function(){
    this.PHYSIC_GROUPS = {
	PLAYER:0x0001,
	ENEMYS:0x0002,
	BONUS:0x0004,
	PARTICLE:0x0008,
	BULLET:0x0010,
	WALL:0x0020,
	SPACE_OBJ:0x0040,
	ALL:0xFFFF
    };
});


var CONFIG = new (function() {
    this.PATH_TO = {
	LEVELS:"levels/",
	PICS:"img/",
	PAGES:"templates/",
	JS_SCRIPTS:"js/"
    };

    this.TEXTURES_FILES = {
	"player" : "player.png",
	"lightsword" : "lightsword.png",
	"bullet" : "bullet.png",
	"laser" : "laser.png",
	"bg1" : "bg_1.png",
	"bg2" : "bg_2.png",
    };

    this.REFRESH_RATE = 60;
});
