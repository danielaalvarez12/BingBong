var DIRECTION = { 
    IDLE: 0,
    UP: 1,
    DOWN: 2, 
    LEFT: 3,
    RIGHT: 4,
}

var rounds = [5, 5, 3, 3, 2];
var colors = ["red", "blue", "green", "yellow", "purple"];


var Ball = {
    new: function (incrementedSpeed) {
        return {
            width: 18,
            height: 18,
            x: (this.canvas.width / 2) -9, 
            y: (this.canvas.height / 2) -9,
            moveX: DIRECTION.IDLE, 
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || 7
        };
    }
}

var Ai = {
    new: function (side) {
        return {
            width: 18,
            height: 180,
            x: side === 'left' ? 150 : this.canvas.width - 150,
            y: (this.canvas.height / 2) - 35,
            score: 0,
            move: DIRECTION.IDLE,
            speed: 8
        };
    }
};

initialize: function () {
    const c = this.canvas = document.querySelector('canvas');
    const ctx = this.context = c.getContext('2d');

    Object.assign(c, { width: 1400, height: 1000 });
    Object.assign(c.style, {
        width: c.width / 2 + 'px',
        height: c.height / 2 + 'px'
    });

    this.player = Ai.new.call(this, 'left');
    this.ai = Ai.new.call(this, 'right');
    this.ai.speed = 5;
    this.ball = Ball.new.call(this);

    Object.assign(this, {
        running: false,
        over: false,
        turn: this.ai,
        timer: 0,
        round: 0,
        color: '#8c52ff'
    });

    Pong.menu();
    Pong.listen();
}


 endGameMenu: function (text) {
  
        Pong.context.font = '45px Courier New';
        Pong.context.fillStyle = this.color;
 
  
        Pong.context.fillRect(
            Pong.canvas.width / 2 - 350,
            Pong.canvas.height / 2 - 48,
            700,
            100
        );
 
        Pong.context.fillStyle = '#ffffff';
 
    
        Pong.context.fillText(text,
            Pong.canvas.width / 2,
            Pong.canvas.height / 2 + 15
        );
menu: function () {
        Pong.draw();
        this.context.font = '50px Courier New';
        this.context.fillStyle = this.color;
 
        this.context.fillRect(
            this.canvas.width / 2 - 350,
            this.canvas.height / 2 - 48,
            700,
            100
        );
 
        this.context.fillStyle = '#ffffff';

        this.context.fillText('Press any key to begin',
            this.canvas.width / 2,
            this.canvas.height / 2 + 15
        );
    },

 update: function () {
    if (this.over) return;

    const { ball, player, ai, canvas } = this;

    if (ball.x <= 0) Pong._resetTurn.call(this, ai, player);
    else if (ball.x >= canvas.width - ball.width) Pong._resetTurn.call(this, player, ai);

    ball.moveY = ball.y <= 0 ? DIRECTION.DOWN :
                 ball.y >= canvas.height - ball.height ? DIRECTION.UP : ball.moveY;

    if (player.move) player.y += player.move === DIRECTION.UP ? -player.speed : player.speed;

    if (Pong._turnDelayIsOver.call(this) && this.turn) {
        Object.assign(ball, {
            moveX: this.turn === player ? DIRECTION.LEFT : DIRECTION.RIGHT,
            moveY: [DIRECTION.UP, DIRECTION.DOWN][Math.random() < 0.5 ? 0 : 1],
            y: Math.random() * (canvas.height - 200) + 200
        });
        this.turn = null;
    }
}

          
this.player.y = Math.min(Math.max(this.player.y, 0), this.canvas.height - this.player.height);

this.ball.y += (this.ball.moveY === DIRECTION.UP ? -1 : 1) * this.ball.speed / 1.5;
this.ball.x += (this.ball.moveX === DIRECTION.LEFT ? -1 : 1) * this.ball.speed;

let aiTarget = this.ball.y - this.ai.height / 2;
let aiAdjust = this.ball.moveX === DIRECTION.RIGHT ? this.ai.speed / 1.5 : this.ai.speed / 4;
this.ai.y += this.ai.y < aiTarget ? aiAdjust : this.ai.y > aiTarget ? -aiAdjust : 0;
this.ai.y = Math.min(Math.max(this.ai.y, 0), this.canvas.height - this.ai.height);

if (
  this.ball.x <= this.player.x + this.player.width &&
  this.ball.x + this.ball.width >= this.player.x &&
  this.ball.y + this.ball.height >= this.player.y &&
  this.ball.y <= this.player.y + this.player.height
) {
  this.ball.x = this.player.x + this.ball.width;
  this.ball.moveX = DIRECTION.RIGHT;
}

 
            if (this.ball.x - this.ball.width <= this.ai.x && this.ball.x >= this.ai.x - this.ai.width) {
                if (this.ball.y <= this.ai.y + this.ai.height && this.ball.y + this.ball.height >= this.ai.y) {
                    this.ball.x = (this.ai.x - this.ball.width);
                    this.ball.moveX = DIRECTION.LEFT;
 
                }
            }
        }
 
        if (this.player.score === rounds[this.round]) {
           
            if (!rounds[this.round + 1]) {
                this.over = true;
                setTimeout(function () { Pong.endGameMenu('Winner!'); }, 1000);
            } else {
        
                this.color = this._generateRoundColor();
                this.player.score = this.ai.score = 0;
                this.player.speed += 0.5;
                this.ai.speed += 1;
                this.ball.speed += 1;
                this.round += 1;
 
            }
        }
       
        else if (this.ai.score === rounds[this.round]) {
            this.over = true;
            setTimeout(function () { Pong.endGameMenu('Game Over!'); }, 1000);
        }
    },
 
   draw: function () {
    const { context: ctx, canvas, color, player, ai } = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#eeeeee';
    [player, ai].forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
}

 
        if (Pong._turnDelayIsOver.call(this)) {
            this.context.fillRect(
                this.ball.x,
                this.ball.y,
                this.ball.width,
                this.ball.height
            );
        }
 
