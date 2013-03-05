function EVENTS(rate) {
    if (window == this) {
        return new EVENTS();
    }
    var self = this;
    var rate = rate;
    var rate_factor = 1;
    var systems = new FILTERSET();
    var last_frame = 0;

    var step_forward = function() {
        systems.update();
        last_frame = new Date().getTime();
    };

    this.get_delta_time = function() {
        return (new Date().getTime() - last_frame) / 1000 * rate_factor;
    }

    this.set_rate_factor = function(new_rate) {
        rate_factor = new_rate;
    };

    this.register = function(fn_update) {
        systems.register(fn_update);
    }

    this.start = function() {
        last_frame = new Date().getTime();
        window.setInterval(step_forward, 1000 /rate);
    };
}

function EVENT(pause, retain, cb) {
    this.retain = retain;
    this.fire = function() {
        return cb(this.retain);
    }
}
