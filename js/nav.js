$("#logo_svg, #navbar_brand").click(function (){
  hideAll();
  $("#welcome").show();
  if (user_login == true){
    $("#btn_play").show();
  }
});

$( "#btn_login, #nav_login" ).click(function() {
  hideAll();
  if (user_login == true){
      logOut();
  }
  else{
  $('#login').show();
  }
});

$( "#btn_register, #nav_register" ).click(function() {
  hideAll();
  // noinspection JSUnresolvedFunction
    $('#register').show();
});

$( "#home_mode" ).click(function() {
  hideAll();
  $('#welcome').show();
  stopMusic();
});

$("#btn_play, #nav_play" ).click(function() {
  if (user_login == true){
      
      hideAll();
      $('#game').show();
      $("#container_pre_game").show();
      $("#container_game").hide();
      $("#ball_numm").val("50");
      $("#ghost_num").val("3");
      $("#game_time").val("60");
      $("#level_check").val("6");
    }
  else{
      failed_play();
    }
});

var about_modal = document.getElementById("about_modal");
var span = document.getElementsByClassName("close")[0];
$("#nav_about").click(function() {
  about_modal.style.display = "block";
});

span.onclick = function() {
  about_modal.style.display = "none";
}

jQuery(document).on('keyup',function(evt) {
  if (evt.keyCode == 27) {
    about_modal.style.display = "none";
  }
});
window.onclick = function(event) {
  if (event.target == about_modal) {
    about_modal.style.display = "none";
  }
}

var site_modal = document.getElementById("site_modal");
$("#footer_site").click(function() {
  site_modal.style.display = "block";
});

$("#btn_site_close").click(function() {
  site_modal.style.display = "none";
});


var contact_modal = document.getElementById("contact_modal");
$("#footer_contact").click(function() {
  contact_modal.style.display = "block";
});

$("#btn_contact_close").click(function() {
  contact_modal.style.display = "none";
});

function hideAll(){
  $('#welcome').hide();
  $('#game').hide();
  $('#login').hide();
  $('#register').hide();
}
