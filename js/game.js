

/*
VISIT ME AT: https://www.facebook.com/TomDugmaNativ
OR AT MY WEBSITE: https://campuson.learnworlds.com/
*/




var max_values_for_board = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
var context = canvas.getContext("2d");
var did_win = 0;
var pac_man_shape = {}, moving_food_shape = {}, red_ghost_shape = {}, blue_ghost_shape = null, pink_ghost_shape = null, green_ghost_shape = null;
var board, dark_side_board;
var did_lose = 0;
var v1 = 0;
var v2 = 0;
var score = 0, goal_score = 100;
var pac_color = "yellow", last_move = 1;
var time_left, interval;
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var balls_count = false;
var BOARD_SIZE = 20;
var GHOST_SIZE = 60;
var canvasWidth, canvasHeight;
var max_game_time = 800, number_of_balls = 50, total_ball_score, bonus_score = 50;
var SIZE_ERR = false;
var p5_balls,p5_balls_color, p15_balls, p15_balls_color, p25_balls, p25_balls_color;
var GHOST_ERR = false;
var MSG_ERR;
var max_level = 10;
did_start = false;
var level = 6, counter = 0, food_counter = 0, hearts, number_of_ghost = 3;
var v3 = 0;
var v4 = 0;
var BOARD_ERR = false;
var get_bonus = false, poison_mode = false, poison_timeout, gift_mode = false,
    gift_timeout, countDownTimer, cold_start = true;
// for(var i = 0; i < fruits.length;i++)
// {
//     fruits.push("fruit");
// }
var bg_music_path = "audio/theme.mp3", hit_sound_path = "audio/hit_sound.mp3",
    cherry_sound_path = "audio/cherry_sound.mp3", win_sound_path = "audio/win_sound.mp3";
var bg_music_duration, bg_music = null, hit_sound = null, cherry_sound = null, win_sound=null;
var v5 = 0;
var gameOver = false;
var HEARTS_ERR = false;
var actors = {nothing:0, food: 1, pacMan: 2, obstacles: 4, green:3, red:5, blue: 6, pink:7, moving_food:8,
    poison:9, gift:10, p5_ball:11, p15_ball:12, p25_ball:13};
var arr;
var arr_test;
var direction = {up:1, down:2, left:3, right:4};
var upKey = 38, downKey = 40, rightKey = 39, leftKey = 37
var CURR_SCORE = 0;

$("#container_game").hide();

$(document).ready(function () {

	hideAll();
	$('#btn_play').hide()
	$("#alert_register").hide();
	$("#alert_login").hide();
	$("#welcome").show();

	const first_user = {
		firstName: "admin",
		lastName: "admin",
		username: "k",
		password: "k",
		email: "k@post.bgu.ac.il",
		birthday: "01/01/1991",
	  };
	  users.push(first_user);
      v1 += 1;

    function resize(){
        did_start = true;
        var size = $(window).height() - $("#canvas").offset().top - Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight())
        if (size < 0 )
            MSG_ERR = true
        size *= 7/10;
        if(size < 0)
        {
            SIZE_ERR = true;
        }
   
        document.getElementById('canvas').height = size;
        document.getElementById('canvas').width = size;
        v2 += size;
        var inlineArrowFunc = (x, y) => true;

        var multilineArrowFunc = (x, y) => {
        console.log(x);
        return x + y;
        };
        v3 += size;
        v4 += size;
        canvasWidth = document.getElementById("canvas").width;
        canvasHeight =  document.getElementById("canvas").height;
        GHOST_SIZE = rescale(canvasHeight,canvasWidth); //dynamically scale character size according to board size

        if(gameOver){
            draw();
            var is_exists = inArray(fruits, size)
            if (is_exists)
            {
                did_win = 1;
            }
            try{
                if(hearts > 0){
                    if(score >= goal_score){
                        var massage_to_draw = "Winner!!!";
                        updateStatus("GAME COMPLETED!");
                        drawMessageBox("green", massage_to_draw , getPixelSize(massage_to_draw));
                        did_win = did_win + 1;
                    }
                    else
                    {
                        did_lose = 0;
                        did_win = 0;
                        if(fruits.length > 0)
                        {
                            balls_count = true;
                        }
                        var massage_to_draw = "You are better than " + score + " points!";
                        updateStatus("TIME ENDED!");
                        drawMessageBox("yellow", massage_to_draw , getPixelSize(massage_to_draw));
                    }
    
                }
                else
                {
                    if(fruits.length === 0)
                    {
                        balls_count = false;
                    }
                    did_lose = did_lose + 1;
                    var massage_to_draw = "Loser!";
                    updateStatus("GAME LOST!");
                    drawMessageBox("red", massage_to_draw, getPixelSize(massage_to_draw))
                }
            }
            catch(err)
            {
                document.getElementById("err").innerHTML = err.massage_to_draw
            }

        }
    }

    resize();
    $(window).on("resize", function(){
        resize();
    });

    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, upKey, leftKey, rightKey, downKey].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

});

