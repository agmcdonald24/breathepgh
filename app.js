// JavaScript code for the breathwork app
// Initialize variables
var totalDuration = 300;  // Default duration in seconds (5 minutes)
var breathDuration = 6;   // Default breath cycle duration in seconds
var soundFiles = [
    "http://breathepgh.com/wp-content/uploads/2024/02/gong3.wav",
    "http://breathepgh.com/wp-content/uploads/2024/02/gong4.wav"
];
var volume = 1.0;
var timerInterval;
var startTime;

// Function to update the timer display
function updateTimer(elapsedTime) {
    var minutes = Math.floor(elapsedTime / 60);
    var seconds = elapsedTime % 60;
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update the breathing animation
function playBreathingAnimation(isInhale) {
  var animationElement = document.getElementById('breathingAnimation');
  animationElement.innerText = isInhale ? 'Breathe In' : 'Breathe Out';

  if (isInhale) {
      animationElement.classList.add('inhale');
      animationElement.classList.remove('exhale');
    } else {
      animationElement.classList.add('exhale');
      animationElement.classList.remove('inhale');
  }
};


// Function to handle breathwork timer logic
function breathworkTimerLogic() {
    var elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    // Calculate breath cycle index
    var breathCycleIndex = Math.floor(elapsedTime / breathDuration) % 2;

    // Inhale/Exhale
    var isInhale = breathCycleIndex === 0;

    // Play the sound
    var audio = new Audio(soundFiles[isInhale ? 0 : 1]);
    audio.volume = volume;
    audio.play();

    // Add the "inhale" class to start the animation
    // document.getElementById('breathingAnimation').classList.add('inhale');
    // document.getElementById('breathingAnimation').classList.remove('exhale');

    // Update the breathing animation
    playBreathingAnimation(isInhale);

    // Update the timer
    updateTimer(elapsedTime);


    // Check if the total duration has been reached
    if (elapsedTime >= totalDuration) {
        // Stop the timer
        stopTimer();

        document.getElementById('breathingAnimation').classList.remove('inhale');
        document.getElementById('breathingAnimation').classList.remove('exhale');
    }
}

// Event listener for the Start button
document.getElementById('startBtn').addEventListener('click', function () {
    // Disable the Start button and enable the Stop button
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;

    document.getElementById('breathingAnimation').classList.remove('exhale');
    document.getElementById('breathingAnimation').classList.add('inhale');

    // Get the selected duration and interval from the dropdowns
    totalDuration = parseInt(document.getElementById('duration').value) * 60;
    breathDuration = Math.round(parseFloat(document.getElementById('interval').value)); // Round to the nearest whole number

    // Initialize the start time
    startTime = Date.now();

    // Set up the timer interval for breathwork logic
    timerInterval = setInterval(breathworkTimerLogic, breathDuration * 1000);
});

// Event listener for the Stop button
document.getElementById('stopBtn').addEventListener('click', stopTimer);

// Function to stop the timer
function stopTimer() {
    // Enable the Start button and disable the Stop button
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;

    // Clear breathing animation
    document.getElementById('breathingAnimation').classList.remove('inhale');
    document.getElementById('breathingAnimation').classList.remove('exhale');

    // Clear the timer interval
    clearInterval(timerInterval);

    // Reset the timer display
    document.getElementById('timer').innerText = '00:00';
}
