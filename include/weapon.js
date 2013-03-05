var bullet = {
        lightsword: {
            name:"lightsword",
            color:0xffff00,
            size:1,
            size_x:2,
            anchor:{x:1, y:0},
        }
};

function PICTOL_CREAT(attributes, callbacks){
    var reload_time = attributes.reload_time;
    var reload_start = 0;
    this.check = function() {
        if (reload_start++ < reload_time)
            return false;
    }
    this.fire = function() {

    }
}

function WEAPON_SYSTEM() {
    if (window == this) {
        return new WEAPON_SYSTEM;
    }
    var self = this;
    var weapons = [];
    var bullets = [];

    console.log("Weapon engine starts");

    var bullet = {
        lightsword: {
            name:"lightsword",
            color:0xffff00,
            size:1,
            size_x:2,
            anchor:{x:1, y:0},
        }
    }

    var weapons = {
        PISTOL: PISTOL_CREATE,
    }

    this.get_bullet_creator = function(a) {

    }

    this.register = function(type, attributes, callbacks) {
        var constructor = weapons[type];
        if (constructor == undefined) {
            return;
        }
        weapon = new constructor(fn_shoot_point, attributes, callbacks);
        weapons.push(weapon);
    };

    this.get_fire_event = function() {
        return new(false, null,
                   function(retain) {
                       weapons.forEach(function(weapon){
                           if (weapon.check())
                               new_bullets = weapon.fire();
                           bullets.concat(new_bullets);
                       });
                       return {
                           event: self.get_fire_event()
                       }
                   });
    };
};
