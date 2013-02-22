function GRAPHIC(div_name) {

    if (window == this) {
        return new GRAPHIC(div_name);
    }

    var self = this;
    var div_name = div_name;
    var scene = new THREE.Scene();
    console.log("GRAPHIC engine starts");

    var dimension = RUNTIME.get_window_size(div_name);
    var width = dimension.width;
    var height = dimension.height;

    RUNTIME.set_window_size(div_name, width, height);

    var ambient = new THREE.AmbientLight( 0x573311);
    scene.add(ambient);

    var directional = new THREE.DirectionalLight( 0xffeedd );
    directional.position.set( 0, 0, 100 ).normalize();
    scene.add(directional);

    var camera = new THREE.PerspectiveCamera(
        45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = get_camera_distance(width, height);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({
	clearColor: 0x000000,
	clearAlpha: 1,
	antialias: false});
    renderer.setSize(width, height);

    var container = document.getElementById(div_name);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function get_camera_distance(width, height) {
        var min = 40;
        var max = 160;
        var length = Math.min(width, height);
        var distance = length/16;
        distance = Math.min(distance, max);
        distance = Math.max(distance, min);
        return distance;
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.rerender = function() {
//        renderer.clear();
        renderer.render(scene, camera);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.set_camera = function(pos) {
        camera.position.x = pos.x;
        camera.position.y = pos.y;
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.get_render_event = function() {
        return new EVENT(false, null,
                         function(retain){
                             self.rerender();
                             return {
                                 event: self.get_render_event()
                             };
                         });
    };

    this.get_camera_reset_event = function(fn_get_pos) {
        return new EVENT(false, null,
                         function(retain){
                             self.set_camera(fn_get_pos());
                             return {
                                 event: self.get_camera_reset_event(fn_get_pos)
                             };
                         });
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.register = function(a) {
        var color = (a.color!=undefined)? a.color : 0xffffff;
        var transparent = (a.transparent!=undefined)? a.transparent : false;
        var texture = TEXTURE.get_texture(a.name);
	material = new THREE.MeshLambertMaterial({
            color:color,
            map:texture,
            size:1,
            opacity:1,
            transparent:transparent,
            depthTest:false,
            blending: THREE.AdditiveBlending
        });

        var size = (a.size!=undefined)? a.size : 1;
	var size_x = (a.size_x!=undefined)? a.size_x : size;
	var size_y = (a.size_y!=undefined)? a.size_y : size;
        var x = (a.x!=undefined)? a.x : 0;
	var y = (a.y!=undefined)? a.y : 0;
	var z = (a.z!=undefined)? a.z : 0;
	var angle = (a.angle!=undefined)? a.angle : 0;

        var geometry = new THREE.PlaneGeometry(size_x, size_y);
        var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
        mesh.rotation.z = angle;
        scene.add(mesh);
        return new THREE_JS_MESH(mesh);
    }
};
