var TEXTURE = new (function () {
    console.log("TEXTURE engine starts");

    var img_path;
    var fn_complete = null;
    var num_loaded;
    var num_to_load;
    var imgs = {}
    var loading_finished = false;
    var fn_complete_one = function(data) {
        num_loaded ++;
        // Complete
        if (num_loaded == num_to_load) {
            loading_finished = true;
            fn_complete();
        }
    };

    var load_img = function(name, path) {
        if (!name || !path) return null;
        imgs[name] = THREE.ImageUtils.loadTexture(path,null,fn_complete_one);
    };

    this.is_finished = function() {
        return loading_finished;
    }

    this.get_texture = function(name) {
        return imgs[name];
    }
    this.load_images = function(img_path, img_files, _fn_complete) {
        if (_fn_complete) fn_complete = _fn_complete;
        loading_finished = false;
        num_loaded = 0;
        num_to_load = Object.keys(img_files).length;
        for (var file in img_files) {
            load_img(file, img_path + img_files[file]);
        }
    };


});
