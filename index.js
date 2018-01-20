let dataController = (function() {
  let scores=[0, 0], playScore=5, game = true;

  return {
    getScores: function(player) {
      return scores[player];
    },

    setData: function(player) {
      scores[player] += 1;
    },

    getPlayScore: function() {
      return playScore;
    },

    clearData: function() {
      scores = [0, 0];
      // playScore = 5;
      game = true;
    },

    setPlayScore: function(newPlayScore) {
      playScore = newPlayScore;
    },

    getData: function() {
      return [scores, playScore, game];
    }
  }
})();

let UIController = (function() {
  DOMStrings = {
    scoreP: '.score__p',
    playingScore: '.playDisplay',
  };

  let goGreen = function(player) {
      document.querySelector(DOMStrings.scoreP + String(player)).style.color = 'green';
      document.querySelector(DOMStrings.scoreP + String(player===1?0:1)).style.color = 'red';
  };

  let displayScore = function(score, player) {
    document.querySelector(DOMStrings.scoreP + String(player)).textContent = String(score);
  };

  let clearScores = function() {
    document.querySelector(DOMStrings.scoreP + '0').textContent = "0";
    document.querySelector(DOMStrings.scoreP + '1').textContent = "0";
  };

  let clearColors = function() {
    document.querySelector(DOMStrings.scoreP + '0').style.color = 'black';
    document.querySelector(DOMStrings.scoreP + '1').style.color = 'black';
  };

  let updatePlayScoreDisplay = function(playScore) {
    document.querySelector(DOMStrings.playingScore).textContent = String(playScore);
  };

  return {
    makeGreen: function(player) {
      goGreen(player)
    },

    clearScreen: function() {
      clearScores();
      clearColors();
    },

    displayData: function(score, player) {
      displayScore(score, player);
    },

    updataPlayScore: function(playScore) {
      updatePlayScoreDisplay(playScore);
    }
  }

})();

let gameController = (function(dataCtrl, UICtrl) {
 let setupEventListeners = function() {
  document.querySelector('.p0_btn').addEventListener("click", addPlayer_1);
  document.querySelector('.p1_btn').addEventListener("click", addPlayer_2);
  document.querySelector('.reset_btn').addEventListener("click", reset);
  document.querySelector('.playInput').addEventListener("change", updatePlay);
 };

 let addPlayer_1 = function() {
   let score, playScore;
   dataCtrl.setData(0);
   score = dataCtrl.getScores(0);
   UICtrl.displayData(score, 0);
   playScore = dataCtrl.getPlayScore();
   if (playScore <= score) {
     UICtrl.makeGreen(0);
     disablePlayers()
   }
 };

 let addPlayer_2 = function() {
   let score, playScore;
   dataCtrl.setData(1);
   score = dataCtrl.getScores(1);
   UICtrl.displayData(score, 1);
   playScore = dataCtrl.getPlayScore();
   if (playScore <= score) {
     UICtrl.makeGreen(1);
     disablePlayers()
   }
 };

 let reset = function() {
   dataCtrl.clearData();
   UICtrl.clearScreen();
   setupEventListeners();
 };

 let disablePlayers = function() {
   document.querySelector('.p0_btn').removeEventListener('click', addPlayer_1);
   document.querySelector('.p1_btn').removeEventListener('click', addPlayer_2);
 };

 let updatePlay = function() {
   reset();
   let playScore;
   console.log(`updatePlay Score`);
   playScore = parseInt(document.querySelector('.playInput').value);
   console.log(playScore);
   dataCtrl.setPlayScore(playScore);
   UICtrl.updataPlayScore(playScore);
 };

 return {
   init: function() {
     setupEventListeners();
   }
 }

})(dataController, UIController);


(function() {
  gameController.init();
})();
