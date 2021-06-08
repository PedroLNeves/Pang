import { Player } from "./player.js";
import { Meteors } from "./meteors.js";
import { Harpon } from "./harpon.js";
// class MeteorGroup extends Phaser.Physics.Arcade.Group
// {
//     constructor(scene) {
//         classType: Meteors,
//         key: 'meteor'
//     }
    
// }
class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			classType: Laser,
			frameQuantity: 30, // Create 30 instances in the pool
			active: false,
			visible: false,
			key: 'laser'
		})
	}
    fireLaser(x, y) {
		const laser = this.getFirstDead(false);
		if (laser) {
			laser.fire(x, y);
		}
	}
 
}
 
class Laser extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {      
		super(scene, x, y, 'laser');

        
	}
    fire(x, y) {
		this.body.reset(x, y);
        this.body.setAllowGravity(false)
		this.setActive(true);
		this.setVisible(true);

		this.setVelocityY(-1200);
        this.setScale(15);      
    }
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 2500) {
            console.log("poop");
			this.setActive(false);
			this.setVisible(false);
            this.scene.laserLimit = 0;
		}
	}
}
export class Level001 extends Phaser.Scene {
    constructor() {
        super('Level001');
        this.laserLimit = 0;

        this.laserGroup;
    }

    init() {
        this.controls = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setScale(5);

        this.meteors = this.physics.add.group();

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 0
            );
            this.meteors = new Meteors(
                this, this.game.config.width * 0.5,
                this.game.config.height * 0.5,
                'meteors', 6
            );
        this.laserGroup = new LaserGroup(this);
        this.physics.add.overlap(this.laserGroup, this.meteors, this.laserHitMeteors, null, this);

    }
    laserHitMeteors (laserGroup, meteors)
    {
        
        meteors.destroy();
        laserGroup.destroy();
        this.createMeteors();
        this.laserLimit = 0;  
        console.log("OUCH AOUCH I BROKE MY KNEE");
        // //  Hide the sprite
        // healthGroup.killAndHide(health);
    
        // //  And disable the body
        // health.body.enable = false;
    
        // //  Add 10 health, it'll never go over maxHealth
        // currentHealth = Phaser.Math.MaxAdd(currentHealth, 10, maxHealth);
    }
    
    update(time) {
        this.player.update(time);

        if(this.controls.space.isDown) {
            this.shootLaser();
        }
    }
    createMeteors()
    {
        this.meteors = new Meteors(
            this, this.meteors.x,
            this.meteors.y,
            'meteors', 6
        );
    }
    shootLaser() {

        console.log(+ this.laserLimit);
        if (this.laserLimit >= 1)
        {
            return;
        }
         else {
        this.laserLimit++;
        console.log("pew pew");
        this.laserGroup.fireLaser(this.player.x, 8000);
        }
    }
}