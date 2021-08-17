$("#random_sets").click(function () {

    number_of_balls = getRandomInt(50,90);
    $("#ball_numm").val(number_of_balls);

    max_game_time = getRandomInt(60,800);
    $("#game_time").val(max_game_time);

    number_of_ghost = getRandomInt(1,4);
    $("#ghost_num").val(number_of_ghost);

    level = getRandomInt(1,10);
    $("#level_check").val(level);

});

$("#finish_pref").click(function () {

    var temp_ball_num = $('#ball_numm').val();
    if (temp_ball_num >= 50 && temp_ball_num <= 90)
        number_of_balls = temp_ball_num;
    else
        number_of_balls = 50;

    var temp_game_time = $('#game_time').val();
    
    
    if (temp_game_time >= 6 )
        if( temp_game_time <= 800)
        {
            did_lose -= 1;
            max_game_time = temp_game_time;
        }
    else
        max_game_time = 60;

    var temp_ghost_num = $('#ghost_num').val();
    if (temp_ghost_num >= 1 && temp_ghost_num <= 4)
        number_of_ghost = temp_ghost_num;
    else
        number_of_ghost = 4;

    var temp_level = $('#level_check').val();
    if (temp_level >= 1 && temp_level <= 10)
        level = temp_level;
    else
        level = 6;

    p5_balls_color = $("#5point_color").val();
    $("#p5_ball_lbl").css("color",p5_balls_color);
    p15_balls_color = $("#15point_color").val();
    $("#p15_ball_lbl").css("color",p15_balls_color);
    p25_balls_color = $("#25point_color").val();
    $("#p25_ball_lbl").css("color",p25_balls_color);

    $("#container_pre_game").hide();
    $("#container_game").show();
    cleanBeforeNewGame();
    Start();
});

$("#down_key").on("keydown", function (e) {
    downKey = e.which
    $("#down_key").val(e.key)
});

$("#up_key").on("keydown", function (e) {
upKey = e.which
$("#up_key").val(e.key)
});

$("#left_key").on("keydown", function (e) {
leftKey = e.which
$("#left_key").val(e.key)
});

$("#right_key").on("keydown", function (e) {
rightKey = e.which
$("#right_key").val(e.key)
});

function cleanBeforeNewGame() {
    window.clearInterval(interval);
    cold_start = true;
    get_bonus = false;
    poison_mode = false;
    clearTimeout(poison_timeout);
    gift_mode = false;
    clearTimeout(gift_timeout);
    pac_color = "yellow";
    gameOver = false;
    blue_ghost_shape = null;
    pink_ghost_shape = null;
    green_ghost_shape = null;
}

function cleanBeforeNewTry() {
    cold_start = true;
    gameOver = false;
    poison_mode = false;
    clearTimeout(poison_timeout);
    gift_mode = false;
    clearTimeout(gift_timeout);
    pac_color = "yellow";
    clearGhosts();
    putGhosts();
    board[pac_man_shape.i][pac_man_shape.j] = actors.nothing;
    insertPacMan();
    window.clearInterval(countDownTimer);
}

$( "#re_game" ).click(function() {
    hideAll();
    $('#game').show();
    $("#container_pre_game").show();
    $("#container_game").hide();
    $("#ball_numm").val("50");
    $("#ghost_num").val("3");
    $("#game_time").val("60");
    $("#level_check").val("6");

    stopMusic();
    window.clearInterval(interval);
    window.clearInterval(countDownTimer);
});