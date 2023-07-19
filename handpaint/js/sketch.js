// hr: Hand Results
let hr;
let shapes = [];
let img;



// ゲームの状態を表す定数
const GAME_STATE_TITLE = 0;
const GAME_STATE_PLAYING = 1;
//const GAME_STATE_GAMEOVER = 2;

// 自機の位置とサイズ
//let playerX, playerY;
//const playerSize = 40;

// ミサイルの位置とサイズ
//let missileX, missileY;
//const missileSize = 10;
//let missileSpeed = 5;
//let missileActive = false;

// 敵機の位置とサイズ
//let enemyX, enemyY;
//const enemySize = 40;
//let enemySpeed = 2;

// ゲームのスコアと制限時間
//let score = 0;
//const gameTime = 60;
//let timer;

// ゲームの状態
let gameState = GAME_STATE_TITLE;

//let sound_bakuhatsu;
//let sound_missile;
//let sound_end_bakuhatsu;
//let bgm_title;
//let bgm_playing;
//let bgm_end;
//function preload() {
  //sound_bakuhatsu = loadSound('./sound/8bit爆発2.mp3');
 // sound_missile = loadSound('./sound/8bitショット1.mp3');
  //sound_end_bakuhatsu = loadSound('./sound/8bit爆発1.mp3');
 // bgm_title = loadSound('./sound/Shooting_02.mp3');
  //bgm_playing = loadSound('./sound/Shooting_01.mp3');
  //bgm_end = loadSound('./sound/Shooting_05.mp3');
//}

function preload(){
  img = loadImage('./image/hand.jpg');
}
function setup() {
  // 画像を読み込む
  

  //sound_bakuhatsu.setVolume(0.3);
  //sound_missile.setVolume(0.3);
  //sound_end_bakuhatsu.setVolume(0.5);
  //bgm_title.setVolume(0.5);
  //bgm_playing.setVolume(0.5);
  //bgm_end.setVolume(0.5);


  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
  // お手々が見つからない場合はresultsはundefinedになる．
  gotHands = function (results) {
    // hr: Hand Results
    hr = results;
    if (hr.gestures.length > 0) {
      let gesture = hr.gestures[0][0];
      let score = gesture.score;
      let name = gesture.categoryName;
      console.log(name, score);
    }
  }
}

function draw() {
  // 描画処理
  clear();
  noStroke();

  // 各頂点座標を表示する
  // 各頂点座標の位置と番号の対応は以下のURLを確認
  // https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
  if (hr && hr.landmarks) {
    for (const landmarks of hr.landmarks) {
      for (let landmark of landmarks) {
        noStroke();
        fill(100, 150, 210);
        circle(landmark.x * width, landmark.y * height, 10);
      }
    }
  }

  if (gameState === GAME_STATE_TITLE) {
    drawTitleScreen();
  } else if (gameState === GAME_STATE_PLAYING) {
    drawGame();
  }

  // キャンバスに枠をつける
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(0, 0, width, height);
}

function drawTitleScreen() {
  
  /*fill(0);
  textAlign(CENTER);
  textSize(30);
  text("ジェスチャーアート", width / 2, height / 2);
  textSize(20);
  text("Press Space to Start", width / 2, height / 2 + 40);*/
  image(img,0,0,width,height);
}

function drawGame() {
  // 四角を描画するためのコードを追加してください
  // ジェスチャーの座標やジェスチャーの名前を利用して四角を描画します
  // 四角の位置や色、サイズを自由に設定してください
  if (hr && hr.landmarks) {
    for (const landmarks of hr.landmarks) {
      let gesture = hr.gestures[0][0];
      let score = gesture.score;
      let name = gesture.categoryName;

      // グーの処理
      let landmark = landmarks[12];
      if (name === 'left') {
        // ジェスチャーに応じた処理を追加
        let shapeColor = color(random(255), random(255), random(255), random(100));
        let shapeSize = 30;
        let shapeX = landmark.x * width;
        console.log(landmark.x);
        let shapeY = landmark.y * height;
        fill(shapeColor);
        let shape = { x: shapeX, y: shapeY, size: shapeSize, color: shapeColor, type: 'circle' };
        shapes.push(shape);
      }

      // それ以外
      for (let landmark of landmarks) {
        console.log(name, score);
  
        if (name === 'shoot') {
          // ジェスチャーが "shoot" の場合、四角を描画
          let shapeColor = color(random(255), random(255), random(255), random(50));
          let shapeSize = 30;
          let shapeX = landmark.x * width - shapeSize / 2;
          let shapeY = landmark.y * height - shapeSize / 2;
          fill(shapeColor);
          let shape = { x: shapeX, y: shapeY, size: shapeSize, color: shapeColor, type: 'rectangle' };
          shapes.push(shape);
        } else if (name === 'up') {
          // ジェスチャーが "down" の場合、円を描画
          let shapeColor = color(random(255), random(255), random(255), random(100));
          let shapeSize = 10;
          let shapeX = landmark.x * width;
          let shapeY = landmark.y * height;
          fill(shapeColor);
          let shape = { x: shapeX, y: shapeY, size: shapeSize, color: shapeColor, type: 'circle' };
          shapes.push(shape);
        }
        
        
      } 
    }
  }
  
  for (let shape of shapes) {
    fill(shape.color);
    if (shape.type === 'rectangle') {
      rect(shape.x, shape.y, shape.size, shape.size);
    } else if (shape.type === 'circle') {
      circle(shape.x, shape.y, shape.size);
    }else if (shape.type === 'line') {
      stroke(shape.color);
      strokeWeight(shape.thickness);
      line(shape.startX, shape.startY, shape.endX, shape.endY);}
  }
}


/*function keyPressed() {
  if (keyCode === 32) {
    startGame();
  }
}
function keyPressed() {
  //if (keyCode === 32) {
    if (gameState === GAME_STATE_PLAYING) {
      shapes = []; // 四角形を削除
    } else if (gameState === GAME_STATE_TITLE) {
      startGame();
    }
  }
}*/


function startGame() {
  if (gameState === GAME_STATE_PLAYING) {
    // ゲームリセットの処理を行う
    resetGame();
  } else {
    // ゲーム開始の処理を行う
    gameState = GAME_STATE_PLAYING;
    
  }
}

function resetGame() {
  shapes = []; // 四角形を削除
  // タイトル画面に戻る処理やリセット処理を行う場合はここに記述する
}

function titleGame() {
  gameState = GAME_STATE_TITLE;
  // タイトル画面に戻る処理やリセット処理を行う場合はここに記述する
}


function share() {
  let element = document.getElementById('canvas');
  html2canvas(element).then(canvas => {
      canvas.toBlob(function (blob) {
          let file = new File([blob], "image.png", {
              type: "image/png",
          });
          const filesArray = [file];

          if (navigator.share) {
              navigator.share({
                  // title: 'Hiddenmickey',
                  // text: '#hiddenmickey',
                  files: filesArray
              })
                  .then(() => console.log('Share was successful.'))
                  .catch((error) => console.log('Sharing failed', error));
          } else {
              alert(`Your system doesn't support sharing files.`);
          }
      });
  });
}


function windowResized(){
  adjustCanvas();
}

function adjustCanvas(){
  // var element_webcam=document.getElementById
  resizeCanvas(windowWidth, windowWidth);

}







