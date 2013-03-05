function BACKGROUDN(create_body) {
    var bg1;
    var bg2;

    this.create = function() {
        bg1 = create_body({name:"bg1",
                        transparent:true,
                        x:0,
                        y:0,
                        z:-1,
                        size_x:500,
                        size_y:381,
                       });

        bg2 = create_body({name:"bg2",
                        transparent:true,
                        x:0,
                        y:0,
                        z:-20,
                        size_x:600,
                        size_y:457,
                       });
    }
}