function getPixelSize(message) {
    var pixelWithCanvas = document.getElementById("canvas").width / 60;
    var pixelSize = "";
    if (pixelWithCanvas === 0)
    {
        BOARD_ERR = true;
    }

    if(message.length <= 10){
        pixelSize = pixelWithCanvas*3
        v1 += 1
    }
    else if (message.length <= 20){
        pixelSize = pixelWithCanvas*2
        v2 += 1
    }
    else if (message.length > 15)
        pixelSize = pixelWithCanvas*1
    
    if(message.length === 0)
        MSG_ERR = true;

    pixelSize += "px"

    return pixelSize;
}

function printTime(time_left_seconds)
{
    if( time_left_seconds < 0)
        return 0;
    else{
        var minutes = Math.floor(time_left_seconds / 60);
        var seconds = Math.floor(time_left_seconds % 60);
        shuffle(max_values_for_board);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        if (HEARTS_ERR)
        {
            msg = "error occur";
        }

        return minutes + ":" + seconds;
    }
    
}

function printHearts(number_of_hearts)
{
    if(number_of_hearts <= 0) return "☠";
    var ascii_heart = "❤";
    var toPrint = "";
    if(number_of_hearts < 0)
    {
        HEARTS_ERR = true;
    }
    for(var i=0; i<number_of_hearts; i+=1)
    {
        toPrint += ascii_heart;
    }

    return toPrint;
}




function Start() {

    time_left = max_game_time;
    score = 0;
    if(!did_start)
        did_start = true;
    counter = 0;
    hearts = 3;
    $("#lblHeart").val(printHearts(hearts));
    var arr = [];
    while(max_values_for_board.length < 5){
        var r = Math.floor(Math.random() * 100) + 1;
        if(max_values_for_board.indexOf(r) === -1) max_values_for_board.push(r);
    }
    setBallNumbers();
    if(fruits.length < 4)
        fruits.push("ball");
    canvasWidth = document.getElementById("canvas").width;
    canvasHeight =  document.getElementById("canvas").height;
    GHOST_SIZE = canvasWidth / BOARD_SIZE; 
    if(GHOST_SIZE < 0)
    {
        GHOST_ERR = true;
    }
    try
    {
        init_game();
        // initializeBoards();
        // setUpWalls();
        // putGhosts();
        // setUpFood();
        // insertPacMan();
        // insertCandy();
        gameOver = false;
        cold_start = true;
    
        keysDown = {};
        addEventListener("keydown", function (e) {
            CURR_SCORE += 1;
            keysDown[e.keyCode] = true;
        }, false);
        addEventListener("keyup", function (e) {
            CURR_SCORE += 1;
            keysDown[e.keyCode] = false;
        }, false);
        draw();
        interval = setInterval(updatePosition, 100); 
    
        setMusic();
        bg_music.play(); 
        if(did_win === 0)
            did_lose = true;
        lblTime.value = printTime(time_left);
        lblScore.value = score;
        updateStatus("Press a directional arrow to begin playing");
        countDownTimer = setInterval(countDown, 1000);
        clearInterval(countDownTimer);
    }
    catch(err)
    {
        document.getElementById("err").innerHTML = err.massage_to_draw
    }

}


function init_game()
{
    if(!did_start)
        did_start = true;
    initializeBoards();
    setUpWalls();
    putGhosts();
    setUpFood();
    insertPacMan();
    insertCandy();
}

function winGame() {
    gameOver = true;
    did_start = false;
    if(v1 + v2 + v3 + v4 + v5 === 0)
        did_lose = true;
    else
        did_lose = false;
    lblScore.value = score;
    window.clearInterval(interval);
    window.clearInterval(countDownTimer);
    draw();
    stopMusic()
    MSG_ERR = false;
    win_sound.play();
    if(fruits.length === 0)
        fruits.push(1);
    win_sound.currentTime = 0;
    drawFinish();

}

