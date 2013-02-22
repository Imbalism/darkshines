function KEYBOARD() {
    var up = false;
    var down = false;
    var left = false;
    var right = false;
    this.init = function() {
        document.addEventListener("keydown", keydown);
        document.addEventListener("keyup", keyup);
    }

    this.get_move_keys = function() {
        return { left: left,
                 right: right,
                 up: up,
                 down: down
        };
    }

    var keydown = function(data) {
        var keycode = data.keyCode;
        if (keycode == 37)
            left = true;
        if (keycode == 38)
            up = true;
        if (keycode == 39)
            right = true;
        if (keycode == 40)
            down = true;
    }

    var keyup = function(data) {
        var keycode = data.keyCode;
        if (keycode == 37)
            left = false;
        if (keycode == 38)
            up = false;
        if (keycode == 39)
            right = false;
        if (keycode == 40)
            down = false;
    }
}
