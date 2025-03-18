class sprite {
  constructor({
     position ,
      imageSrc ,
       scale = 1 ,
       frameMax = 1,
       offset =  {x:0 , y:0}
      }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.frameMax = frameMax
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 8
    this.offset = offset
  }
  draw() {
    c.drawImage(
      this.image ,
    this.frameCurrent * (this.image.width/this.frameMax),
      0,
      this.image.width/this.frameMax,
      this.image.height,

       this.position.x - this.offset.x ,
        this.position.y - this.offset.y, 
     (   this.image.width / this.frameMax )* this.scale, 
        this.image.height * this.scale
      )
  }

  animateFrame(){
 this.frameElapsed++
    if(this.frameElapsed % this.frameHold === 0){

      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      }
      else {
        this.frameCurrent = 0
      }
    }
    }
  
  update() {
    this.draw()
   this.animateFrame()
}}
class Fighter extends sprite {
  constructor({
    position,
    velocity,

    color,
    imageSrc,
    scale = 1,
    frameMax = 1,
    offset = { x: 0, y: 0 },
    SPRITES,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      frameMax,
      offset,
    });
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastkey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking;
    this.color = color;
    this.health = 100;

    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.frameHold = 8;
    this.SPRITES = SPRITES;
    this.dead = false
    for (const sprite in this.SPRITES) {
      SPRITES[sprite].image = new Image();
      SPRITES[sprite].image.src = SPRITES[sprite].imageSrc;
    }
  }

  update() {

    this.draw();
    if( !this.dead ) this.animateFrame();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;

    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    // draw the attack BOX
    // c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 65) {
      this.velocity.y = 0;
      this.position.y = 361;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.switchSprite("Attack1");

    this.isAttacking = true;
  }
  takeHit() {

    this.health -= 20;
       if (this.health <= 0) {
     this.switchSprite("Death");
   
   }else this.switchSprite("takeHit");
  }
  switchSprite(sprite) {
    if(this.image === this.SPRITES.Death.image) {
      if(this.frameCurrent ===  this.SPRITES.Death.frameMax -1  ) this.dead = true
      return }
    if (
      this.image === this.SPRITES.Attack1.image &&
      this.frameCurrent < this.SPRITES.Attack1.frameMax - 1
    )
      return
      if(this.image === this.SPRITES.takeHit.image 
        &&
        this.frameCurrent < this.SPRITES.takeHit.frameMax -1
      ) 
      return
    switch (sprite) {
      case "idle":
        if (this.image !== this.SPRITES.idle.image) {
          this.image = this.SPRITES.idle.image;
          this.frameMax = this.SPRITES.idle.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.SPRITES.run.image) {
          this.image = this.SPRITES.run.image;
          this.frameMax = this.SPRITES.run.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.SPRITES.jump.image) {
          this.image = this.SPRITES.jump.image;
          this.frameMax = this.SPRITES.jump.frameMax;
          this.frameCurrent = 0;
        }

        break;

      case "fall":
        if (this.image !== this.SPRITES.fall.image) {
          this.image = this.SPRITES.fall.image;
          this.frameMax = this.SPRITES.fall.frameMax;
          this.frameCurrent = 0;
        }

        break;
      case "Attack1":
        if (this.image !== this.SPRITES.Attack1.image) {
          this.image = this.SPRITES.Attack1.image;
          this.frameMax = this.SPRITES.Attack1.frameMax;
          this.frameCurrent = 0;
        }

        break;
      case "Attack2":
        if (this.image !== this.SPRITES.Attack2.image) {
          this.image = this.SPRITES.Attack2.image;
          this.frameMax = this.SPRITES.Attack2.frameMax;
          this.frameCurrent = 0;
        }

        break;
      case "takeHit":
        if (this.image !== this.SPRITES.takeHit.image) {
          this.image = this.SPRITES.takeHit.image;
          this.frameMax = this.SPRITES.takeHit.frameMax;
          this.frameCurrent = 0;
        }

        break;
      case "Death":
        if (this.image !== this.SPRITES.Death.image) {
          this.image = this.SPRITES.Death.image;
          this.frameMax = this.SPRITES.Death.frameMax;
          this.frameCurrent = 0;
        }

        break;
    }
  }
}