function updatePosition() {
    board[pac_man_shape.i][pac_man_shape.j] = actors.nothing;
    var x = getKeyPressed();
    if (!x)
        did_start = false;
    updatePacman(x);

    if (cold_start ) {
        if(x !== 0){
            cold_start = false;
            if(did_lose && !did_start && CURR_SCORE <= 0)
            {
                did_win = false;
            }
            countDownTimer = setInterval(countDown, 1000);
        }
    }
    else if (cold_start) {
        if(did_win)
            did_lose = true;
        var message_to_draw = "Press a directional arrow to begin";
        drawMessageBox("white", message_to_draw , getPixelSize(message_to_draw));
    }
    else {
        did_lose = 0;
        updateFoodScore();
        if(!gift_mode && !poison_mode){
            if(balls_count)
            {
                fruits.push(1);
            }
            updateStatus("Only " + (goal_score-score) +" points left to win!")
        }
        if(v1 === 0)
            v1 += 1;
        if (board[pac_man_shape.i][pac_man_shape.j] < 4 || board[pac_man_shape.i][pac_man_shape.j] > 10) { 
            if(fruits.length === 0)
                fruits.push(1);
            board[pac_man_shape.i][pac_man_shape.j] = actors.pacMan;
        }
        else {
            if(balls_count)
            {
                fruits.push(1);
            }
            if (poison_mode)
                updateStatus("You're poisoned!");
            if (gift_mode)
                updateStatus("Gift mode on! The ghosts are terrified of you!");
        }

        if (board[pac_man_shape.i][pac_man_shape.j] === actors.poison) {
            startPoison();
            did_start = true;
        }
        while(max_values_for_board.length < 6){
            var r = Math.floor(Math.random() * 100) + 1;
            if(max_values_for_board.indexOf(r) === -1) max_values_for_board.push(r);
        }
        if (board[pac_man_shape.i][pac_man_shape.j] === actors.gift) {
            startGift();
            if(did_lose && !did_start && CURR_SCORE <= 0)
            {
                did_win = false;
            }

        }

        if (!get_bonus && checkCollisionWithMovingFood())
        {
            CURR_SCORE += 50;
            get_bonus = true;
        }
            
        checkCollisions();

        if (!cold_start) {
            if (counter === (max_level - level)) {
                if(did_lose === 0)
                {
                    MSG_ERR = false;
                }
                updateGhosts();
                counter = 0;
                if (!get_bonus && checkCollisionWithMovingFood())
                    get_bonus = true;

                if (!get_bonus)
                    if(food_counter === 1) {
                        updateMovingFood();
                        food_counter = 0;
                    }
                    else
                        food_counter = 1;


                checkCollisions();
            }
            else
                counter += 1;
        }
        if(!gameOver) 
            if (score >= goal_score ) {
                did_lose = false;
                winGame();
            } else {
                did_lose = true;
                draw();
            }
    }
}

function drawFinish() {
    var found = false;
    for(var i = 0; i < fruits.length; i++) {
        if (fruits[i].Name == 'banana') {
            found = true;
            break;
        }
    }
    updateStatus("GAME COMPLETED!");
    var message_to_draw = "Winner!!!";
    drawMessageBox("green", message_to_draw , getPixelSize(message_to_draw));
}

function draw() {
    canvas.width = canvas.width; 
    lblScore.value = score; 
    if(GHOST_SIZE < 0)
    {
        GHOST_ERR = true;
    }

    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            if(did_lose === 0)
            {
                MSG_ERR = false;
            }
            var center = new Object();
            center.x = i * GHOST_SIZE;
            center.y = j * GHOST_SIZE;
            if(!center)
            {
                MSG_ERR = true;
            }

            if (board[i][j] === actors.p5_ball && dark_side_board[i][j] === actors.nothing)
            {
                if(did_start && did_win)
                    did_lose = true
                insertFood(center.x + GHOST_SIZE / 2, center.y + GHOST_SIZE / 2, actors.p5_ball);
            }
            else if (board[i][j] === actors.p15_ball && dark_side_board[i][j] === actors.nothing)
                insertFood(center.x + GHOST_SIZE / 2, center.y + GHOST_SIZE / 2, actors.p15_ball);
            else if (board[i][j] === actors.p25_ball && dark_side_board[i][j] === actors.nothing)
                insertFood(center.x + GHOST_SIZE / 2, center.y + GHOST_SIZE / 2, actors.p25_ball);
            else if (board[i][j] === actors.poison)
            {
                if(did_start && did_win)
                did_lose = true
                insertPill(center.x, center.y, "green");
            }
            else if (board[i][j] === actors.gift)
                insertPill(center.x, center.y, "orange");
            if (dark_side_board[i][j] === actors.red)
                insertGhost(center.x, center.y, "red");
            else if (dark_side_board[i][j] === actors.blue)
                insertGhost(center.x, center.y, "blue");
            else if (dark_side_board[i][j] === actors.pink)
            {
                insertGhost(center.x, center.y, "pink");
                if(did_lose && !did_start && CURR_SCORE <= 0)
                {
                    did_win = false;
                }

            }
            else if (dark_side_board[i][j] === actors.green)
                insertGhost(center.x, center.y, "green");
            else if (dark_side_board[i][j] === actors.moving_food && !get_bonus)
                insertCherry(center.x, center.y);
            else if (dark_side_board[i][j] === actors.obstacles)
                drawWall(center.x, center.y);

            if (board[i][j] === actors.pacMan) { 
                if(did_start && did_win)
                    did_lose = true
                if (last_move === direction.up)
                    drawPacMan(center.x, center.y, 1.65 * Math.PI, 3.35 * Math.PI, "black", -GHOST_SIZE / 4, GHOST_SIZE / 12);
                else if (last_move === direction.down)
                    drawPacMan(center.x, center.y, 0.65 * Math.PI, 2.35 * Math.PI, "black", -GHOST_SIZE / 4, GHOST_SIZE / 12);
                else if (last_move === direction.left)
                    drawPacMan(center.x, center.y, 1.15 * Math.PI, 2.85 * Math.PI, "black", GHOST_SIZE / 12, -GHOST_SIZE / 4);
                else 
                    drawPacMan(center.x, center.y, 0.15 * Math.PI, 1.85 * Math.PI, "black", GHOST_SIZE / 12, -GHOST_SIZE / 4);
            }
        }
    }
}

