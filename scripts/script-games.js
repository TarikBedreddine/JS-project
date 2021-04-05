$(document).ready(function () {
    let reset = 0
    let playerChoice = ""
    let resultPerRound = {
        won: 0,
        lost: 0,
        tied: 0
    }
    let won = 0
    let lost = 0
    let tied = 0


    
    getPlayerChoice = () => {

        $(".rock").on("click", function (e) {
            playerChoice = "rock"
            $(document).on("click", function (event) {
                if (!event.target.matches('.rock')) {
                    $(".rock").removeClass("choice-selected")
                } else {
                    $(".rock").addClass("choice-selected")
                }
            })
        })

        
        $(".paper").on("click", function () {
            playerChoice = "paper"
            $(document).on("click", function (event) {
                if (!event.target.matches('.paper')) {
                    $(".paper").removeClass("choice-selected")
                } else {
                    $(".paper").addClass("choice-selected")
                }
            })
        })

        $(".scissors").on("click", function () {
            playerChoice = "scissors"
            $(document).on("click", function (event) {
                if (!event.target.matches('.scissors')) {
                    $(".scissors").removeClass("choice-selected")
                } else {
                    $(".scissors").addClass("choice-selected")
                }
            })
        })
        return playerChoice
    }

    getPlayerChoice()
    
    getComputerChoice = () => {
        let computerChoice = Math.floor(Math.random() * 3);
        let computerResult = "";
        if (computerChoice === 0) {
            computerResult = "rock";
        } else if (computerChoice === 1) {
            computerResult = "paper";
        } else {
            computerResult = "scissors"
        }
        return computerResult;
    }


    playGame = () => { 
       
        reset++

        let uChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();
        findWinner(uChoice, computerChoice);
        //LE SCORE EST INCREMENTE


        if (reset == 1) {
            $(".round").html("<h3>Round 1</h3>")
        } else if (reset == 2) {
            $(".round h3").text("Round 2")
        } else if (reset == 3) {
        
            $(".round h3").text("Round 3")
            if (won > lost) {
                resultPerRound.won++
                console.log("You won")
                $('#won').text(resultPerRound.won)
            } else if (tied > 0 && (lost == won)) {
                resultPerRound.tied++
                console.log("Tied")
                $('#tied').text(resultPerRound.tied)
            } else {
                resultPerRound.lost++
                console.log("You lost")
                $('#lost').text(resultPerRound.lost)
            }

            won = 0
            lost = 0
            tied = 0
            reset = 0
        }
    }

    function findWinner(playerChoice, computerChoice) {
        // Set VS word 
        $('.versus').html("<p>VS</p>")

        // Set results to upperCase 
        function playerComputerUpperCase () {
            playerChoice = playerChoice.toUpperCase()
            computerChoice = computerChoice.toUpperCase()
        }

        if (playerChoice == computerChoice) {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            tied++

        } else if (playerChoice == "rock" && computerChoice === "scissors") {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            won++


        } else if (playerChoice == "paper" && computerChoice === "rock") {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            won++

        } else if (playerChoice == "scissors" && computerChoice === "paper") {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            won++

        } else {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            lost++
        }

    }

    

    $(document).on("click", "#play", function() {
        playGame()
    })

    console.log($('#win').html())

})


