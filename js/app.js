$(document).ready(function() {

  var guessCnt = 0;
	var secretNum = 0;
  var guess_old = 999;

  newGame();

	function RunGame() {
    var input = $('#userGuess');
    var inputValue = input.val();
  	var diff = Math.abs(secretNum-inputValue);
    var diffold = Math.abs(secretNum-guess_old);
    var result;
	  
    if (ValidateInputs() === false)
      return;

    if (diff === 0)
	  	result = 'You guessed it! Yay!';
    else if (1 <= diff && diff < 10) {
      if (diffold >= 10)
        result = 'Very hot!';
      else if (diff > diffold)
        result = 'Very hot! Colder';
      else if (diff === diffold)
        result = 'Very hot! Same as previous one';
      else
        result = 'Very hot! Warmer';
    }
    else if (10 <= diff && diff < 20)
      result = 'Hot!';
    else if (20 <= diff && diff < 30)
        result = 'Warm';
    else if (30 <= diff && diff < 50)
      result = 'Cold';
    else // (50 <= diff && diff <= 100)
      result = 'Ice cold';

    guess_old = inputValue;
    guessCnt++;
    $('#feedback').text(result);
    $('#guessList').append("<li>" + inputValue + "</li>");
    $('#count').text(guessCnt);
  }

    function ValidateInputs() {
      var input = $('#userGuess');
      var inputValue = input.val();

      if (isNaN(inputValue)) {
        alert ("Please enter a number.");
        return false;
      }
      else if (inputValue % 1 != 0 ) {
        alert ("Please enter an integer.");
        return false;
      }
      else if (inputValue < 1 || inputValue > 100) {
        alert ("Enter a guess number between 1 and 100.");
        return false;
      }

      return true;
    }
  	
  	function GetSecretNumber() {
	  	var timeTick = 	Date.now(); // 1421715573651
	  	var idxRand = Math.floor(timeTick * Math.random());  
	  	// generate secret number between 1 and 100
	  	secretNum = idxRand % 100 + 1;
	  	return secretNum;
  	}

  	function newGame() {
	  	secretNum = GetSecretNumber();
	  	//alert("secretNum is " + secretNum);
  	 	guessCnt = 0;
      guess_old = 999;
   		$('#feedback').text('Make your Guess!');
   		$('#userGuess').val('');
   		$('#count').text(0);
   		$('#guessList').empty();
  	}

  	/*--- Display information modal box ---*/
  	$(".what").click(function() {
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function() {
  		$(".overlay").fadeOut(1000);
  	});

  	// new game
  	$(".new").click(function() {
    	newGame();
  	});

  	$('#guessButton').click(function() {
  		event.preventDefault();
  		RunGame();
  	});

});
