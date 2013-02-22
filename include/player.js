function PLAYER(register) {
    var self = this;
    var register = register;
    var object;
    var size_g = 4;
    var dx = 0;
    var dy = 0;
    var fric = 0.98;
    var speed = 30;
    this.create = function(pos) {
        object = register({name: "player", color:0xffff00,
                           x:pos.x, y:pos.y,
                           size:size_g});
    };

    this.get_update_event = function(fn_get_move_keys, fn_get_delta_time) {
        return new EVENT(false, null,
                        function(retain){
                            keys = fn_get_move_keys();
                            dt = fn_get_delta_time();
                            pos = self.get_pos();
                            if (keys.left) dx -= speed * dt;
                            if (keys.right) dx += speed * dt;
                            if (keys.up) dy += speed * dt;
                            if (keys.down) dy -= speed * dt;
                            dx *= fric;
                            if (Math.abs(dx - 0) < EPS)
                                dx = 0;
                            dy *= fric;
                            if (Math.abs(dy - 0) < EPS)
                                dy = 0;
                            x = pos.x + dx;
                            y = pos.y + dy;
                            object.move_to({x:x, y:y});

                            var angle;
                            if (dx == 0) {
                                if (dy == 0)
                                    angle = object.get_angle();
                                else if (dy > 0)
                                    angle = 1/2*PI;
                                else if (dy < 0)
                                    angle = 3/2*PI;
                            }
                            else {
                                angle = Math.atan(dy / dx);
                                if (dx < 0)
                                    angle += PI;
                            }

                            console.log(dx);
                            object.set_angle(angle);
                            return {event:self.get_update_event(fn_get_move_keys,
                                                         fn_get_delta_time)};
                        });
    };

    this.get_pos = function() {
        return object.get_pos();
    }
}
