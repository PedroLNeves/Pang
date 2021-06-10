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
            this.scene.sound.play('pew');
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
export class Level002 extends Phaser.Scene {
    constructor() {
        super('Level002');
        this.laserLimit = 0;
        this.meteorsScore2 = 0;
        this.playerInvFrames = 1; //1 = true,  0 = false/ UNUSED AS OF NOW

        this.laserGroup;
    }
    init() {
        this.controls = this.input.keyboard.createCursorKeys();
    }
    create() {
        this.add.image(0, 0, 'background2').setOrigin(0).setScale(5);

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
            this.meteorsX = new Meteors(
                this, this.game.config.width * 0.25,
                this.game.config.height * 0.5,
                'meteors', 6
            ).setScale(2.5);
            this.player.setSize(100,180);
            this.player.body.offset.y = 100;
        this.laserGroup = new LaserGroup(this);
        this.physics.add.overlap(this.laserGroup, this.meteors, this.laserHitMeteors, null, this);
        this.physics.add.overlap(this.laserGroup, this.meteorsX, this.laserHitMeteorsX, null, this);
        this.physics.add.overlap(this.player, this.meteors, this.PlayerHitMeteors, null, this);
        this.physics.add.overlap(this.player, this.meteorsX, this.PlayerHitMeteors, null, this);

        this.input.manager.enabled = true;
        this.input.once('pointerdown', function () {
            this.scene.start('Level003');
        }, this);
        this.sound.add('pew');
        this.sound.add('oof');
        
    }
    PlayerHitMeteors()
    {
        if (this.playerInvFrames = 1)
        {
            this.playerInvFrames = 0;
            this.sound.play('oof');
            this.scene.restart();
        } else {
            console.log("NO DAMAGE HAHA");
        }
    }
    /////
    //BEYOND THIS POINT IT IS TOO LATE YOU HAVE REACHED PEAK DESPERATION
    /////
    laserHitMeteorsX1(laserGroup, meteorsX1)
    {
            this.laserLimit = 0; 
            this.meteorsX11 = new Meteors(
                this, this.meteorsX1.x,
                this.meteorsX1.y,
                'meteors', 6
            ).setScale(0.75);
            this.physics.add.overlap(this.laserGroup, this.meteorsX11, this.laserHitMeteorsX11, null, this);
            this.physics.add.overlap(this.player, this.meteorsX11, this.PlayerHitMeteors, null, this);
            this.meteorsX12 = new Meteors(
                this, this.meteorsX1.x,
                this.meteorsX1.y,
                'meteors', 6
            ).setScale(0.75);
            this.physics.add.overlap(this.laserGroup, this.meteorsX12, this.laserHitMeteorsX12, null, this);
            this.physics.add.overlap(this.player, this.meteorsX12, this.PlayerHitMeteors, null, this);
            meteorsX1.destroy();
            laserGroup.destroy(); 
    }
    laserHitMeteorsX2(laserGroup, meteorsX2)
    {
            this.laserLimit = 0; 
            this.meteorsX21 = new Meteors(
                this, this.meteorsX2.x,
                this.meteorsX2.y,
                'meteors', 6
            ).setScale(0.75);
            this.physics.add.overlap(this.laserGroup, this.meteorsX21, this.laserHitMeteorsX21, null, this);
            this.physics.add.overlap(this.player, this.meteorsX21, this.PlayerHitMeteors, null, this);
            this.meteorsX22 = new Meteors(
                this, this.meteorsX2.x,
                this.meteorsX2.y,
                'meteors', 6
            ).setScale(0.75);
            this.physics.add.overlap(this.laserGroup, this.meteorsX22, this.laserHitMeteorsX22, null, this);
            this.physics.add.overlap(this.player, this.meteorsX22, this.PlayerHitMeteors, null, this);
            meteorsX2.destroy();
            laserGroup.destroy(); 
    }
    laserHitMeteorsX21(laserGroup, meteorsX21){
        this.laserLimit = 0;
        meteorsX21.destroy();
        laserGroup.destroy();
        this.meteorsScore2++;
    }
    laserHitMeteorsX22(laserGroup, meteorsX22){
        this.laserLimit = 0;
        meteorsX22.destroy();
        laserGroup.destroy();
        this.meteorsScore2++;
    }
    laserHitMeteorsX(laserGroup, meteorsX)
    {
            this.laserLimit = 0; 
            this.meteorsX1 = new Meteors(
                this, this.meteorsX.x,
                this.meteorsX.y,
                'meteors', 6
            ).setScale(1.25);
            this.physics.add.overlap(this.laserGroup, this.meteorsX1, this.laserHitMeteorsX1, null, this);
            this.physics.add.overlap(this.player, this.meteorsX1, this.PlayerHitMeteors, null, this);
            this.meteorsX2 = new Meteors(
                this, this.meteorsX.x,
                this.meteorsX.y,
                'meteors', 6
            ).setScale(1.25);
            this.physics.add.overlap(this.laserGroup, this.meteorsX2, this.laserHitMeteorsX2, null, this);
            this.physics.add.overlap(this.player, this.meteorsX2, this.PlayerHitMeteors, null, this);
            meteorsX.destroy();
            laserGroup.destroy(); 
    }
    laserHitMeteorsX11(laserGroup, meteorsX11){
        this.laserLimit = 0;
        meteorsX11.destroy();
        laserGroup.destroy();
        this.meteorsScore2++;
    }
    laserHitMeteorsX12(laserGroup, meteorsX12){
        this.laserLimit = 0;
        meteorsX12.destroy();
        laserGroup.destroy();
        this.meteorsScore2++;
    }
    laserHitMeteors (laserGroup, meteors)
    {
        this.laserLimit = 0; 
        this.meteors1 = new Meteors(
            this, this.meteors.x,
            this.meteors.y,
            'meteors', 6
        ).setScale(2.5);
        this.physics.add.overlap(this.laserGroup, this.meteors1, this.laserHitMeteors1, null, this);
        this.physics.add.overlap(this.player, this.meteors1, this.PlayerHitMeteors, null, this);
        this.meteors11 = new Meteors(
            this, this.meteors.x,
            this.meteors.y,
            'meteors', 6
        ).setScale(2.5);
        this.physics.add.overlap(this.laserGroup, this.meteors11, this.laserHitMeteors11, null, this);
        this.physics.add.overlap(this.player, this.meteors11, this.PlayerHitMeteors, null, this);
        meteors.destroy();
        laserGroup.destroy();
    }
    laserHitMeteors1(laserGroup, meteors1){
        this.laserLimit = 0; 
        this.meteors2 = new Meteors(
            this, this.meteors1.x,
            this.meteors1.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.overlap(this.laserGroup, this.meteors2, this.laserHitMeteors2, null, this);
        this.physics.add.overlap(this.player, this.meteors2, this.PlayerHitMeteors, null, this);
        this.meteors222 = new Meteors(
            this, this.meteors1.x,
            this.meteors1.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.overlap(this.laserGroup, this.meteors222, this.laserHitMeteors222, null, this);
        this.physics.add.overlap(this.player, this.meteors222, this.PlayerHitMeteors, null, this);
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
        this.physics.add.overlap(this.laserGroup, this.meteors13333, this.laserHitMeteors13333, null, this);
        this.physics.add.overlap(this.player, this.meteors13333, this.PlayerHitMeteors, null, this);
        this.meteors23333 = new Meteors(
            this, this.meteors222.x,
            this.meteors222.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.overlap(this.laserGroup, this.meteors23333, this.laserHitMeteors23333, null, this);
        this.physics.add.overlap(this.player, this.meteors23333, this.PlayerHitMeteors, null, this);
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
        this.physics.add.overlap(this.laserGroup, this.meteors22, this.laserHitMeteors22, null, this);
        this.physics.add.overlap(this.player, this.meteors22, this.PlayerHitMeteors, null, this);
        this.meteors122 = new Meteors(
            this, this.meteors11.x,
            this.meteors11.y,
            'meteors', 6
        ).setScale(1.25);
        this.physics.add.overlap(this.laserGroup, this.meteors122, this.laserHitMeteors122, null, this);
        this.physics.add.overlap(this.player, this.meteors122, this.PlayerHitMeteors, null, this);
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
        this.physics.add.overlap(this.laserGroup, this.meteors4433, this.laserHitMeteors4433, null, this);
        this.physics.add.overlap(this.player, this.meteors4433, this.PlayerHitMeteors, null, this);
        this.meteors533 = new Meteors(
            this, this.meteors122.x,
            this.meteors122.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.overlap(this.laserGroup, this.meteors533, this.laserHitMeteors533, null, this);
        this.physics.add.overlap(this.player, this.meteors533, this.PlayerHitMeteors, null, this);
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
        this.physics.add.overlap(this.laserGroup, this.meteors33, this.laserHitMeteors33, null, this);
        this.physics.add.overlap(this.player, this.meteors33, this.PlayerHitMeteors, null, this);
        this.meteors3333 = new Meteors(
            this, this.meteors22.x,
            this.meteors22.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.overlap(this.laserGroup, this.meteors3333, this.laserHitMeteors3333, null, this);
        this.physics.add.overlap(this.player, this.meteors3333, this.PlayerHitMeteors, null, this);
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
        this.physics.add.overlap(this.laserGroup, this.meteors3, this.laserHitMeteors3, null, this);
        this.physics.add.overlap(this.player, this.meteors3, this.PlayerHitMeteors, null, this);
        this.meteors333 = new Meteors(
            this, this.meteors2.x,
            this.meteors2.y,
            'meteors', 6
        ).setScale(0.75);
        this.physics.add.overlap(this.laserGroup, this.meteors333, this.laserHitMeteors333, null, this);
        this.physics.add.overlap(this.player, this.meteors3333, this.PlayerHitMeteors, null, this);
        meteors2.destroy();
        laserGroup.destroy();       
    }
    laserHitMeteors1333(laserGroup, meteors1333){
        this.laserLimit = 0; 
        meteors1333.destroy();
        laserGroup.destroy();
        console.log("7");
        this.meteorsScore2++;
    }
    laserHitMeteors23333(laserGroup, meteors23333){
        this.laserLimit = 0; 
        meteors23333.destroy();
        laserGroup.destroy();
        console.log("6");
        this.meteorsScore2++;
    }
    laserHitMeteors333(laserGroup, meteors333){
        this.laserLimit = 0; 
        meteors333.destroy();
        laserGroup.destroy();
        console.log("5");
        this.meteorsScore2++;
    }
    laserHitMeteors3333(laserGroup, meteors3333){
        this.laserLimit = 0; 
        meteors3333.destroy();
        laserGroup.destroy();
        console.log("4");
        this.meteorsScore2++;
    }
    laserHitMeteors3(laserGroup, meteors3){
        this.laserLimit = 0; 
        meteors3.destroy();
        laserGroup.destroy();
        console.log("3");
        this.meteorsScore2++;
    }
    laserHitMeteors33(laserGroup, meteors33){
        this.laserLimit = 0; 
        meteors33.destroy();
        laserGroup.destroy();
        this.meteorsScore2++;
    }
    laserHitMeteors533(laserGroup, meteors533){
        this.laserLimit = 0; 
        meteors533.destroy();
        laserGroup.destroy();
        console.log("2");
        this.meteorsScore2++;
    }
    laserHitMeteors4433(laserGroup, meteors433){
        this.laserLimit = 0; 
        meteors433.destroy();
        laserGroup.destroy();
        console.log("1");
        this.meteorsScore2++;
    }

    laserHitMeteors13333(laserGroup, meteors13333){
        this.laserLimit = 0;
        meteors13333.destroy();
        laserGroup.destroy();
        console.log("8");
        this.meteorsScore2++;
    }
    /////
    //CONGRATS YOU MADE IT ALIVE
    /////
    update(time) {
        this.player.update(time);

        if(this.controls.space.isDown) {
            this.shootLaser();
        }
        if (this.meteorsScore2 >= 12)
        {
            this.scene.start('Level003');
        }

        
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