draw: function () {
    const { context: ctx, canvas, player, ai } = this, cx = canvas.width / 2;

    ctx.beginPath();
    ctx.setLineDash([7, 15]);
    ctx.moveTo(cx, canvas.height - 150);
    ctx.lineTo(cx, 150);
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'pink';
    ctx.stroke();

    ctx.textAlign = 'center';

    ctx.font = '100px Courier New';
    ctx.fillText(player.score, cx - 300, 200);
    ctx.fillText(ai.score, cx + 300, 200);

    ctx.font = '30px Courier New';
    ctx.fillText(`Round ${Pong.round + 1}`, cx, 35);

    ctx.font = '40px Courier';
    ctx.fillText(rounds[Pong.round] || rounds[Pong.round - 1], cx, 100);
}
 
    loop: function () {
        Pong.update();
        Pong.draw();
 
        if (!Pong.over) requestAnimationFrame(Pong.loop);
    },
 
    listen: function () {
        document.addEventListener('keydown', function (key) {
            if (Pong.running === false) {
                Pong.running = true;
                window.requestAnimationFrame(Pong.loop);
            }
 
            if (key.keyCode === 38 || key.keyCode === 87) Pong.player.move = DIRECTION.UP;
 
            if (key.keyCode === 40 || key.keyCode === 83) Pong.player.move = DIRECTION.DOWN;
        });
 
        document.addEventListener('keyup', function (key) { Pong.player.move = DIRECTION.IDLE; });
    },
 
    
   _resetTurn: function(victor, loser) {
    Object.assign(this, {
        ball: Ball.new.call(this, this.ball.speed),
        turn: loser,
        timer: Date.now()
    });
    victor.score++;
}
 
   
    _turnDelayIsOver: function() {
        return ((new Date()).getTime() - this.timer >= 1000);
    },
 
    _generateRoundColor: function () {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        if (newColor === this.color) return Pong._generateRoundColor();
        return newColor;
    }
};
 
var Pong = Object.assign({}, Game);
Pong.initialize();
