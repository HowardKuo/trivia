var correctScore = 0,
    incorrectScore = 0,
    countdownTimer,
    questionBank = [
        new Question('How many NBA teams are based in California?', '4', ['1', '2', '3']),
        new Question('Which player has the most rings?', 'Bill Russell', ['Michael Jordan', 'Robert Horry', 'Sam Jones']),
    ]

$(document).ready(function() {
    console.log(questionBank);
    startGame();
});

function startGame(){
    //pull a question from bank
    //have timer count from 15 to 0
    //during timer, 4 answers should appear and be clickable
    //after each question, have a 5 second timer before next question showing right and wrong asnwers
    //move onto a different random question after time is up
    shuffle(questionBank)
    for (var i = 0; i < questionBank.length; i++) {
        var currentQuestion = questionBank[i];
        $('.questionAsked').append(currentQuestion.question);
        //use math random to set the correct answer position and save that to append correct answer too
        //incorrect answers shuffle array
        var answers = currentQuestion.incorrectAnswers.slice().concat(currentQuestion.correctAnswer);
        shuffle(answers);
        console.log(answers);
        for (var j = 0; j < answers.length; j++) {
            $('.answerOptions').append('<div class="answer">' + answers[j] + '</div>');
            countdownTimer = setTimeout(function(){
                $('.answer').on('click', function(){
                    clearTimeout(countdownTimer);
                });
            },15000)
        }



    }
    
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

