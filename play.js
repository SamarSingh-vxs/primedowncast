const canvas = document.querySelector("canvas");
const gravity = 0.29;
c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, 1024, 576);

const background  = new sprite({
  position :{
    x:0,
    y:0
  },
  imageSrc : 'bg.jpg'
})
const lightning  = new sprite({
  position :{
    x:400,
    y:0
  },
  imageSrc : 'thunder-removebg-preview.png',
  scale :1.9,
  frameMax : 4
})

const player = new Fighter({
  position: {
    x: 0,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "darkslateblue",
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "Idle.png",
  scale: 3,
  frameMax: 2,
  offset: {
    x: 215,
    y: 200,
  },
  SPRITES: {
    idle: {
      imageSrc: "Idle.png",
      frameMax: 4,
    },
    run: {
      imageSrc: "Run.png",
      frameMax: 8,
    },
    jump: {
      imageSrc: "Jump.png",
      frameMax: 2,
    },
    fall: {
      imageSrc: "Fall.png",
      frameMax: 2,
    },
    Attack1: {
      imageSrc: "Attack1.png",
      frameMax: 4,
    },
    takeHit: {
      imageSrc: "Take hit.png",
      frameMax: 3,
    },
    Death: {
      imageSrc: "Death.png",
      frameMax: 7,
    },
    Attack2: {
      imageSrc: "Attack2.png",
      frameMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 200,
    height: 50,
  },
});

const enemy = new Fighter({
  position: {
    x: 965,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "darkorange",
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "Sprites/Idle.png",
  scale: 1,
  frameMax: 2,
  offset: {
    x: 0,
    y: 0,
  },
  SPRITES: {
    idle: {
      imageSrc: "goku.png",
      frameMax: 1,
    },
    run: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
    jump: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
    fall: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
    Attack1: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
    takeHit: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
    Death: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
    Attack2: {
      imageSrc: "goku.png",

      frameMax: 1,
    },
  },

  attackBox: {
    offset: {
      x: -150,
      y: 50,
    },
    width: 200,
    height: 50,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  Enter :{
    pressed : false
  }
};



decreaseTimer()


function animate() {
  window.requestAnimationFrame(animate);

  c.fillRect(0, 0, canvas.width, canvas.height);
  
  background.update()
  lightning.update()
  c.fillStyle = 'rgba(4, 0, 255,0.5)'
  enemy.update();
  player.update();
  player.velocity.x = 0;
  
  //player movement
  if (keys.a.pressed == true && player.lastkey === "a") {
    player.velocity.x = -5;
  player.switchSprite("run");

    player.frameMax = player.SPRITES.run.frameMax;  
  } else if (keys.d.pressed == true && player.lastkey === "d") {
    player.velocity.x = 5;
  player.switchSprite("run");

  }else{
  player.switchSprite("idle");

  }
// jumping
  if (player.velocity.y < 0 ){
    player.switchSprite("jump");


  } 
  else if (player.velocity.y > 0)
    {
      player.switchSprite("fall");


    }
  
  enemy.velocity.x = 0;
  
  //Enemy movement
  if (keys.ArrowLeft.pressed == true && enemy.lastkey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (
    keys.ArrowRight.pressed == true &&
    enemy.lastkey === "ArrowRight"
  ) {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }
   if (enemy.velocity.y < 0) {
     enemy.switchSprite("jump");
   } else if (enemy.velocity.y > 0) {
     enemy.switchSprite("fall");
   }
  //collision && player : HiT
  if (
    rectangularCollision({
      
      rectangle1 : player,
      rectangle2 : enemy
      
    }
  ) &&
  player.isAttacking && player.frameCurrent  === 3
){
  enemy.takeHit()
  player.isAttacking = false
  document.getElementById('enemyHealth').style.width = enemy.health + '%'
  if(enemy.health <= 0){
    enemy.switchSprite('Death');
  }
}

// if player misses 
 if (player.isAttacking && player.frameCurrent  === 3){
  player.isAttacking = false;

 }

 if (player.velocity.y < 0 ){
    player.switchSprite("jump");


  } 
  else if (player.velocity.y > 0)
    {
      player.switchSprite("fall");


    }

if (
  rectangularCollision({
    
    rectangle1 : enemy,
    rectangle2 : player
    
  }
) &&
enemy.isAttacking
&& player.frameCurrent  === 3
){
  player.takeHit();

  enemy.isAttacking = false
  document.getElementById('playerHealth').style.width = player.health + '%'

}
 if (enemy.isAttacking && enemy.frameCurrent === 3) {
   enemy.isAttacking = false;
 }
if ( enemy.health <= 0 || player.health <=0){
  determineWinner({player,enemy,timerId})
}


}
animate();

window.addEventListener("keydown", (e) => {

if (!player.dead){
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      player.lastkey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastkey = "a";
      break;

    case "w":
      player.velocity.y = -12;
      break;
    case " ":
      player.attack();

      break;
  }

   

  }
  if(!enemy.dead){
    switch (e.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastkey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastkey = "ArrowLeft";
        break;
   

      case "ArrowDown":
        enemy.attack();
        break;
      case "ArrowUp":
        enemy.velocity.y = -12;

        break;
    }
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;

      break;
    case "a":
      keys.a.pressed = false;

      break;
    case "w":
      keys.w.pressed = false;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;

      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;

      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break ;}
});
