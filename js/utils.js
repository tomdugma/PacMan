function updateStatus(message){
    $('#game_status').empty();
    $('#game_status').html(message);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function manhattanDistance(x1, y1, x2, y2){
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}

function getKeyPressed() {
    if (keysDown[upKey])
        if(poison_mode)
            return 2;
        else {
            return 1;
        }
    if (keysDown[downKey])
        if(poison_mode)
            return 1;
        else {
            return 2;
        }
    if (keysDown[leftKey])
        if(poison_mode)
            return 4;
        else {
            return 3;
        }
    if (keysDown[rightKey])
        if(poison_mode)
            return 3;
        else {
            return 4;

        }
    return 0; // if the user didn't press any key

}

function stopMusic() {
    if (null !== bg_music) {
    bg_music.pause();
    bg_music.currentTime = 0;
    }
}

function setMusic() {
    bg_music = document.createElement('audio');
    bg_music.setAttribute('src', bg_music_path);
    bg_music_duration = bg_music.duration;
    bg_music.volume = 0.2;

    hit_sound = document.createElement('audio');
    hit_sound.setAttribute('src', hit_sound_path);

    cherry_sound = document.createElement('audio');
    cherry_sound.setAttribute('src', cherry_sound_path);

    win_sound = document.createElement('audio');
    win_sound.setAttribute('src', win_sound_path);

    bg_music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

function countDown() {
    time_left--;
    lblTime.value = printTime(time_left); //here we update the lable time
    if(time_left <= 0)
    {
        Finish()
    }
}

function drawMessageBox(color, message, font_size) {
    if(message.length <= 0)
    {
        window.alert("messege length is invalid");
    }
        
    context.beginPath();
    board_width = document.getElementById("canvas").width;
    board_height = document.getElementById("canvas").height;
    context.rect(0, board_height/4, board_width, board_height*0.5);
    context.fillStyle = color; //color
    context.fill();


    context.font = font_size + " 'Press Start 2P'";
    context.fillStyle = "black"; //color
    context.fillText(message, board_width/5, board_height/2);
}

function stringsAreSimilar(stringA, stringB) {//BS
    var difference = getStringDifference(stringA, stringB);
    debugConsoleLog("stringA" + stringA);
    debugConsoleLog("stringB" + stringB);
    debugConsoleLog("difference" + difference);
    
    return difference < 10;
  }

  function getStringDifference(stringA, stringB) { //BS
    var cost = [],
      str1 = stringA,
      str2 = stringB,
      n = str1.length,
      m = str2.length,
      i, j;
  
    var minimum = function (a, b, c) {
      var min = a;
      if (b < min) {
        min = b;
      }
      if (c < min) {
        min = c;
      }
      return min;
    };
  
    if (n == 0) {
      return;
    }
    if (m == 0) {
      return;
    }
  
    for (var i = 0; i <= n; i++) {
      cost[i] = [];
    }
  
    for (i = 0; i <= n; i++) {
      cost[i][0] = i;
    }

    for (j = 0; j <= m; j++) {
      cost[0][j] = j;
    }

    for (i = 1; i <= n; i++) {
      var x = str1.charAt(i - 1);
      for (j = 1; j <= m; j++) {
        var y = str2.charAt(j - 1);
        if (x == y) {
          cost[i][j] = cost[i - 1][j - 1];  
        } 
        else {
          cost[i][j] = 1 + minimum(cost[i - 1][j - 1], cost[i][j - 1], cost[i - 1][j]);
        }
      } //endfor
    } //endfor
  
    return cost[n][m];
  }

  function shuffle(array) { //BS
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}


function inArray(needle,haystack)
{
    var count=haystack.length;
    for(var i=0;i<count;i++)
    {
        if(haystack[i]===needle){return true;}
    }
    return false;
}
function rescale(height, width){
    return height / width
}