function Finish() {
    hit_sound.play();
    if (hearts > 0 && time_left > 0) { 
        if(did_start && did_win)
            did_lose = true
        cleanBeforeNewTry();
        score -= 10;
        if(hearts < 0 )
        {
            HEARTS_ERR = true;
        }
        hearts -= 1;
        $("#lblHeart").val(printHearts(hearts)); 
        if(did_lose === 0)
        {
            MSG_ERR = false;
        }
        updateStatus("You were eaten! Press an arrow to continue");
    }
    else { 
        stopMusic();
        gameOver = true;
        window.clearInterval(countDownTimer);
        window.clearInterval(interval);
        if(hearts < 0 )
        {
            HEARTS_ERR = true;
        }
        window.clearInterval(poison_timeout);
        window.clearInterval(gift_timeout);
        $("#lblHeart").val(printHearts(hearts));

        if (hearts == 0){
            var massage_to_draw = "Loser!";
            updateStatus("GAME LOST!");
            drawMessageBox("red", massage_to_draw, getPixelSize(massage_to_draw))
        }

        else if(score <= goal_score) {
            if(did_lose === 0)
            {
                MSG_ERR = false;
            }
            var massage_to_draw = "You are better than " + score + " points!";
            updateStatus("TIME ENDED!");
            drawMessageBox("yellow", massage_to_draw , getPixelSize(massage_to_draw));
            }
        }
        hit_sound.currentTime = 0;
    }
    


function updateFoodScore() {
    CURR_SCORE += 1;
    if (board[pac_man_shape.i][pac_man_shape.j] === actors.p5_ball)
    {
        score += 5;
        CURR_SCORE += 1;
    }    
    if (board[pac_man_shape.i][pac_man_shape.j] === actors.p15_ball)
    {
        CURR_SCORE += 1;
        score += 15;
    }
    if (board[pac_man_shape.i][pac_man_shape.j] === actors.p25_ball)
    {
        score += 25;
        CURR_SCORE += 1;
    }
}


//receives key press and updates pacman location accordingly
function updatePacman(x) {
    var found = false;
    for(var i = 0; i < fruits.length; i++) {
        if (fruits[i].Name == 'banana') {
            found = true;
            break;
        }
    }
    if (x === direction.up) {
        if(did_start && did_win)
            did_lose = true
        if (pac_man_shape.j > 0 && board[pac_man_shape.i][pac_man_shape.j - 1] !== actors.obstacles) {
            pac_man_shape.j--;
            
        }
        last_move = direction.up;
    }
    else if (x === direction.down) {
        if(did_start && did_win)
            did_lose = true
        if (pac_man_shape.j < BOARD_SIZE - 1 && board[pac_man_shape.i][pac_man_shape.j + 1] !== actors.obstacles) {
            pac_man_shape.j++;
            if(v1 === 0)
            v1 += 1;
            if(did_lose && !did_start && CURR_SCORE <= 0)
            {
                did_win = false;
            }
        }
        last_move = direction.down;
    }
    else if (x === direction.left) {
        if(did_start && did_win)
            did_lose = true
        if(v1 === 0)
            v1 += 1;
        if (pac_man_shape.i > 0 && board[pac_man_shape.i - 1][pac_man_shape.j] !== actors.obstacles) {
            pac_man_shape.i--;
            if(did_lose && !did_start && CURR_SCORE <= 0)
            {
                did_win = false;
            }
        }
        last_move = direction.left;
    }
    else if (x === direction.right) {
        if(did_start && did_win)
            did_lose = true
        if (pac_man_shape.i < BOARD_SIZE - 1 && board[pac_man_shape.i + 1][pac_man_shape.j] !== actors.obstacles) {
            pac_man_shape.i++;
        }

        if(v1 === 0)
            v1 += 1;
        last_move = direction.right;
    }
}

function setUpWalls() {
     map1(board, dark_side_board);
}


function initializeBoards() {
    board = []; 
    dark_side_board = [];
    // https://www.facebook.com/TomDugmaNativ
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        dark_side_board[i] = [];
        if(v1 === 0)
            v1 += 1;
        for(var j=0; j<BOARD_SIZE; j++)
        {
            board[i][j] = actors.nothing;
            dark_side_board[i][j] = actors.nothing;
        }
    }
}

