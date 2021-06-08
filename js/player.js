// export class Laser extends Phaser.Physics.Arcade.Sprite{
//     constructor(scene, x, y){
//         super(scene, x, y, 'harpon');
//     }

//     fire(x, y) {
//         this.body.reset(x, y);

//         this.setActive(true);
//         this.setVisible(true);

//         this.setVelocityY(-900);
//     }
// }
// export class LaserGroup extends Phaser.Physics.Arcade.Group
// {
//     constructor(scene)
//     {
//         super(scene.physics.world, scene);

//         this.createMultiple({
//             classType: Laser,
//             frameQuantity: 30,
//             active: false,
//             visible: false,
//             key: 'laser'
//         })
//     } 
//     fireLaser(x, y)
//     {
//         const laser = this.getFirstDead(false);
//         if (laser){
//             laser.fire(x, y);
//         }
//     }
// }

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(5);

        this.initialFrame = frame;

        this.velocity = 2000;
        this.controls = scene.input.keyboard.createCursorKeys();

        this.state = "idle";
        this.anims.play('idle');

        this.previous_state = this.state;

        //this.countHarpoon = 0;

        //this.laserGroup;
    }
    // create()
    // {
    //     this.LaserGroup = new LaserGroup(this);
    // }

    update(time) {

        if(this.controls.left.isDown) {
            this.setVelocityX(-this.velocity);
            this.flipX = true;
            this.state = 'walking';
        }
        else if(this.controls.right.isDown) {
            this.setVelocityX(this.velocity);
            this.flipX = false;
            this.state = 'walking';
        }
        else {
            this.setVelocityX(0);
            this.state = "idle";
        }

        if(this.controls.space.isDown) {
            this.state = 'scream';
            //this.FireHarpon();
        }

        if(this.state != this.previous_state) {
            this.previous_state = this.state;

            if(this.state == 'walking')
            {
                this.anims.play('walking');
            }
            if(this.state == 'idle')
            {
                this.anims.play('idle');
            }
            if(this.state == 'scream')
            {
                this.anims.play('scream');
            }
            
            else if (this.state == 'idle') {
                this.setFrame(this.initialFrame);
            }
        }

   
        
    }
    // FireHarpon()
    // {
    //     console.log("pew pew");
    //     this.laserGroup.fireLaser(this.player.x, this.player.y -20  );
    //     // this.add.image(this.player.x, 1000, 'harpon').setOrigin(0).setScale(10);
    //     // game.time.events.add(Phaser.Timer.SECOND * 2, this.destroy, this);
    //     //if(this.countHarpoon > 2)return;
    //     //this.countHarpoon++;

    //     //var harpon = this.physics.add.image(this.player.x, 100, 'harpon').setScale(10);
    // }

}