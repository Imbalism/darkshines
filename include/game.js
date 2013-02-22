function GAME(div_name){
    if (!div_name) return;

    if (window == this) {
        return new GAME(div_name);
    }

    var canvas_name = div_name;

    //init local modules
    var graphic;
    var player;
    var game_events;
    var render_events;
    var bg;
    var keyboard;

    this.init = function() {
        graphic = new GRAPHIC(canvas_name);
        render_events = new EVENTS(100/60);
        game_events = new EVENTS(100/60);
        keyboard = new KEYBOARD();
        keyboard.init();
        //load resources
        TEXTURE.load_images(CONFIG.PATH_TO.PICS, CONFIG.TEXTURES_FILES,
                            resources_loading_complete);

    };

    var resources_loading_complete = function() {
        if (TEXTURE.is_finished) {
            load_environment();
        }
    };

    var load_environment = function() {
        player = new PLAYER(graphic.register);
        player.create({x:100, y:100});
        bg = new BACKGROUDN(graphic.register);
        bg.create();

        game_events.add_event(player.get_update_event(keyboard.get_move_keys,
                                                      game_events.get_delta_time));
        game_events.start();

        render_events.add_event(graphic.get_render_event());
        render_events.add_event(graphic.get_camera_reset_event(player.get_pos));
        render_events.start();
    };
}