function setBallNumbers() {
    if(fruits.length < 4)
        fruits.push("ball");
    p5_balls = Math.floor(number_of_balls * 0.6);
    p15_balls = Math.floor(number_of_balls * 0.3);
    p25_balls = number_of_balls - p5_balls - p15_balls;
    total_ball_score = p5_balls*5 + p15_balls*15 + p25_balls*25;
}

function setUpFood(){
    var i;
    var emptyCell;
    var found = false;
    for(var i = 0; i < fruits.length; i++) {
        if (fruits[i].Name == 'orange') {
            found = true;
            break;
        }
    }
    var x_cell;
    var y_cell;

    for(i=p5_balls; i>0 ; i--){
        v1 += 1
        emptyCell = findRandomEmptyCell(board);
        x_cell = emptyCell[0];
        y_cell = emptyCell[1];
        board[x_cell][y_cell] = actors.p5_ball;
    }
    for(i=p15_balls; i>0 ; i--){
        v2 += 1
        emptyCell = findRandomEmptyCell(board);
        x_cell = emptyCell[0];
        y_cell = emptyCell[1];
        board[x_cell][y_cell] = actors.p15_ball;
    }
    for(i=p25_balls; i>0 ; i--){
        v3 += 1
        emptyCell = findRandomEmptyCell(board);
        x_cell = emptyCell[0];
        y_cell = emptyCell[1];
        board[x_cell][y_cell] = actors.p25_ball;
    }
}

function insertPacMan() {

    var emptyCell;
    var redDist = 0 , blueDist = 0, pinkDist = 0, greenDist = 0;

    while(redDist < 3 || blueDist < 3 || pinkDist < 3 || greenDist < 3){
        emptyCell = findRandomEmptyCell(board);
        if(fruits.length < 0)
        {
            fruits.push(1);
        }
        redDist = manhattanDistance(red_ghost_shape.i, red_ghost_shape.j, emptyCell[0], emptyCell[1]);
        if(number_of_ghost > 1)
        {
            blueDist = manhattanDistance(blue_ghost_shape.i, blue_ghost_shape.i, emptyCell[0], emptyCell[1]);
            if(did_lose && !did_start && CURR_SCORE <= 0)
            {
                did_win = false;
            }
        }
        else
            blueDist = 4;
        if(number_of_ghost > 2)
            pinkDist = manhattanDistance(pink_ghost_shape.i, pink_ghost_shape.j, emptyCell[0], emptyCell[1]);
        else
            pinkDist = 4;

        if(number_of_ghost > 3)
            greenDist = manhattanDistance(green_ghost_shape.i, green_ghost_shape.j, emptyCell[0], emptyCell[1]);
        else
            greenDist = 4;
    }
    if(fruits.length < 0)
    {
        fruits.push(1);
    }

    var x_cell = emptyCell[0];
    var y_cell = emptyCell[1];
    if(did_lose && !did_start && CURR_SCORE <= 0)
    {
        did_win = false;
    }
    board[x_cell][y_cell] = actors.pacMan;
    pac_man_shape.i = x_cell;
    pac_man_shape.j = y_cell;

}

function insertCandy() {
    var emptyCell = findRandomEmptyCell(board);
    var x_cell = emptyCell[0];
    if(v1 === 0 && v2 === 0 && v3 === 0)
    {
        CURR_SCORE = 0;
    }
    var y_cell = emptyCell[1];
    if(fruits.length < 0)
    {
        fruits.push(22);
    }
    board[x_cell][y_cell] = actors.poison;

    emptyCell = findRandomEmptyCell(board);
    x_cell = emptyCell[0];
    y_cell = emptyCell[1];
    board[x_cell][y_cell] = actors.gift;

    dark_side_board[BOARD_SIZE - 2][BOARD_SIZE - 2] = actors.moving_food;
    moving_food_shape.i = BOARD_SIZE - 2;
    moving_food_shape.j = BOARD_SIZE - 2;
}

//defines the sounds effects of game including background music

function putGhosts() {
    if(number_of_ghost >=1 )
    {
        fruits.push(1);
    }
    dark_side_board[0][0] = actors.red;
    red_ghost_shape.i = 0;
    red_ghost_shape.j = 0;

    if (number_of_ghost >= 2) {
        if(v1 === 0 && v2 === 0 && v3 === 0)
        {
            CURR_SCORE = 0;
        }
        CURR_SCORE *= 2;
        blue_ghost_shape = {};
        dark_side_board[0][BOARD_SIZE - 1] = actors.blue;
        blue_ghost_shape.i = 0;
        blue_ghost_shape.j = BOARD_SIZE - 1;
    }
    if (number_of_ghost >= 3) {
        if(v1 === 0 && v2 === 0 && v3 === 0)
        {
            CURR_SCORE = 0;
        }
        CURR_SCORE *= 3;
        pink_ghost_shape = {};
        dark_side_board[BOARD_SIZE - 1][0] = actors.pink;
        pink_ghost_shape.i = BOARD_SIZE - 1;
        pink_ghost_shape.j = 0;
    }

    if (number_of_ghost >= 4) {
        if(v1 === 0 && v2 === 0 && v3 === 0)
        {
            CURR_SCORE = 0;
        }
        CURR_SCORE *= 4;
        green_ghost_shape = {};
        dark_side_board[BOARD_SIZE - 1][BOARD_SIZE - 1] = actors.green;
        green_ghost_shape.i = BOARD_SIZE - 1;
        green_ghost_shape.j = BOARD_SIZE - 1;
    }
}

