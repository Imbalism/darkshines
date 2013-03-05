function PLAYER() {
    var self = this;
    var object;
    var size_g = 2;
    var mass = 2;
    var speed = 500;
    var weapon;
    var body;
    this.create = function(start_pos, body_creat, physic_creat, color) {
        object = body_creat({name: "player", color:color,
                                   x:start_pos.x, y:start_pos.y,
                                   size:size_g});
        body = physic_creat(this, mass, start_pos, CONST.PHYSIC_GROUPS.PLAYER,
                              CONST.PHYSIC_GROUPS.ALL, 0.6);
    };

    this.graphic_update = function() {
        object.move_to(body.GetPosition());
    }
    this.gen_physic_update = function(fn_get_move_keys) {
        return function(){
            var keys = fn_get_move_keys();
            var force_x = 0;
            var force_y = 0;
            if (keys.left) force_x -= speed;
            if (keys.right) force_x += speed;
            if (keys.up) force_y += speed;
            if (keys.down) force_y -= speed;
            body.ApplyForce(new b2Vec2(force_x, force_y), body.GetPosition());
            // weapon.update(new_pos);

            // var angle;
            // if (dx == 0) {
            //     if (dy == 0)
            //         angle = object.get_angle();
            //     else if (dy > 0)
            //         angle = 1/2*PI;
            //     else if (dy < 0)
            //         angle = 3/2*PI;
            // }
            // else {
            //     angle = Math.atan(dy / dx);
            //     if (dx < 0)
            //         angle += PI;
            // }
            // object.set_angle(angle);
        };
    };

    this.get_pos = function() {
        return body.GetPosition();
    }
}
