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
            this.scene.sound.play('pew');
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

		this.setVelocityY(-2250);
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
        this.meteorScore = 0;

        this.laserGroup;
    }

    init() {
        this.controls = this.input.keyboard.createCursorKeys();

        this.lives = 3;
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setScale(5);

        this.meteors = this.physics.add.group();

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.9,
            'player', 0
            ).setScale(3.5);
            this.meteors = new Meteors(
                this, this.game.config.width * 0.5,
                this.game.config.height * 0.5,
                'meteors', 6
            );
            this.player.setSize(100,180);
            this.player.body.offset.y = 100;
        this.laserGroup = new LaserGroup(this);
        this.physics.add.collider(this.laserGroup, this.meteors, this.laserHitMeteors, null, this);
        this.physics.add.collider(this.player, this.meteors, this.PlayerHitMeteors, null, this);

        this.input.manager.enabled = true;
        this.input.once('pointerdown', function () {
            this.scene.start('Level002');
        }, this);

        this.sound.add('pew');
        this.sound.add('oof');

        this.add.image(300, 400, `Life`).setScale(2);
        this.livesText = this.add.text(
            600, 300,
            `${this.lives}`,
            {
                fontFamily: 'Arial',
                fontSize: 200,
                color: '#ffff',
            }
        )
    }

    PlayerHitMeteors()
    {
        if(this.lives == 1){
            this.scene.restart();
        }
        this.sound.play('oof')
        this.lives--;

    }
    /////
    //BEYOND THIS POINT IT IS TOO LATE YOU HAVE REACHED PEAK DESPERATION AND GHETTO TRICKS
    /////
    laserHitMeteors (laserGroup, meteors)
    {
        this.laserLimit = 0; 
        this.meteors1 = new Meteors(
            this, this.meteors.x,
            this.meteors.y,
            'meteors', 6
        ).setScale(2.5);
        this.physics.add.collider(this.laserGroup, this.meteors1, this.laserHitMeteors1, null, this);
        this.physics.add.collider(this.player, this.meteors1, this.PlayerHitMeteors, null, this);
        this.meteors11 = new Meteors(
            this, this.meteors.x,
            this.meteors.y,
            'meteors', 6
        ).setScale(2.5);
        this.physics.add.collider(this.laserGroup, this.meteors11, this.laserHitMeteors11, null, this);
        this.physics.add.collider(this.player, this.meteors11, this.PlayerHitMeteors, null, this);
        meteors.destroy();
        laserGroup.destroy();
    }
