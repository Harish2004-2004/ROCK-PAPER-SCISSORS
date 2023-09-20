



//The below Function is used to display the score after each play
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins = ${score.wins}, losses = ${score.losses}, Ties = ${score.ties}`;
    }

    document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
        autoPlay();
    })
  
  
  
//I have used parse method of JSON object to convert the 'score' string into an JavaScript Object
//It stores the score object by retriving the results from the localStorage 
//i have also used the OR opearator(||)to provide a score object if the loclstorage fails
let score =JSON.parse(localStorage.getItem('score'))||
{
    wins : 0,
    losses : 0,
    ties : 0
}





console.log(score);

let isPlaying = false;
let intervalId;

function autoPlay(){
    if(!isPlaying){
        intervalId = setInterval(() => {
            document.querySelector('.js-auto-play-button').innerHTML='Stop AutoPlay';
            const move = pickComputerMove();
            console.log(move);
            playGame(move); 
        },1000);
        isPlaying = true;
    }
    else{
        clearInterval(intervalId);
        document.querySelector('.js-auto-play-button').innerHTML='Auto Play';
        isPlaying =false;
    }
  
}

document.querySelector('.js-rock-button').addEventListener('click',() => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click',() => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',() => {
    playGame('Scissors');
});

document.body.addEventListener('keydown',(value)=>{
    if(value.key==='r' || value.key === 'R'){
        playGame('Rock');
    }
    else if(value.key === 'p' || value.key === 'P'){
        playGame('Paper');
    }
    else if(value.key === 's' || value.key === 'S'){
        playGame('Scissors');
    }
})

//Function to generate the computer move using Math.randdom Inbuilt function
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    

    if(randomNumber >= 0 && randomNumber < 1/3)
        {
            computerMove = 'Rock';
        }else if(randomNumber >= 1/3 && randomNumber <2/3){
            computerMove = 'Paper';
        }else{
            computerMove = 'Scissors';
        }

        return computerMove;
}

//function to generate the result

function playGame(playerMove) {
    const computerMove =  pickComputerMove();

    let result = '';
    if(playerMove === 'Scissors')
        if(computerMove === 'Rock'){
            result = 'You Lose';
        }else if(computerMove === 'Paper'){
            result = 'You Win';
        }else if(computerMove === 'Scissors'){
            result = 'Tie';
        }
        if(playerMove === 'Paper') {
            if(computerMove === 'Rock'){
                result = 'You Win';
            }else if(computerMove === 'Paper'){
                result = 'Tie';
            }else if(computerMove === 'Scissors'){
                result = 'You Lose';
            }
        }
        if(playerMove === 'Rock') {
            if(computerMove === 'Rock'){
                result = 'Tie';
            }else if(computerMove === 'Paper'){
                result = 'You Lose';
            }else if(computerMove === 'Scissors'){
                result = 'You Win'
            }
        }
        //updating the score object
        if(result == 'Tie'){
            score.ties += 1;
        }else if(result == 'You Lose'){
            score.losses += 1;
        }else if(result == 'You Win'){
            score.wins += 1;
        }

        //storing the score in the localstorage object using setItem method
        //Note we can only store strings in localstorage object
        //so i converted the JavaScript object into an string using JSON inbuilt method stringify

        localStorage.setItem('score',JSON.stringify(score));

        //displaying the result after each play 

        updateScoreElement();

        //displaying the result in the webpage

        document.querySelector('.js-result').innerHTML=`${result}`;

        //using DOM and innerHTML, displaying the playermove and computermove using custom images

        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icons"> <img src="images/${computerMove}-emoji.png" class="move-icons">Computer`;
        
}



//Things i still want to do:
    //make the styling better
    //Add some winning and lossing animations like popups or something
    //update the way the no of wins losses and ties is displayed its ugly
    //Push the project into my GitHub repository
