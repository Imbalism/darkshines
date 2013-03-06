var KEYBOARD = new (function() {
    var up = false;
    var down = false;
    var left = false;
    var right = false;
    var shift = false;
    var mouse_pos = {x:0, y:0};
    var mouse_left_down = false;
    var mouse_right_down = false;
    var div_name;
    var dimension;
    var fn_mounse_transform;
    this.init = function(_div_name, _fn_mounse_transform) {
        document.addEventListener("keydown", keydown);
        document.addEventListener("keyup", keyup);
        document.addEventListener("mousemove", this.mouse_move);
        document.addEventListener("mousedown", this.mouse_down);
        document.addEventListener("mouseup", this.mouse_up);
        div_name = _div_name;
        dimension = RUNTIME.get_window_size(div_name);
        fn_mounse_transform = _fn_mounse_transform;
    }

    this.is_shift = function() {return shift;};

    this.mouse_move = function(data) {
        mouse_pos = {x:data.clientX, y:data.clientY};
    };

    this.mouse_down = function(data) {
        mouse_left_down = true;
    };

    this.mouse_up = function(data) {
        mouse_left_down = false;
    };

    this.get_mouse_click = function() {
        return mouse_left_down;
    }

    this.get_mouse_pos = function() {
        return fn_mounse_transform(mouse_pos);
    };

    this.get_move_keys = function() {
        return { left: left,
                 right: right,
                 up: up,
                 down: down
        };
    }

    var keydown = function(data) {
        var keycode = data.keyCode;
        if (keycode == 37 || keycode == 65)
            left = true;
        if (keycode == 38 || keycode == 87)
            up = true;
        if (keycode == 39 || keycode == 68)
            right = true;
        if (keycode == 40 || keycode == 83)
            down = true;
        if (keycode == 16)
            shift = true;
    }

    var keyup = function(data) {
        var keycode = data.keyCode;
        if (keycode == 37 || keycode == 65)
            left = false;
        if (keycode == 38 || keycode == 87)
            up = false;
        if (keycode == 39 || keycode == 68)
            right = false;
        if (keycode == 40 || keycode == 83)
            down = false;
        if (keycode == 16)
            shift = false;
    }
});
