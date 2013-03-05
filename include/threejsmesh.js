// A mesh wrapper for three js
function THREE_JS_MESH(three_js_mesh) {
    var mesh = three_js_mesh;
    this.move_to = function(pos) {
        mesh.position.set(pos.x, pos.y, 0);
    }

    this.set_angle = function(angle) {
        mesh.rotation.z = angle;
    }

    this.get_pos = function() {
        return {x:mesh.position.x, y:mesh.position.y};
    }

    this.get_angle = function() {
        return mesh.rotation.z;
    }

    this.set_anchor = function(offset) {
        var x = (offset.x!=undefined)? offset.x : 0;
	var y = (offset.y!=undefined)? offset.y : 0;
        return mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x,y,0));
    }

}
