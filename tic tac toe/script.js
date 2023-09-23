let btnRef=document.querySelectorAll(".button-option");
let popupRef=document.querySelector(".popup");
let newgameBtn=document.getElementById("new-game");
let restartBtn=document.getElementById("restart");
let msgRef=document.getElementById("message");

// audio
let music=new Audio("music.mp3")
let gameover=new Audio("gameover.mp3")
let turn1=new Audio("ding2-89720.mp3")
let turn2=new Audio("snd_fragment_retrievewav-14728.mp3")

music.volume=0.3;

let winningPattern = 
[
    [0,1,2],[0,3,6],[2,5,8],
    [6,7,8],[3,4,5],[1,4,7],
    [0,4,8],[2,4,6],
];

// player x plays first
let xTurn=true;
let count=0;

// disable all buttons
const disableButtons=() =>
{
    btnRef.forEach((element)=>
    (element.disabled=true));

    popupRef.classList.remove("hide");
};
// enable all buttons for new game
const enableButtons=()=>
{
    btnRef.forEach((element)=>
        {
            element.innerText="";
            element.disabled=false;

        });
        popupRef.classList.add("hide");
};

// func executes when player wins


newgameBtn.addEventListener("click",()=>
{
    count=0;
    // music.play();
    enableButtons();
});
restartBtn.addEventListener("click",()=>
{
    count=0;

    enableButtons();
})


// func executed when a player wins
const winFunction=(letter)=>
{
    disableButtons();
    if(letter=="X")
    {
        msgRef.innerHTML="&#x1F389 <br> 'X' Wins";
    

    }
    else{
        msgRef.innerHTML="&#x1F389 <br> 'O' Wins";
    }

};
// draw
const drawFunction=()=>
{
    disableButtons();
    msgRef.innerHTML="&#x1F60E;<br> It's a Draw";
}


// win logic
const winChecker=()=>
{
    for(let i of winningPattern)
    {
        let [element1, element2, element3]=[
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if(element1!="" && element2!="" && element3!="")
        {
            if(element1==element2 && element2==element3)
            {
                    winFunction(element1);
            }
        }
    };
}
// display x/o on click
btnRef.forEach((element) =>
{
    element.addEventListener("click",()=>
    {
        if(xTurn)
        {
            xTurn=false;
            // display x
            element.innerText="X";
            turn1.play();
        
            element.disabled=true;

        }
        else{
            xTurn=true;
            // display y
            element.innerText="O";
            turn1.play();
            element.disabled=true;

        }
        count+=1;
        if(count==9)
        {
            // draw
            drawFunction();

        }
        winChecker();
        music.play();
        
    });
});
// enable button and disable popup
window.onload=enableButtons;