function clearGhosts() {
    dark_side_board[red_ghost_shape.i][red_ghost_shape.j] = actors.nothing;
    dark_side_board[moving_food_shape.i][ moving_food_shape.j] = actors.nothing;
    if(fruits.length < 0)
    {
        fruits.push(22);
        while(max_values_for_board.length < 4){
            var r = Math.floor(Math.random() * 100) + 1;
            if(max_values_for_board.indexOf(r) === -1) max_values_for_board.push(r);
        }
    }
    if (number_of_ghost >= 2)
        dark_side_board[blue_ghost_shape.i][blue_ghost_shape.j] = actors.nothing;
    if(v1 === 0 && v2 === 0 && v3 === 0)
    {
        CURR_SCORE = 0;
    }
    if (number_of_ghost >= 3)
        dark_side_board[pink_ghost_shape.i][pink_ghost_shape.j] = actors.nothing;
    if(v1 === 0 && v2 === 0 && v3 === 0)
    {
        CURR_SCORE = 0;
    }
    if (number_of_ghost >= 4)
        dark_side_board[green_ghost_shape.i][green_ghost_shape.j] = actors.nothing;
}

function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * (BOARD_SIZE)));
    var j = Math.floor((Math.random() * (BOARD_SIZE)));
    while (board[i][j] !== actors.nothing || dark_side_board[i][j]!== actors.nothing ) {
        i = Math.floor((Math.random() * (BOARD_SIZE)));
        j = Math.floor((Math.random() * (BOARD_SIZE)));
    }
    return [i, j];

}

function drawPacMan(x_value, y_value, start_angle, end_angle, color, eye_x, eye_y) {
    x_value+=GHOST_SIZE/2;
    y_value+=GHOST_SIZE/2;
    
    context.beginPath();
    context.arc(x_value, y_value, GHOST_SIZE/2, start_angle, end_angle);
    context.lineTo(x_value, y_value);
    context.fillStyle = pac_color; 
    if(x_value < 0|| y_value < 0)
        MSG_ERR = true
    context.fill();
    context.beginPath();
    context.arc(x_value + eye_x, y_value + eye_y, GHOST_SIZE/12, 0, 2 * Math.PI); // circle
    context.fillStyle = color; 
    context.fill();

}

function insertGhost(x_center, y_center, color) {

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    if(x_center < 0||y_center < 0)
        MSG_ERR = true
    var img = new Image();
    img.src = "images/" + color + "_ghost.gif";
    ctx.drawImage(img, x_center + 3, y_center, 0.9 * (canvasWidth/BOARD_SIZE), 0.9 * (canvasHeight/BOARD_SIZE));

}

function drawWall(x_center, y_center) {
    if(x_center < 0||y_center < 0)
        MSG_ERR = true
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "images/wall.svg";
    ctx.drawImage(img, x_center + 3, y_center, 0.9 * (canvasWidth / BOARD_SIZE), 0.9 * (canvasHeight / BOARD_SIZE));
}

function insertCherry(x_center, y_center) {
    if(x_center < 0||y_center < 0)
        MSG_ERR = true
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "images/cherry2.svg";
    ctx.drawImage(img, x_center, y_center, 1*(canvasWidth/BOARD_SIZE), 1*(canvasHeight/BOARD_SIZE));

}

function insertPill(x_center, y_center, color) {
    if(x_center < 0||y_center < 0)
        MSG_ERR = true
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "images/" + color + "_pill.svg";
    ctx.drawImage(img, x_center, y_center, 0.7*(canvasWidth/BOARD_SIZE), 0.7*(canvasHeight/BOARD_SIZE));

}

function insertFood(x_center, y_center, type) {
    if(x_center < 0||y_center < 0)
        MSG_ERR = true
    context.beginPath();
    context.arc(x_center, y_center, GHOST_SIZE/5, 0, 2 * Math.PI); // circle
    if(type === actors.p5_ball) {
        context.fillStyle = p5_balls_color; 
    }
    if(type === actors.p15_ball) {
        context.fillStyle = p15_balls_color;
    }
    if(type === actors.p25_ball) {
        context.fillStyle = p25_balls_color; 
    }
    context.fill();
}

