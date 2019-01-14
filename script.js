let cat = {
    drink: {
        milk: 1,
        water: 0
    },
    food: {
        fish: 1,
        taco: 0
    },

    exercise: {
        laserpointer: 1,
        running: 0
    }
};

$(function () {
    // instructions
    $(`.instruction`).on(`click`, function (e) {
        e.preventDefault();
        $(`#instructionpage`).toggleClass(`instructionpage`).toggleClass(`instructionpageactive`)
    });
});

$(`#instructionpage`).on(`click`, function (e) {
    e.preventDefault();
    $(this).toggleClass(`instructionpage`).toggleClass(`instructionpageactive`)

})

$(`.instructionpageactive`).on(`click`, function (e) {
    e.preventDefault(e);
    $(`this`).toggleClass(`instructionpage`).toggleClass(`instructionpageactive`);
    console.log(`hi`);
})

// Timer
$('.startTest').on('click', function (e) {
    e.preventDefault();
    displayTime();
    stopTimer();
    startTimer();

    $('html, body').animate({
        scrollTop: document.getElementById('Question1').offsetTop
    }, 1000);
});
let totalSeconds = 180;
let interval;
$(`pause`).toggleClass(`resume`);
const displayTime = () => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    seconds = seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    $(`#timer`).html(`<h1><i class="far fa-clock"></i>${minutes}:${seconds}</h1>`);
}

const setValue = () => {
    minutes = Math.floor(totalSeconds / 60);
    $('#number').val(minutes);
}

const countDown = () => {
    totalSeconds--;
    if (totalSeconds <= 0) {
        clearInterval(interval);
    }
    displayTime();

}

const startTimer = () => {
    interval = setInterval(countDown, 1000);
}

const stopTimer = () => {
    if (interval) {
        clearInterval(interval);
    }
}

// add button
$('[name="addone"]').click(function (e) {
    e.preventDefault();
    if (totalSeconds <= 240) {
        totalSeconds += 60;
        setValue();
        displayTime();
    }
});

// subtract button
$('[name="subtract"]').click(function (e) {
    e.preventDefault();
    if (totalSeconds >= 60) {
        totalSeconds -= 60;
        setValue();
        displayTime();
    }
});

//Reset button
$('[name="reset"]').click(function (e) {
    e.preventDefault();
    stopTimer();
    totalSeconds = 180;
    setValue();
    startTimer();
    displayTime();
});

//Pause button
$('[name="pause"]').click(function (e) {
    e.preventDefault();
    stopTimer();
});

//

//Resume button
$('[name="resume"]').click(function (e) {
    e.preventDefault();
    stopTimer();
    if (totalSeconds > 0) {
        startTimer();
    }
});
// QUIZ

$(`#submit`).on(`click`, function (e) {
    e.preventDefault();

    const userDrink = $(`input[name="drink"]:checked`).val();

    const userFood = $(`input[name="food"]:checked`).val();
    const userExercise = $(`input[name="exercise"]:checked`).val();

    const drinkOptionValue = cat["drink"][userDrink];
    const foodOptionValue = cat["food"][userFood];
    const exerciseOptionValue = cat["exercise"][userExercise];
    const addition = drinkOptionValue + foodOptionValue + exerciseOptionValue;
    console.log(addition);

    if (addition >= 2) {
        $(`.resulttext`).html(`<h2 id="result">You're a cat!</h2>`);
        $(`.resultimage`).html('<img src="images/cat.jpg" alt="">');
    } else if (addition == 1) {
        $(`.resulttext`).html(`<h2 id="result">You're not a cat!</h2>`);
        $(`.resultimage`).html('<img src="images/notcat.jpg" alt="">');

    }
    else {
        $(`.resulttext`).html(`<h2 id="result">Remember to answer all 3 questions</h2>`);

        $(`.resultimage`).html('<img src="images/catheader.jpg" alt="">');
    }
    $(`#resultContainer`).removeClass('result').addClass(`resultactive`);
    $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
});