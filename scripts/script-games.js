$(document).ready(function () {
    
    $(document).on("click", "#newGame", function () {
        $(".first-game").toggleClass("invisible visible")
        $(".newGame").addClass("invisible")
        $("#newGame").addClass("invisible")
    })

    
    
    
    // Reset the number of rounds 
    let reset = 0
    // Player choice initialized to empty 
    let playerChoice = ""
    // Count the won / lost and tied per round (no visible for the user)
    let resultPerRound = {
        won: 0,
        lost: 0,
        tied: 0
    }
    // Count the won at the end of the round (visible by user) 
    let won = 0
    let lost = 0
    let tied = 0


    // PLAYER CHOICE 
    getPlayerChoice = () => {
        // if the rock image is clicked, choice selected permit to set a border around the image 
        $(".rock").on("click", function (e) {
            $(document).on("click", function (event) {
                if (!event.target.matches('.rock')) {
                    $(".rock").removeClass("choice-selected")
                    playerChoice = ""
                } else {
                    playerChoice = "rock"
                    $(".rock").addClass("choice-selected")
                }
            })
        })

        $(".paper").on("click", function () {
            $(document).on("click", function (event) {
                if (!event.target.matches('.paper')) {
                    $(".paper").removeClass("choice-selected")
                    playerChoice = ""
                } else {
                    playerChoice = "paper"
                    $(".paper").addClass("choice-selected")
                }
            })
        })

        $(".scissors").on("click", function () {
            $(document).on("click", function (event) {
                if (!event.target.matches('.scissors')) {
                    $(".scissors").removeClass("choice-selected")
                    playerChoice = ""
                } else {
                    playerChoice = "scissors"
                    $(".scissors").addClass("choice-selected")
                }
            })
        })
        return playerChoice
    }
    // Call the previous function 
    getPlayerChoice()

    // Random between 0 to 2 to determine the choice of the computer 
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

    function findWinner(playerChoice, computerChoice) {
        // Set VS word 
        $('.versus').html("<p>VS</p>")

        // Set results to upperCase 
        function playerComputerUpperCase() {
            playerChoice = playerChoice.toUpperCase()
            computerChoice = computerChoice.toUpperCase()
        }

        // TIED 
        if (playerChoice == computerChoice) {
            playerComputerUpperCase()
            // Display player and computer choice to the user
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            // increment the tied counter 
            tied++
        // WIN
        } else if ((playerChoice == "rock" && computerChoice === "scissors") || (playerChoice == "paper" && computerChoice === "rock") || (playerChoice == "scissors" && computerChoice === "paper")) {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            won++
        // LOST
        } else {
            playerComputerUpperCase()
            $('.playerChoice #playerChoice').html(playerChoice + " (You)")
            $('.computerChoice #computerChoice').html(computerChoice)
            lost++
        }

    }

    playGame = () => {
        // increment the reset counter
        reset++

        //Call the getPlayerChoice and store him in uChoice variable
        let uChoice = getPlayerChoice();

        // Call the getComputerChoice and store him in computerChoice variable
        let computerChoice = getComputerChoice();

        // Call the function with conditions to find the winner
        findWinner(uChoice, computerChoice);

        // the reset count equal 1 it's the first round
        if (reset == 1) {
            $(".round").html("<h3>Round 1</h3>")
        // display a text to indicate that's the second round
        } else if (reset == 2) {
            $(".round h3").text("Round 2")
        // Third round
        } else if (reset == 3) {
            $(".round h3").text("Round 3")
            // if won is superior to lost 
            if (won > lost) {
                // increment the result per round of won 
                resultPerRound.won++
                // Display won in the result square 
                $(".finalResult").html("<p style='color: green'>WON !</p>")
                // increment the visible count of won
                $('#won').text(resultPerRound.won)
            // Same than WON for tied 
            } else if (tied > 0 && (lost == won)) {
                resultPerRound.tied++
                $(".finalResult").html("<p>TIED</p>")
                $('#tied').text(resultPerRound.tied)
            // Same than WON for lost 
            } else {
                resultPerRound.lost++
                $(".finalResult").html("<p>LOST :(</p>")
                $('#lost').text(resultPerRound.lost)
            }
            // reset the invisible counters 
            won = 0
            lost = 0
            tied = 0
        }
    }

    // When user click play 
    $(document).on("click", "#play", function () {
        // Check if the user has clicked one image 
        if (playerChoice !== "") {
            // A game is played in 3 rounds (0 is counted) 
            if (reset <= 2) {
                playGame()
            }
        }
    })

    // on playAgain click different values are reset 
    $(document).on("click", "#playAgain", function () {
        reset = 0
        playerChoice = ""
        $(".finalResult").text("")
        $('.playerChoice #playerChoice').text("")
        $('.computerChoice #computerChoice').text("")
        $('.versus').text("")
        $(".round h3").text("")
    })
})