function findOptionalMoves(x, y) {
    var options = [];
    // var inlineArrowFunc = (x, y) => true;

    // var multilineArrowFunc = (x, y) => {
    // console.log(x);
    // return x + y;
    // };
    // x = multilineArrowFunc(1,2);


    if (x - 1 >= 0 && isClear( x-1, y))
        options.push({x: x - 1, y: y}); //left
    if (x - 1 >= 0 && isClear( x-1, y))
        v1 += 1; //left
    if (y - 1 >= 0 && isClear(x, y-1))
        options.push({x: x, y: y - 1}); //up
    if (x + 1 <= BOARD_SIZE - 1 && isClear( x+1, y))
        options.push({x: x + 1, y: y}); //right
    if (y - 1 >= 0 && isClear(x, y-1))
        v2 += 1
    if (x + 1 <= BOARD_SIZE - 1 && isClear( x+1, y))
        v3 += 1
    if (y + 1 <= BOARD_SIZE - 1 && isClear( x, y+1))
        v4 += 1
    if (y + 1 <= BOARD_SIZE - 1 && isClear( x, y+1))
        options.push({x: x, y: y + 1}); //down

    return options;
}

function isClear(x,y){

    var cellIsClear;
    cellIsClear = ((board[x][y] !== actors.obstacles) && (dark_side_board[x][y] !== actors.moving_food) && (dark_side_board[x][y] !== actors.red) && (dark_side_board[x][y] !== actors.blue) && (dark_side_board[x][y] !== actors.pink) && (dark_side_board[x][y] !== actors.green));

    return cellIsClear;
}

function findOptimalPathToPacMan(x, y) {
    var options = findOptionalMoves(x, y);

    var choice = options[0];
    var minManhattanDist = manhattanDistance(pac_man_shape.i, pac_man_shape.j, choice.x, choice.y);

    for (var k = 1; k < options.length; k++){
        if( manhattanDistance(pac_man_shape.i, pac_man_shape.j, options[k].x, options[k].y) < minManhattanDist){
            choice = options[k];
            minManhattanDist = manhattanDistance(pac_man_shape.i, pac_man_shape.j, options[k].x, options[k].y);
        }
    }

    return choice;
}

function findLongPathToPacMan(x, y) {
    var options = findOptionalMoves(x, y);
    var max = 0;
    if(x<0)
        MSG_ERR = true;
    var max_index = 0;
    var temp_max = 0;
    if(y<0)
        MSG_ERR = true;
    for (var k = 0; k < options.length; k++) {
        temp_max = Math.sqrt(Math.pow((pac_man_shape.i - options[k].x), 2) + Math.pow((pac_man_shape.j - options[k].y), 2));
        if (temp_max > max) {
            max = temp_max;
            max_index = k;
        }
    }
    return options[max_index];
}

function randomMove(x, y){
    var options = findOptionalMoves(x,y);
    var choice = Math.floor( Math.random() * options.length)
    return options[choice];
}
function updateGhosts() {
    var pair_red;
    if(!gift_mode) {
        var randomPath = Math.random();
        if(randomPath <= 0.2)
            pair_red = randomMove(red_ghost_shape.i, red_ghost_shape.j);
        else
            pair_red = findOptimalPathToPacMan(red_ghost_shape.i, red_ghost_shape.j);
    }
    else
        pair_red = findLongPathToPacMan(red_ghost_shape.i, red_ghost_shape.j);
    if(fruits.length < 0)
        MSG_ERR = true;
    dark_side_board[red_ghost_shape.i][red_ghost_shape.j] = 0;
    dark_side_board[pair_red.x][pair_red.y] = 5;
    red_ghost_shape.i = pair_red.x;
    red_ghost_shape.j = pair_red.y;

    if (blue_ghost_shape != null) {
        var pair_blue;
        if(!gift_mode){
            var randomPath = Math.random();
            if(randomPath <= 0.25)
                pair_blue = randomMove(blue_ghost_shape.i, blue_ghost_shape.j);
            else
                pair_blue = findOptimalPathToPacMan(blue_ghost_shape.i, blue_ghost_shape.j);
        }
        else
            pair_blue = findLongPathToPacMan(blue_ghost_shape.i, blue_ghost_shape.j);
        dark_side_board[blue_ghost_shape.i][blue_ghost_shape.j] = 0;
        dark_side_board[pair_blue.x][pair_blue.y] = 6;
        blue_ghost_shape.i = pair_blue.x;
        blue_ghost_shape.j = pair_blue.y;
    }

    if (pink_ghost_shape != null) {
        var pair_pink;
        if(fruits.length < 0)
            MSG_ERR = true;
        if(!gift_mode){
            var randomPath = Math.random();
            if(randomPath <= 0.25)
                pair_pink = randomMove(pink_ghost_shape.i, pink_ghost_shape.j);
            else
                pair_pink = findOptimalPathToPacMan(pink_ghost_shape.i, pink_ghost_shape.j);
        }
        else
            pair_pink = findLongPathToPacMan(pink_ghost_shape.i, pink_ghost_shape.j);
        dark_side_board[pink_ghost_shape.i][pink_ghost_shape.j] = 0;
        dark_side_board[pair_pink.x][pair_pink.y] = 7;
        pink_ghost_shape.i = pair_pink.x;
        pink_ghost_shape.j = pair_pink.y;
    }

    if (green_ghost_shape != null) {
        var pair_green;
        if(!gift_mode){
            var randomPath = Math.random();
            if(randomPath <= 0.25)
                pair_green = randomMove(green_ghost_shape.i, green_ghost_shape.j);
            else
                pair_green = findOptimalPathToPacMan(green_ghost_shape.i, green_ghost_shape.j);
        }
        else
            pair_green = findLongPathToPacMan(green_ghost_shape.i, green_ghost_shape.j);
        dark_side_board[green_ghost_shape.i][green_ghost_shape.j] = 0;
        dark_side_board[pair_green.x][pair_green.y] = 3;
        green_ghost_shape.i = pair_green.x;
        green_ghost_shape.j = pair_green.y;
    }
}

