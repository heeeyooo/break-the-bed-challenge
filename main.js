let canvas = document.getElementById("scratch");
// create context to be able to draw in canvas
let context = canvas.getContext("2d");

// create gradient
const init = () => {
    let gradient = context.createLinearGradient(0, 0, 135, 135);
    gradient.addColorStop(0, "#37dede");
    gradient.addColorStop(1, "#377ade");

    // draw a filled rectangle with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, 200, 200);
};

window.onload = init();

// initialize mouse position

let mouseX = 0;
let mouseY = 0;
let isScratched = false;

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

// detech touch device
const isTouchDevice = () => {
    try {
        // we try to create TouchEvent. It would fail for desktops and throw error
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

// get top and left of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

// exact x and y position of mouse\touch
// PAGEX PAGEY ARE COORDINATES FOR MOUSE WHEN CLICK
const getXY = (e) => {
    mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

// returns true or false
isTouchDevice();

// Start scratch

// devicetype can be mouse or touch
canvas.addEventListener(events[deviceType].down, (event) => {
    isScratched = true;
    // get x and y position
    getXY(event);
    scratch(mouseX, mouseY);
});

canvas.addEventListener(events[deviceType].move, (event) => {
    if (!isTouchDevice()) {
        event.preventDefault();
    }
    if (isScratched) {
        getXY(event);
        scratch(mouseX, mouseY);
    }
});

// stop drawing

canvas.addEventListener(events[deviceType].up, () => {
    isScratched = false;
});

canvas.addEventListener("mouseleave", () => {
    isScratched = false;
});

const scratch = (x, y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();

    // arc makes circle x,y,radius, start angle, end angle
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.fill();
};

// 34 poses

const POSEDATA = [
    {
        pose: "img/3-Lotus.gif",
    },
    {
        pose: "img/6-doggiestyle.gif",
    },
    {
        pose: "img/7-full-nelson-.gif",
    },
    {
        pose: "img/Anal_Sex_From_A_Spooning_Position-1.jpg",
    },
    {
        pose: "img/aquarius-sex-position.jpg",
    },
    {
        pose: "img/butter-churner-sex-position.jpg",
    },
    {
        pose: "img/ceo-sex-position.jpg",
    },
    {
        pose: "img/Cross_Legged_Mutant-1.jpg",
    },
    {
        pose: "img/deck-chair-sex-position.jpg",
    },
    {
        pose: "img/doggie-style.jpg",
    },
    {
        pose: "img/downward-dog-sex-position.jpg",
    },
    {
        pose: "img/Driving-The-Peg-Home-Against-A-Wall-1.jpg",
    },
    {
        pose: "img/eagle-sex-position.jpg",
    },
    {
        pose: "img/eiffel-tower-sex-position.jpg",
    },
    {
        pose: "img/elephant-sex-position.jpg",
    },
    {
        pose: "img/erotic-sex-position.jpg",
    },
    {
        pose: "img/face-off-sex-position.jpg",
    },
    {
        pose: "img/face-seat.jpg",
    },
    {
        pose: "img/gemini-sex-position.jpg",
    },
    {
        pose: "img/golden-gate-sex-position.jpg",
    },
    {
        pose: "img/He-is-Standing-Next-To-The-Bed-1.jpg",
    },
    {
        pose: "img/lazy-dog-sex-position.jpg",
    },
    {
        pose: "img/Oral_Sex_On_Her.jpg",
    },
    {
        pose: "img/raging-bull-sex-position.jpg",
    },
    {
        pose: "img/sagittarius-sex-position.jpg",
    },
    {
        pose: "img/Seventh_Posture_Of_The_Perfumed_Garden-1.jpg",
    },
    {
        pose: "img/She_is_On_Her_Knees-1.jpg",
    },
    {
        pose: "img/side-saddle-sex-position.jpg",
    },
    {
        pose: "img/Spanking-sex-posiotn.jpg",
    },
    {
        pose: "img/Standing_Belly_To_Belly-1.jpg",
    },
    {
        pose: "img/Standing_He_is_Behind-1.jpg",
    },
    {
        pose: "img/The_69_Position_and_A_Couple_of_Jokes-1.jpg",
    },
    {
        pose: "img/The_Daisy_Chain-1.jpg",
    },
    {
        pose: "img/The-Ice-Sculpture-Position-aka-Double-SowCow-1.jpg",
    },
];

let randomNumber = Math.floor(Math.random() * 34);

let img = document.querySelector(".img");

img.src = `${POSEDATA[randomNumber].pose}`;

console.log(POSEDATA[randomNumber].pose);
