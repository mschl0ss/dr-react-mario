import React from "react";


class Game3 extends React.Component {

    componentDidMount() {
        this.renderGame() 
    }
    
    renderGame() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");


        let pillWidth = 50;
        let pillHeight = 50;
        let pilldY = 50;

        let pillFalling = false;

        let pill1X = canvas.width / 2 - 50;
        let pill1Y = 0;
        let pill1C = "blue";

        let pill2X = canvas.width / 2;
        let pill2Y = 0;
        let pill2C = "red";

        let pills = [];

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawPill();
            drawPills();

            if (pillFalling === false) {
                pill1X = canvas.width / 2 - 50;
                pill1Y = 0;

                pill2X = canvas.width / 2;
                pill2Y = 0;
                pillFalling = true;
            } else {
                updateCurrentPill();
            }
            checkCollisionWithPills();


        }

        function updateCurrentPill() {
            if (!(pill1Y + pilldY >= canvas.height) ||
                !(pill2Y + pilldY >= canvas.height)) {
                if (pillFalling) {
                    pill1Y += pilldY;
                    pill2Y += pilldY;
                }
            } else {
                pillFalling = false;
                pills.push({ x: pill1X, y: pill1Y, color: pill1C })
                pills.push({ x: pill2X, y: pill2Y, color: pill2C });
            }


        }

        function drawPill() {
            ctx.beginPath();
            ctx.rect(pill1X, pill1Y, pillWidth, pillHeight);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(pill2X, pill2Y, pillWidth, pillHeight);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        function drawPills() {
            for (let i = 0; i < pills.length; i++) {
                let curPill = pills[i];
                ctx.beginPath();
                ctx.rect(curPill.x, curPill.y, pillWidth, pillHeight);
                ctx.fillStyle = curPill.color;
                ctx.fill();
                ctx.closePath();
            }
        }


        //check for pills colliding with pills
        function checkCollisionWithPills() {
            for (let i = 0; i < pills.length; i++) {
                let pill = pills[i];
                if ((pill1X === pill.x && pill1Y + pillHeight === pill.y) ||
                    (pill2X === pill.x && pill2Y + pillHeight === pill.y)) {
                    pills.push({ x: pill1X, y: pill1Y, color: pill1C })
                    pills.push({ x: pill2X, y: pill2Y, color: pill2C })
                    pillFalling = false;

                }

            }

        }


        document.addEventListener("keydown", keyDownHandler, false);
        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                pill1X += 50;
                pill2X += 50;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                pill1X -= 50;
                pill2X -= 50;
            }
        }

        setInterval(draw, 500)  
    }

    render() {
        return <canvas width="400" height="1000" id= "myCanvas" ></canvas>;
    }
}

export default Game3