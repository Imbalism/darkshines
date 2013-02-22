function EVENTS(_rate) {
    if (window == this) {
        return new EVENTS();
    }
    var self = this;
    var rate = _rate;
    var rate_factor = 1;
    var frame = 0;
    var events = [];
    var last_frame = 0;
    this.get_time_event = function() {
        return new EVENT(true, frame + rate * rate_factor,
                         function(retain) {
                             if (self.get_current_time() >= retain) {
                                 last_frame = self.get_current_time();
                                 return {
                                     event: self.get_time_event(),
                                     pause: false
                                 };
                             }
                             return {
                                 pause: true
                             };
                         });
    };

    var step_forward = function() {
        frame += 1;
        var head = events[0];
        ret = head.fire();
        if (ret == undefined) ret = {};
        pause = (ret.pause == undefined)?false:ret.pause;
        if (pause) {
            return;
        }
        var event = (ret.event == undefined)?null:ret.event;
        self.add_event(event);
        events.shift();
    };

    this.get_delta_time = function() {
        return (self.get_current_time() - last_frame) / 100;
    }

    this.set_rate_factor = function(new_rate) {
        rate_factor = new_rate;
    };

    this.get_current_time = function() {
        return frame;
    };

    this.add_event = function(event) {
        if (!event) return;
        events.push(event);
    };

    this.start = function() {
        this.add_event(this.get_time_event());
        window.setInterval(step_forward, 1000/100);
    };
}

function EVENT(pause, retain, cb) {
    this.retain = retain;
    this.fire = function() {
        return cb(this.retain);
    }
}
