let isRunning = false;
let startTime;
let lapStartTime;
let lapCounter = 1;

function start() {
    if (!isRunning) {
        if (lapStartTime) {
            const elapsedPausedTime = new Date() - lapStartTime;
            startTime = new Date() - elapsedPausedTime;
        } else {
            startTime = new Date();
        }
        isRunning = true;
        update();
        setButtonState();
    }
}

function togglePauseResume() {
    if (isRunning) {
        isRunning = false;
        lapStartTime = new Date();
    } else {
        isRunning = true;
        startTime = new Date() - (lapStartTime - startTime);
        update();
        lapStartTime = null;
    }
    setButtonState();
}

function lap() {
    if (isRunning) {
        const lapTime = new Date() - startTime;
        const lapListItem = document.createElement("li");
        lapListItem.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
        document.getElementById("laps").appendChild(lapListItem);
        lapStartTime = new Date();
        lapCounter++;
    }
}

function reset() {
    isRunning = false;
    startTime = null;
    lapStartTime = null;
    lapCounter = 1;
    document.getElementById("display").textContent = "00:00:00.000";
    document.getElementById("laps").innerHTML = "";
    setButtonState();
}

function update() {
    if (isRunning) {
        const elapsedTime = new Date() - startTime;
        document.getElementById("display").textContent = formatTime(elapsedTime);
        setTimeout(update, 10);
    }
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
}

function setButtonState() {
    const pauseResumeButton = document.getElementById("pauseResumeButton");

    if (isRunning) {
        pauseResumeButton.textContent = "Pause";
    } else {
        pauseResumeButton.textContent = "Resume";
    }
}