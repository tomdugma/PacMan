let users = [];
let user_login = false;
let active_user = null;

  function afterRegister(){
	$('#register').hide();
	$('#register_form').hide();
	$('#login').show();
}

function failed_play(){
	var r = confirm("Please login")
	if (r == false){
		window.alert("You need to login to play or Register if you dont have a user")
	}
	hideAll();
	$('#login').show();
}

function logOut(){
	user_login = false;
	active_user = "";
	afterLogout();
	stopMusic();
	cleanBeforeNewGame();
	hearts = 2; //actually 3
	gameOver = false;
	clearInterval(countDownTimer);
	time_left = max_game_time;
	$('#container_pre_game').show;
	$('#container_game').hide;
	$("#welcome_text").text("Please login if you already have an account. If you don't, what are you waiting for?\nGo\nregister!");
	$('#welcome').show();
	$('#nav_login').text('Login')
  }

  function afterLogout(){
	$('#welcome').show();
	$('#game').hide();
	$('#login').hide();
	$('#register').hide();
	$('#game_user').hide();
	// noinspection JSUnresolvedFunction
	  $('#alredy_login').hide();
	$('#register_user').show();
	$('#login_user').show();
	// noinspection JSUnresolvedFunction
	  $('#logout_user').hide();
	$('#btn_login').show();
	$('#btn_register').show();
	$('#btn_play').hide();
}

$("#register_form").click(function() {

	let valid = true;
	let firstName = "";
	let lastName = "";
	let username = "";
	var password = "";
	let email = "";
	let birthday = "";
	message = "<br/>";
	$("#alert_details").empty();
	$("#alert_register").hide();
	if( !validName($('#firstName').val(), "first")) //First name
	{
		valid = false;
		message += "Please enter your First name<br/>";
	}
	else{
		firstName = $('#firstName').val();
	}

	if(!validName($('#lastName').val(), "last")) //Last name
	{
		valid = false;
		message += "Please enter your Last name<br/>";
	}
	else
		{ // noinspection JSUnresolvedFunction
			lastName = $('#lastName').val();
		}

	if($('#username').val() === '') //User name
	{
		valid = false;
		message += "Username not valid <br \>";
	}
	else { // noinspection JSUnresolvedFunction
		if(userExists($('#username').val()) ){
				valid = false;
				message += "Username already taken. Please choose a new username. <br/>"
			}
			else
				username = $('#username').val();
	}

	if( !passValid($('#pass').val())){
		valid = false;
	}
	else
		password = $('#pass').val();

	if( !validEmail($('#email').val()) )
	{
		valid = false;
		message += "Email not valid <br \>";
	}
	else
		email = $('#email').val();

	if($('#datepicker').val() === '')
	{
		valid = false;
		message += "Date not valid <br \>";
	}
	else
		birthday = $('#datepicker').val();

	if (!valid) 
	{
		$( "#alert_details" ).empty();
		$( "#alert_details" ).html(message);
		$( "#alert_register" ).show();
	}
	else
	{
		var person = {firstName, lastName, username, password, email, birthday};
		users.push(person);
		afterRegister();
	}
});

function userExists(userName) {

	for (var i=0; i < users.length; i++) {
		if(users[i].username === userName)
		return true
	}
	return false;
}


function validName(name, position) {
	if (name === "") {
	return false;
	} else {
	for (let i = 0; i < name.length; i++) {
		if (!name.charAt(i).match(/[a-z]/i)) {
		message += "Your " + position + " name may only contain letters<br/>";
		return false;
		}
	}
	}
	return true;
}

function passValid(pass) {
	let containsNumber = false;
	let containsAlpha = false;
	if (pass.length < 8) {
	message += "Password not valid, must contain at least 8 characters <br >";
	return false;
	}
	for (let i = 0; i < pass.length; i++) {
	if (pass.charAt(i) >= "0" && pass.charAt(i) <= "9") containsNumber = true;
	else if (pass.charAt(i).match(/[a-z]/i)) {
		containsAlpha = true;
	} else {
		message += "Password may only contain alpha-numeric characters. <br>";
		return false;
	}
	}
	if (!(containsAlpha && containsNumber))
	message +=
		"Password not valid, must contain numbers AND characters <br >";
	return containsAlpha && containsNumber;
}

function validEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(re);
}

$("#sign_in").click(function () {
	let valid = true;
	let username = "";
	let password = "";
	let message = "";
	$("#alert_details_login").empty();
	$("#alert_login").hide();

	if ($("#login_username").val() == "") {
	valid = false;
	message += "Username not valid <br >";
	} else username = $("#login_username").val();

	if ($("#login_password").val() == "") {
	valid = false;
	message += "Password not valid <br >";
	} else password = $("#login_password").val();

	let user = "";
	for (let i = 0; i < users.length; i++) {
	if (users[i].username === username)
		if (users[i].password === password) {
		user = users[i];
		valid = true;
		break;
		}
	}

	if (!valid || user === "") {
	$("#alert_details_login").empty();
	$("#alert_details_login").html(message);
	$("#alert_details_login").show();
	$("#alert_login").show();
	message="";

	} else {
	user_login = true;
	active_user = user;
	$("#login").hide();
	$('#game').show();
	$("#container_pre_game").show();
	$("#container_game").hide();
	$("#ball_numm").val("50");
	$("#ghost_num").val("3");
	$("#game_time").val("60");
	$("#level_check").val("6");
		$("#btn_login").hide();
		$("#btn_register").hide();
	$("#player_name").empty();
	const user_fullname = active_user.firstName + " " + active_user.lastName;
	$("#player_name").html(user_fullname);
	$('#nav_login').text('Logout')
	$("#btn_play").hide();
	$("#welcome_text").text("You may play now!");
	}
});


