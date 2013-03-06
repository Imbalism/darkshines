var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2AABB = Box2D.Collision.b2AABB,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

var PHYSIC_listener = new Box2D.Dynamics.b2ContactListener;

function PHYSIC() {
    var self=this;
    var world;

    var objects = new FILTERSET();

    this.register = function(fn_update, fn_validate) {
        objects.register(fn_update, fn_validate);
    };

    this.init = function(){
        world = new Box2D.Dynamics.b2World(
            new Box2D.Common.Math.b2Vec2(0, 0) ,true);
    };

    this.create_body = function(target, mass, is_bullet, start_pos, categoryBits,
                                maskBits,size,linear_damping) {
        linear_damping = linear_damping||5;
        var body_def = new Box2D.Dynamics.b2BodyDef;
	body_def.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
	body_def.position.x = start_pos.x;
	body_def.position.y = start_pos.y;
        body_def.bullet = is_bullet;
        var body = world.CreateBody(body_def);
	body.SetUserData (target);
	var fix_def = new Box2D.Dynamics.b2FixtureDef;
	fix_def.filter.categoryBits = categoryBits;
	fix_def.filter.maskBits = maskBits ;
	fix_def.shape = new Box2D.Collision.Shapes.b2CircleShape(size);
	body.CreateFixture(fix_def);
	body.SetLinearDamping(linear_damping);
	var mass_data = new b2MassData();
	mass_data.center = new b2Vec2(0,0);
	mass_data.mass = mass;
	mass_data.I = 0;
	body.SetMassData(mass_data);
        return body;
    }

    this.gen_update = function(fn_get_delta_time) {
        return function() {
            objects.update();
            world.Step(fn_get_delta_time(), 8, 3);
            world.ClearForces();
        };
    };
};
