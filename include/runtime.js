var RUNTIME = new (function() {

    function rotate_to_target(pos,target_pos){
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var desire_target  = new b2Vec2(target_pos.x - pos.x,target_pos.y - pos.y);
	desire_target.Normalize();
        var desired_angle = Math.atan2( desire_target.y , desire_target.x);

        return Angle_convert(desired_angle);
    };

    this.impluse_to_angle = function(impulse){
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	impulse.Normalize();
        var desired_angle = Math.atan2( impulse.y , impulse.x);

        return angle_convert(desired_angle);
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function angle_convert(angle){
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var pi2 = Math.PI*2;

        //	Range 0 pi and 0 -pi
	if (Math.abs(angle)>=pi2){
	    var deler = angle/pi2;
	    var min_full = Math.ceil(deler);
	    var mm = min_full*pi2;
	    angle = angle - mm;
	}

        //	Range 0 pi
	if(angle<0) angle = pi2 + angle;


        return angle;
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.get_window_size = function(div_name) {
	var width = 100;
	var height = 100;
        if (div_name) {
	    width = document.getElementById(div_name).offsetWidth;
	    height = document.getElementById(div_name).offsetHeight;
        } else {
	    if(window.innerWidth != null){
		width = window.innerWidth;
		height = window.innerHeight;
	    } else if(document.body != null){
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	    }
        }

        return {width:width, height:height};
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.set_window_size = function(div_name, width, height) {
	if(div_name){
	    $("#"+div_name).height(height);
	    $("#"+div_name).width(width);
	}
    }
});

(function(){
    CClass = function(){};
    CClass.create = function(constructor) {
        var k = this;
        c = function() {
            this._super = k;
            var pubs = constructor.apply(this, arguments), self = this;
            for (key in pubs) (function(fn, sfn) {
                self[key] = typeof fn != "function" || typeof sfn != "function" ? fn :
                    function() { this._super = sfn; return fn.apply(this, arguments); };
            })(pubs[key], self[key]);
        };
        c.prototype = new this;
        c.prototype.constructor = c;
        c.extend = this.extend || this.create;
        return c;
    };
})();

Array.prototype.flatten = function() {
    var r = [];
    for (var i = 0; i < this.length; ++i) {
        var v = this[i];
        if (v instanceof Array) {
            Array.prototype.push.apply(this, v.flatten());
        } else {
            r.push(v);
        }
    }
    return r;
};
