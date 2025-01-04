let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

document.querySelector(".js-play-btn").addEventListener("click", () => {
    isAllowed();
});

function isAllowed() {
    document.querySelector(".menu").classList.add("none");
    document.querySelector(".game").classList.remove("none");
    init();
    const attention = document.createElement("div");
    const allowedBtn = document.createElement("button");
    const rejectBtn = document.createElement("button");

    attention.classList = "attention";
    allowedBtn.classList = "allowed-btn";
    rejectBtn.classList = "reject-btn";

    allowedBtn.textContent = "I am 18 or older";
    rejectBtn.textContent = "I am under 18";

    document.body.append(attention);
    attention.append(allowedBtn);
    attention.append(rejectBtn);

    allowedBtn.addEventListener("click", () => {
        attention.remove();
        // get current coordinates rectLeft and rectTop
        getCoordinates();
        document
            .querySelector(".hand-tip")
            .classList.add("hand-tip--animation");
    });

    rejectBtn.addEventListener("click", () => {
        window.close();
    });
}

function init() {
    // Draw a filled rectangle with backgroundColor
    context.fillStyle = "#ffb630";
    context.fillRect(0, 0, 300, 300);

    // Shuffle random img every time on init
    updateImg();
}

// Mouse or touch event
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

let deviceType;

// Create function that detecting touch device or not
const isTouchDevice = () => {
    try {
        // I try to create TouchEvent. It would fail for desktops and throw an error
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

// Returns true or false
isTouchDevice();

// Define canvas coordinates
let rectLeft;
let rectTop;

function getCoordinates() {
    // Get top and left of canvas coordinates
    rectLeft = canvas.getBoundingClientRect().left;
    rectTop = canvas.getBoundingClientRect().top;
}

// Update canvas coordinates on resize
addEventListener("resize", () => {
    rectLeft = canvas.getBoundingClientRect().left;
    rectTop = canvas.getBoundingClientRect().top;
});

// Define mouse or touch coordinates
let mouseX;
let mouseY;

const getXY = (e) => {
    mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

let isScratched = false;

// Start scratch
canvas.addEventListener(events[deviceType].down, (event) => {
    isScratched = true;
    getXY(event);
    scratch(mouseX, mouseY);
});

canvas.addEventListener(events[deviceType].move, (event) => {
    // if (!isTouchDevice()) {
    //     event.preventDefault();
    // }
    if (isScratched) {
        getXY(event);
        scratch(mouseX, mouseY);
    }
});

// Stop scratch
canvas.addEventListener(events[deviceType].up, () => {
    isScratched = false;
});

canvas.addEventListener("mouseleave", () => {
    isScratched = false;
});

function scratch(x, y) {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();

    // arc makes circle x, y, radius, start angle, end angle
    context.arc(x, y, 25, 0, 2 * Math.PI);
    context.fill();
}

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

let img = document.querySelector(".img");

// Random number of all images
let randomNumber = Math.floor(Math.random() * 34);

function updateImg() {
    randomNumber = Math.floor(Math.random() * 34);
    img.src = `${POSEDATA[randomNumber].pose}`;
}

document.querySelector(".js-refresh-btn").addEventListener("click", () => {
    context.reset();
    init();
    document.querySelector(".hand-tip").classList.remove("hand-tip--animation");
    setTimeout(() => {
        document
            .querySelector(".hand-tip")
            .classList.add("hand-tip--animation");
    }, 0);
});
