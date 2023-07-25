// hr: Hand Results
let hr;
let shapes = [];
let img;
let currentImage = 1; 
// ゲームの状態を表す定数
const GAME_STATE_TITLE = 0;
const GAME_STATE_PLAYING = 1;

// ゲームの状態
let gameState = GAME_STATE_TITLE;



function preload(){
  img1 = loadImage('./image/1.jpg');
  img2 = loadImage('./image/2.jpg');
  img3 = loadImage('./image/3.jpg');
}
function setup() {
  // 画像を読み込む
  

  

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
  strokeWeight(1);
  rect(0, 0, width, height);
}

function drawTitleScreen() {
  if (currentImage === 1) {
    image(img1, 0, 0, width, height);
  } else if (currentImage === 2) {
    image(img2, 0, 0, width, height);
  } else if (currentImage === 3) {
    image(img3, 0, 0, width, height);
  }
}
function mouseClicked() {
  // Increment the currentImage counter when the mouse is clicked
  currentImage++;
  
  // If the counter exceeds 3, reset it to 1 to loop back to the first image
  if (currentImage > 3) {
    currentImage = 1;
  }
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