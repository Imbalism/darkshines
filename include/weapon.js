var bullet = {
        lightsword: {
            name:"lightsword",
            color:0xffff00,
            size:1,
            size_x:2,
            anchor:{x:1, y:0},
        }
};

function BULLET_CREATE_DEFAULT(attributes) {
    var speed = 500;
    var mass = 0.1;
    var size = 1;
    var start_pos = attributes.pos;
    var initial_speed = attributes.speed;
    var impulse = attributes.impulse;
    var fn_get_impulse = attributes.fn_get_impulse;
    var object;
    var body;

    this.create = function(graphic_create, physic_create) {
        object = graphic_create({name: "laser", color:0xffffff,
                              x:start_pos.x, y:start_pos.y,
                              size:size});
        object.set_angle(RUNTIME.impluse_to_angle(impulse.Copy()));
        body = physic_create(this, mass, true, start_pos, CONST.PHYSIC_GROUPS.BULLET,
                             CONST.PHYSIC_GROUPS.ENEMYS, size/3, 0.0000001);
//        body.SetLinearVelocity(initial_speed);
        body.ApplyImpulse(impulse, body.GetPosition());
        impulse.Multiply(-1);
        fn_get_impulse(impulse);
    };

    this.update = function(){
    };

    this.physic_update = function(){
    };

    this.graphic_update = function(){
        object.move_to(body.GetPosition());
    };

    this.is_alive = function(){return object.IsAwake();};
}

function PISTOL_CREATE(attributes, callbacks){
    var reload_time = attributes.reload_time;
    var reload_start = 100;
    var fn_get_bullet = callbacks.fn_get_bullet || BULLET_CREATE_DEFAULT;
    var fn_get_pos = callbacks.fn_get_pos;
    var fn_get_target_pos = callbacks.fn_get_target_pos;
    var fn_get_velocity = callbacks.fn_get_velocity;
    var fn_get_impulse = callbacks.fn_get_impulse;
    var fn_external_check = callbacks.fn_external_check || function(){return true;};
    var force = 5;
    var check = function() {
        if (reload_start++ < reload_time || !fn_external_check())
            return false;
        return true;
    }

    this.fire = function() {
        if (!check()) return [];
        reload_start = 0;
        var pos = fn_get_pos();
        var target = fn_get_target_pos();
        var impulse = new b2Vec2(target.x - pos.x, target.y - pos.y);
        var speed = fn_get_velocity();
        impulse.Normalize();
        impulse.Multiply(force);
        return [new fn_get_bullet({pos:pos, impulse:impulse, speed:speed,
                                  fn_get_impulse:fn_get_impulse})];
    }
}

var BULLET_SYSTEM = new (function(){

    var objects = new FILTERSET();
    var fn_graphic_register;
    var fn_physic_register;
    var fn_graphic_create;
    var fn_graphic_create;

    this.create_bullet = function(type) {
        return BULLET_CREATE_DEFAULT;
    };

    this.init = function(graphic_create, physic_create,
                         graphic_register, physic_register) {
        fn_graphic_create = graphic_create;
        fn_physic_create  = physic_create;
        fn_graphic_register = graphic_register;
        fn_physic_register  = physic_register;
    };

    this.register = function(bullets) {
        bullets.forEach(function(bullet){
            bullet.create(fn_graphic_create, fn_physic_create);
            objects.register(bullet.update, bullets.is_alive);
            fn_graphic_register(bullet.graphic_update, bullets.is_alive);
            fn_physic_register(bullet.physic_update, bullets.is_alive);
        });
    };

    this.update = function() {
        objects.update();
    };
});

var WEAPON_SYSTEM = new (function() {
    console.log("Weapon engine starts");
    if (window == this) {
        return new WEAPON_SYSTEM;
    }
    var self = this;

    var objects = new FILTERSET();

    this.register = function(fn_update, fn_validate) {
        objects.register(fn_update, fn_validate);
    }

    this.update = function() {
        var new_bullets = objects.update().flatten();
        BULLET_SYSTEM.register(new_bullets);
    }


    var WEAPONS = {
        PISTOL: PISTOL_CREATE,
    };

    this.create_weapon = function(type, attributes, callbacks) {
        var constructor = WEAPONS[type];
        if (constructor == undefined) {
            return;
        }
        weapon = new constructor(attributes, callbacks);
        return weapon;
    };
});
