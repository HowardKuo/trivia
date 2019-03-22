var correctScore = 0,
    incorrectScore = 0,
    countdownTimer,
    questionBank = [
        new Question('How many NBA teams are based in California?', '4', ['1', '2', '3', '5']),
        new Question('Which player has the most rings?', 'Bill Russell', ['Michael Jordan', 'Robert Horry', 'Sam Jones', 'Larry Bird']),
        new Question('What year did the "NBA" start? (Post merge)', '1946', ['1947', '1945', '1948', '1949']),
        new Question('Which coach has the most rings?', 'Phil Jackson', ['Red Auerbach', 'Greg Popovich', 'Pat Riley', 'Don Nelson']),
        new Question('Who is the player in the NBA logo?', 'Jerry West', ['Michael Jordan', 'Hakeem Olajuwon', 'Magic Johnson', 'Julius Erving']),
        new Question('How many NBA teams are based outside the United States?', '1', ['0', '2', '3','5']),
        new Question('Which of these players has won a championship?', 'Kevin Garnett', ['Karl Malone', 'John Stockton','Reggie Miller', 'Charles Barkley']),
        new Question("Which player has won a championship in each of the last 3 decades? (1990's, 2000's,2010's)", 'Tim Duncan', ['Kobe Bryant', "Shaquille O' Neal", 'Dwyane Wade', 'Vince Carter']),
        new Question('What draft pick was Michael Jordan selected at', '3rd', ['1st', '2nd', '4th', '5th']),
        new Question('What year did the Seattle Supersonics become the Oklahoma City Thunder?', '2008', ['2010', '2006', '2012', '2004'])
    ];

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
        $('.questionAsked').append('<h2>'+ currentQuestion.question + '</h2>');
        var answers = currentQuestion.incorrectAnswers.slice().concat(currentQuestion.correctAnswer);
        shuffle(answers);
        console.log(answers);
        for (var j = 0; j < answers.length; j++) {
            $('.answerOptions').append('<div class="answer"><h3>' + answers[j] + '</h3></div><br>');;
        }
        var test = setTimeout(function(){
            console.log("SPACEEEEEEEEEEEEEEEEEEEEEEEE")
        },1000)
        $('.answer').on('click', function(){
            clearTimeout(test);
        });


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