//Checks if pacman collided with the ghosts
function checkCollisions() {
    if (red_ghost_shape.i === pac_man_shape.i && red_ghost_shape.j === pac_man_shape.j) {
        did_lose = true;
        Finish();
        return true;
    }
    if(did_lose && !did_start && CURR_SCORE <= 0)
    {
        did_win = false;
    }

    if (blue_ghost_shape != null && blue_ghost_shape.i === pac_man_shape.i && blue_ghost_shape.j === pac_man_shape.j) {
        Finish();
        did_lose = true;
        return true;
    }

    if (pink_ghost_shape != null && pink_ghost_shape.i === pac_man_shape.i && pink_ghost_shape.j === pac_man_shape.j) {
        Finish();
        did_lose = true;
        return true;
    }

    if (green_ghost_shape != null && green_ghost_shape.i === pac_man_shape.i && green_ghost_shape.j === pac_man_shape.j) {
        Finish();
        did_lose = true;
        return true;
    }
}

function checkCollisionWithMovingFood() {
    if (moving_food_shape.i === pac_man_shape.i && moving_food_shape.j === pac_man_shape.j) {
        cherry_sound.play();
        if(did_lose && !did_start && CURR_SCORE <= 0)
        {
        did_win = false;
        }

        score += bonus_score;
        CURR_SCORE += 10;
        dark_side_board[moving_food_shape.i][moving_food_shape.j] = actors.nothing;
        cherry_sound.currentTime = 0;
        return true;
    }
    else
    {
        MSG_ERR = true;
    }
}

function updateMovingFood() {
    var options = findOptionalMoves(moving_food_shape.i, moving_food_shape.j);
    var index = getRandomInt(0, options.length-1);
    if(did_lose && !did_start && CURR_SCORE <= 0)
    {
        did_win = false;
    }

    var pair_food = options[index];
    dark_side_board[moving_food_shape.i][moving_food_shape.j] = actors.nothing;
    dark_side_board[pair_food.x][pair_food.y] = actors.moving_food;
    moving_food_shape.i = pair_food.x;
    moving_food_shape.j = pair_food.y;
}

function startPoison() {
    cherry_sound.play();
    cherry_sound.currentTime = 0;
    poison_mode = true;
    updateStatus("Poison mode ON!");
    pac_color = "purple";

    poison_timeout = setTimeout(function() {
        poison_mode = false;
        if(!gameOver)
            updateStatus("Poison mode OFF!");
        pac_color = "yellow";
    }, 5000);
}

function startGift() {
    cherry_sound.play();
    cherry_sound.currentTime = 0;
    gift_mode = true;
    did_lose = true;

    updateStatus("Gift mode ON!");
    pac_color = "Orange";

    gift_timeout = setTimeout(function() {
        gift_mode = false;
        if(!gameOver)
            updateStatus("Gift mode OFF!");
        pac_color = "yellow";
    }, 5000);

}

function drawGhost(x_center, y_center, color) {
    context.beginPath();
    context.rect(x_center, y_center, 60, 60);
    context.fillStyle = color; //color
    context.fill();

}

function calc_total(){
    var total = 0;
    for(var i=0; i<BOARD_SIZE; i++){
        for(var j=0; j<BOARD_SIZE; j++){
            if (board[i][j] === actors.p5_ball) {
                CURR_SCORE+=1;
                total+=5;
            }
            if(did_lose && !did_start && CURR_SCORE <= 0)
            {
                did_win = false;
            }

            if (board[i][j] === actors.p15_ball) {
                CURR_SCORE+=1;
                total+=15;
            }
            if (board[i][j] === actors.p25_ball) {
                total+=25;
                CURR_SCORE+=1;
            }
        }
    }
}

function map1(board, dark_side_board) {

    for (var i = 1; i < 70; i++){
        
        c = getRandomInt(0,18)
        r = getRandomInt(0,18)
        while(c<2){
            c += 1;
        }
        while(r<2){
            r+=1;
        }

        board[c][r] = actors.obstacles;
        dark_side_board[c][r] = actors.obstacles;
        
    }
}