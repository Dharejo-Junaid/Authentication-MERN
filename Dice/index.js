const playButton = document.querySelector("button");
playButton.addEventListener("click", play);

let randomNo1 = 0, randomNo2=0;

// Selecting image Tags;
const image1 = document.querySelector(".image1");
const image2  = document.querySelector(".image2");

let count = 0;
let imageInterval;

// generate required random number b/w (1-6);
function getRandom() {
    return Math.floor(Math.random()*6) + 1;
}

// function on "playButton" click;
function play() {
    count=0;
    imageInterval = setInterval(changeImage, 75);
}

function changeImage() {

    // getting random number b/w (1-6);
    randomNo1 = getRandom();
    randomNo2 = getRandom();

    // selecting random image using random number;
    let image1Path = `images/dice${randomNo1}.png`;
    let image2Path = `images/dice${randomNo2}.png`;

    // changing image on "img" tag;
    image1.setAttribute("src", image1Path);
    image2.setAttribute("src", image2Path);

    count++;
    if(count===6) {
        showResult();
        clearInterval(imageInterval);
    }
}

// setting result on "h1-tag";
function showResult() {
    const heading = document.querySelector("h1");

    if(randomNo1 > randomNo2)
        heading.innerText = "😁 Player 1 Wins!";

    else if(randomNo2 > randomNo1)
        heading.innerText = "Player 2 Wins! 😁";

    else
        heading.innerText = "😒 Draw 😒";
}