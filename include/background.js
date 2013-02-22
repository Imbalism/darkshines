function BACKGROUDN(register) {
    var bg1;
    var bg2;

    this.create = function() {
        bg1 = register({name:"bg1",
                        transparent:true,
                        x:0,
                        y:0,
                        z:-80,
                        size_x:500,
                        size_y:381,
                       });

        bg2 = register({name:"bg2",
                        transparent:true,
                        x:0,
                        y:0,
                        z:-140,
                        size_x:600,
                        size_y:457,
                       });
    }
}