///
    laserHitMeteors1(laserGroup, meteors1){
        this.laserLimit = 0; 
        this.meteors2 = new Meteors(
            this, this.meteors1.x,
            this.meteors1.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.collider(this.laserGroup, this.meteors2, this.laserHitMeteors2, null, this);
        this.physics.add.collider(this.player, this.meteors2, this.PlayerHitMeteors, null, this);
        this.meteors222 = new Meteors(
            this, this.meteors1.x,
            this.meteors1.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.collider(this.laserGroup, this.meteors222, this.laserHitMeteors222, null, this);
        this.physics.add.collider(this.player, this.meteors222, this.PlayerHitMeteors, null, this);
        meteors1.destroy();
        laserGroup.destroy();
    }
    laserHitMeteors222(laserGroup, meteors222){
        this.laserLimit = 0; 
        this.meteors13333 = new Meteors(
            this, this.meteors222.x,
            this.meteors222.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors13333, this.laserHitMeteors13333, null, this);
        this.physics.add.collider(this.player, this.meteors13333, this.PlayerHitMeteors, null, this);
        this.meteors23333 = new Meteors(
            this, this.meteors222.x,
            this.meteors222.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors23333, this.laserHitMeteors23333, null, this);
        this.physics.add.collider(this.player, this.meteors23333, this.PlayerHitMeteors, null, this);
        meteors222.destroy();
        laserGroup.destroy();
    }
///   
    laserHitMeteors11(laserGroup, meteors11){
        this.laserLimit = 0; 
        this.meteors22 = new Meteors(
            this, this.meteors11.x,
            this.meteors11.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.collider(this.laserGroup, this.meteors22, this.laserHitMeteors22, null, this);
        this.physics.add.collider(this.player, this.meteors22, this.PlayerHitMeteors, null, this);
        this.meteors122 = new Meteors(
            this, this.meteors11.x,
            this.meteors11.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.collider(this.laserGroup, this.meteors122, this.laserHitMeteors122, null, this);
        this.physics.add.collider(this.player, this.meteors122, this.PlayerHitMeteors, null, this);
        meteors11.destroy();
        laserGroup.destroy();
    }

    laserHitMeteors122(laserGroup, meteors122){
        this.laserLimit = 0; 
        this.meteors4433 = new Meteors(
            this, this.meteors122.x,
            this.meteors122.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors4433, this.laserHitMeteors4433, null, this);
        this.physics.add.collider(this.player, this.meteors4433, this.PlayerHitMeteors, null, this);
        this.meteors533 = new Meteors(
            this, this.meteors122.x,
            this.meteors122.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors533, this.laserHitMeteors533, null, this);
        this.physics.add.collider(this.player, this.meteors533, this.PlayerHitMeteors, null, this);
        meteors122.destroy();
        laserGroup.destroy();
        }
    laserHitMeteors22(laserGroup, meteors22){
        this.laserLimit = 0; 
        this.meteors33 = new Meteors(
            this, this.meteors22.x,
            this.meteors22.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors33, this.laserHitMeteors33, null, this);
        this.physics.add.collider(this.player, this.meteors33, this.PlayerHitMeteors, null, this);
        this.meteors3333 = new Meteors(
            this, this.meteors22.x,
            this.meteors22.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors3333, this.laserHitMeteors3333, null, this);
        this.physics.add.collider(this.player, this.meteors3333, this.PlayerHitMeteors, null, this);
        meteors22.destroy();
        laserGroup.destroy();
    }
    laserHitMeteors2(laserGroup, meteors2){
        this.laserLimit = 0; 
        this.meteors3 = new Meteors(
            this, this.meteors2.x,
            this.meteors2.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors3, this.laserHitMeteors3, null, this);
        this.physics.add.collider(this.player, this.meteors3, this.PlayerHitMeteors, null, this);
        this.meteors333 = new Meteors(
            this, this.meteors2.x,
            this.meteors2.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.collider(this.laserGroup, this.meteors333, this.laserHitMeteors333, null, this);
        this.physics.add.collider(this.player, this.meteors333, this.PlayerHitMeteors, null, this);
        meteors2.destroy();
        laserGroup.destroy();       
    }
    laserHitMeteors1333(laserGroup, meteors1333){
        this.laserLimit = 0; 
        meteors1333.destroy();
        laserGroup.destroy();
        console.log("7");
        this.meteorScore++;
    }
    laserHitMeteors23333(laserGroup, meteors23333){
        this.laserLimit = 0; 
        meteors23333.destroy();
        laserGroup.destroy();
        console.log("6");
        this.meteorScore++;
    }
    laserHitMeteors333(laserGroup, meteors333){
        this.laserLimit = 0; 
        meteors333.destroy();
        laserGroup.destroy();
        console.log("5");
        this.meteorScore++;
    }
    laserHitMeteors3333(laserGroup, meteors3333){
        this.laserLimit = 0; 
        meteors3333.destroy();
        laserGroup.destroy();
        console.log("4");
        this.meteorScore++;
    }
    laserHitMeteors3(laserGroup, meteors3){
        this.laserLimit = 0; 
        meteors3.destroy();
        laserGroup.destroy();
        console.log("3");
        this.meteorScore++;
    }
    laserHitMeteors33(laserGroup, meteors33){
        //COUNT NUMBER UNTIL WIN YES
        this.laserLimit = 0; 
        meteors33.destroy();
        laserGroup.destroy();
        this.meteorScore++;
    }
    laserHitMeteors533(laserGroup, meteors533){
        this.laserLimit = 0; 
        meteors533.destroy();
        laserGroup.destroy();
        console.log("2");
        this.meteorScore++;
    }
    laserHitMeteors4433(laserGroup, meteors433){
        this.laserLimit = 0; 
        meteors433.destroy();
        laserGroup.destroy();
        console.log("1");
        this.meteorScore++;
    }

    laserHitMeteors13333(laserGroup, meteors13333){
        this.laserLimit = 0;
        meteors13333.destroy();
        laserGroup.destroy();
        console.log("8");
        this.meteorScore++;
    }
    
    /////
    //CONGRATS YOU MADE IT ALIVE
    /////
    update(time) {
        this.player.update(time);

        if(this.controls.space.isDown) {
            this.shootLaser();
        }
        if (this.meteorScore >= 8)
        {
            this.scene.start('Level002');
        }
        this.livesText.text = `${this.lives}`;
    }
    shootLaser() {
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