var RUNTIME = new (function() {

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
