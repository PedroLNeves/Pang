import { Player } from "./player.js";
import { Meteors } from "./meteors.js";
import { Harpon } from "./harpon.js";

class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		// Call the super constructor, passing in a world and a scene
		super(scene.physics.world, scene);
 
		// Initialize the group
		this.createMultiple({
			classType: Laser, // This is the class we create just below
			frameQuantity: 30, // Create 30 instances in the pool
			active: false,
			visible: false,
			key: 'laser'
		})
	}
    fireLaser(x, y) {
		// Get the first available sprite in the group
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
        //this.setCollideWorldBounds(true);
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

        this.input.on('pointerdown', (pointer) => {
            console.log(`${pointer.x}, ${pointer.y}`);
            this.shootLaser();
        })
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setScale(5);

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player', 0
            );
        this.meteors = new Meteors(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'meteors', 6
        );

        this.laserGroup = new LaserGroup(this);
        //this.addEvents();

    }

    // addEvents() {
    //     // ...
    //     this.input.on('pointerdown', pointer => {
    //         this.shootLaser();
    //     });
    // }

    update(time) {
        this.player.update(time);

        if(this.controls.space.isDown) {
            this.shootLaser();
            //this.FireHarpon();
        }
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

//    fireHarpon(){
//     console.log("pew pew");
//     this.laserGroup.fireLaser(this.player.x, this.player.y -20);
// // //         this.countHarpon++;

// // //         if(this.countHarpon > 2) {
// // //             return; }
// // //           else {

   
// // //             var harpon = this.add.image(this.player.x, 1000, 'harpon').setOrigin(0).setScale(10);
// // //             this.physics.add.overlap(harpon,this.groupBall,this.hitHarpoon,null,this);
// // //           }  
        
//    }


}