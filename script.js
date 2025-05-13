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

var Game = {
    initialize: function () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
 
        this.canvas.width = 1400;
        this.canvas.height = 1000;
 
        this.canvas.style.width = (this.canvas.width / 2) + 'px';
        this.canvas.style.height = (this.canvas.height / 2) + 'px';
 
        this.player = Ai.new.call(this, 'left');
        this.ai = Ai.new.call(this, 'right');
        this.ball = Ball.new.call(this);
 
        this.ai.speed = 5;
        this.running = this.over = false;
        this.turn = this.ai;
        this.timer = this.round = 0;
        this.color = '#8c52ff';
 
        Pong.menu();
        Pong.listen();
    },
}

// audio for game still working on it
var sfx = {
    background: new Audio(''),
     hit: new Audio('sounds/hit.mp3'),
        score: new Audio('sounds/score.mp3'),
        win: new Audio('sounds/win.mp3'),
        lose: new Audio('sounds/lose.mp3'),
        start: new Audio('sounds/start.mp3'),
    

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
<audio id="background-music" loop>
        <source src="/Users/danielaalvarez/Music/Music/Media.localized/Music/Unknown Artist/Unknown Album/chill-lofi-316579.mp3" type="audio/mp3">
    </audio>
