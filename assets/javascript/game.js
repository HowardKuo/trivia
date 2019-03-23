var correctScore = 0,
    incorrectScore = 0,
    countdownTimer,
    timerTimeout,
    currentIndex = 0,
    timeoutMs = 5000,
    secondsLeft = timeoutMs/1000,
    questionBank = [
        new Question('How many NBA teams are based in California?', '4', ['1', '2', '3', '5']),
        new Question('Which player has the most rings?', 'Bill Russell', ['Michael Jordan', 'Robert Horry', 'Sam Jones', 'Larry Bird']),
        new Question('What year did the "NBA" start? (Post merge)', '1946', ['1947', '1945', '1948', '1949']),
        new Question('Which coach has the most rings?', 'Phil Jackson', ['Red Auerbach', 'Greg Popovich', 'Pat Riley', 'Don Nelson']),
        new Question('Who is the player in the NBA logo?', 'Jerry West', ['Michael Jordan', 'Hakeem Olajuwon', 'Magic Johnson', 'Julius Erving']),
        new Question('How many NBA teams are based outside the United States?', '1', ['0', '2', '3','5']),
        new Question('Which of these players has won a championship?', 'Kevin Garnett', ['Karl Malone', 'John Stockton','Reggie Miller', 'Charles Barkley']),
        new Question("Which player has won a championship in each of the last 3 decades? (1990's, 2000's, 2010's)", 'Tim Duncan', ['Kobe Bryant', "Shaquille O' Neal", 'Dwyane Wade', 'Vince Carter']),
        new Question('What draft pick was Michael Jordan selected at?', '3rd', ['1st', '2nd', '4th', '5th']),
        new Question('What year did the Seattle Supersonics become the Oklahoma City Thunder?', '2008', ['2010', '2006', '2012', '2004'])
    ];

$(document).ready(function() {
    startGame();
});

function startGame() {
    shuffle(questionBank);
    displayQuestion(currentIndex);
    countdownTimer = setTimeout(intervalFunction, timeoutMs);
    $(document.body).on('click','.answer', bindAnswer);
}

function intervalFunction() {
    displayCorrectAnswer();
    //setTimeout(function() {
        if (currentIndex < questionBank.length - 1) {
            displayQuestion(++currentIndex);
            countdownTimer = setTimeout(intervalFunction, timeoutMs);
            //$('.answer').on('click', bindAnswer);
            incorrectScore++;
            displayScores();
        }
        else {
            clearTimeout(countdownTimer);
            secondsLeft = 0;
            $('.questionAsked').html('Click here to try again');
            displayScores();
        }
    // }, 3000);
}

function displayCorrectAnswer() {
    $('.answer').each(function(i, elem) {
        if (questionBank[currentIndex].incorrectAnswers.indexOf($(elem).text()) > -1) {
            $(elem).addClass('wrongBG');
        }
        else {
            $(elem).addClass('correctBG');
        }
    });
} 

function bindAnswer() {
    $('.answer').off()
    displayCorrectAnswer();
    clearTimeout(countdownTimer);
    clearInterval(timerTimeout);
    console.log("right now", questionBank[currentIndex].incorrectAnswers)
    if ($(this).text() === questionBank[currentIndex].correctAnswer) {
        correctScore++;
        console.log("click handler: ", correctScore)
        if (currentIndex < questionBank.length - 1) {
            displayQuestion(++currentIndex);
            countdownTimer = setTimeout(intervalFunction, timeoutMs);
            //$('.answer').on('click', bindAnswer);
            
            displayScores();
        }
        else {
            clearTimeout(countdownTimer);
            secondsLeft = 0;
            $('.questionAsked').html('Click here to try again');
            displayScores();
        }
    }
    else {
        incorrectScore++;
        console.log("click handler: ", incorrectScore)
        if (currentIndex < questionBank.length - 1) {
            displayQuestion(++currentIndex);
            countdownTimer = setTimeout(intervalFunction, timeoutMs);
            //$('.answer').on('click', bindAnswer);
            
            displayScores();
        }
        else {
            clearTimeout(countdownTimer);
            secondsLeft = 0;
            $('.questionAsked').html('Click here to try again');
            displayScores();
        }
    }
    displayScores();
    console.log("test")
    secondsLeft = timeoutMs / 1000;
    //countdownTimer = setTimeout(intervalFunction, timeoutMs);
}

function displayQuestion(i) {
    var current = questionBank[i],
        answers = current.incorrectAnswers.slice().concat(current.correctAnswer);
    $('.questionAsked').html('<h2>'+ current.question + '</h2>')
    shuffle(answers);
    $('.answerOptions').html('');
    for (var j = 0; j < answers.length; j++) {
        $('.answerOptions').append('<div class="answer col-md-12"><h3>' + answers[j] + '</h3></div>');
    }
    $('.timer').html('<h4>Time Remaining: ' + secondsLeft + '</h4>')
    timerTimeout = setInterval(timerFunction, 1000);
}

function timerFunction() {
    $('.timer').html('<h4>Time Remaining: ' + --secondsLeft + '</h4>');
    if (secondsLeft === 0) {
        clearInterval(timerTimeout);
        secondsLeft = timeoutMs / 1000;
    }
}

function displayScores() {
    $('.questionsCorrect').text(correctScore);
    $('.questionsWrong').text(incorrectScore);
    
}

function Question(question, correctAnswer, incorrectAnswers) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
}

//taken from 'https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/'
function shuffle(array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}  

