$(document).ready(function () {
    
    let playerChoice = ""
    let i = 0
    let won = 1
    let lost = 1
    let tied = 1


    
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
        let uChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();
        console.log(uChoice)
        console.log(computerChoice)
        findWinner(uChoice, computerChoice);
    }

    function findWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            $('#tied').html(tied++)
            $('.playerChoice #playerChoice').html(playerChoice)
            $('.computerChoice #computerChoice').html(computerChoice)

        } else if (playerChoice === "rock" && computerChoice === "scissors") {
            $('#won').html(won++)
            $('.playerChoice #playerChoice').html(playerChoice)
            $('.computerChoice #computerChoice').html(computerChoice)


        } else if (playerChoice === "paper" && computerChoice === "rock") {
            $('#won').html(won++)
            $('.playerChoice #playerChoice').html(playerChoice)
            $('.computerChoice #computerChoice').html(computerChoice)


        } else if (playerChoice === "scissors" && computerChoice === "paper") {
            $('#won').html(won++)
            $('.playerChoice #playerChoice').html(playerChoice)
            $('.computerChoice #computerChoice').html(computerChoice)


        } else {
            $('#lost').html(lost++)
            $('.playerChoice #playerChoice').html(playerChoice)
            $('.computerChoice #computerChoice').html(computerChoice)
        }
    }

    

    $(document).on("click", "#play", function() {
        i++
        if (i == 3) {
            won = 0;
            lost = 0;
            tied = 0;
            if ($('#lost').html() > $('#won').html()) {
                alert ("vous avez perdu")
                i = 0
            } else {
                alert ("vous avez gagné !")
                i = 0
            }
        }
        
        playGame()
    })

    console.log($('#win').html())

})


