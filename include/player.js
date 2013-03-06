function PLAYER() {
    var self = this;
    var object;
    var size_g = 2;
    var mass = 10;
    var speed = 2500;

    var weapon;
    var bullet;

    var body;
    this.create = function(start_pos, body_create, physic_create, color) {
        object = body_create({name: "player", color:color,
                              x:start_pos.x, y:start_pos.y,
                              size:size_g});
        body = physic_create(this, mass, false, start_pos, CONST.PHYSIC_GROUPS.PLAYER,
                             CONST.PHYSIC_GROUPS.ALL, 0.6);
    };

    var get_bullet = function() {return bullet};
    var get_velocity = function() {return body.GetLinearVelocity();};

    var get_impulse = function(impulse) {
        return body.ApplyImpulse(impulse, body.GetPosition())
    };

    this.take_weapon = function(weapon_type, bullet_type) {
        bullet = BULLET_SYSTEM.create_bullet(bullet_type);
        weapon = WEAPON_SYSTEM.create_weapon(weapon_type,
                                             {reload_time:10},
                                             { fn_get_impulse: get_impulse,
//                                                 fn_get_bullet : get_bullet,
                                               fn_get_impulse : get_impulse,
                                               fn_get_velocity : get_velocity,
                                               fn_get_pos : self.get_pos,
                                               fn_external_check:
                                               KEYBOARD.get_mouse_click,
                                               fn_get_target_pos :
                                               KEYBOARD.get_mouse_pos
                                             });
        WEAPON_SYSTEM.register(weapon.fire);
    }

    this.gen_graphic_update = function(fn_get_move_keys) {
        return function(){
            object.move_to(body.GetPosition());
            var angle = object.get_angle();
            var keys = fn_get_move_keys();
            var l = keys.left; var r = keys.right;
            var u = keys.up; var d = keys.down;

            if (r) angle = 0 * PI;
            if (u) angle = 1/2 * PI;
            if (l) angle = PI;
            if (d) angle = 3/2 * PI;

            if (u && r) angle = 1/4 * PI;
            if (u && l) angle = 3/4 * PI;
            if (d && l) angle = 5/4 * PI;
            if (d && r) angle = 7/4 * PI ;
            object.set_angle(angle);
        }
    };

    this.gen_physic_update = function(fn_get_move_keys) {
        return function(){
            var keys = fn_get_move_keys();
            var force_x = 0;
            var force_y = 0;
            if (keys.left) force_x -= speed;
            if (keys.right) force_x += speed;
            if (keys.up) force_y += speed;
            if (keys.down) force_y -= speed;
            if (KEYBOARD.is_shift()){
                force_x *= 2;
                force_y *= 2;
            }
            body.ApplyForce(new b2Vec2(force_x, force_y), body.GetPosition());
        };
    };

    this.get_pos = function() {
        return body.GetPosition();
    }
}
