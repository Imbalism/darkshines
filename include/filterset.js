function FILTERSET() {
    var callbacks = [];
    this.update = function() {
        var should_clear = false;
        var ret = []
        callbacks.forEach(function(fn_pair){
            var fn_update = fn_pair[0];
            var fn_validate = fn_pair[1];
            if (!fn_validate()) {
                should_clear = true;
            } else {
                ret.push(fn_update());
            }
        });
        if (should_clear) {
            console.log("clearing!");
            callbacks.filter(function(fn_pair){
                var fn_validate = fn_pair[1];
                return fn_validate();
            });
        }
        return ret;
    }

    this.register = function(fn_update, fn_validate) {
        var fn_validate = fn_validate || function() {return true};
        callbacks.push([fn_update, fn_validate]);
    };
}
