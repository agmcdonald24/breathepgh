// Timer vars
var totalDuration = 300;  // Default duration in seconds (5 minutes)
var breathDuration = 6;   // Default breath cycle duration in seconds
var timerInterval;
var startTime;

// Audio
var soundFiles = [
  "./audio/Gong1.mp3",
  "./audio/Gong2.mp3",
];
var volume = 1.0;
var exhaleAudio = new Audio(soundFiles[0]);
var inhaleAudio = new Audio(soundFiles[1]);
exhaleAudio.volume = volume;
inhaleAudio.volume = volume;

// DOM Elements
var animationElement = document.getElementById('breathingAnimation');
var startBtn = document.getElementById('startBtn');
var stopBtn = document.getElementById('stopBtn');
var timerElement = document.getElementById('timer');

// Function to update the timer display
function updateTimer(elapsedTime) {
  var minutes = Math.floor(elapsedTime / 60);
  var seconds = elapsedTime % 60;
  document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Update the breathing animation
function playBreathingAnimation(inhale) {
  animationElement.innerText = inhale ? 'Breathe In' : 'Breathe Out';

  if (inhale) {
    animationElement.innerText = 'Breathe In';
    animationElement.classList.add('inhale');
    animationElement.classList.remove('exhale');
    } else {
    animationElement.innerText = 'Breathe Out';
    animationElement.classList.add('exhale');
    animationElement.classList.remove('inhale');
  };
};

// Function to handle breathwork timer logic
function breathworkTimerLogic() {
  // Update the timer
  var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  updateTimer(elapsedTime);

  // Calculate breath cycle index
  var breathCycleIndex = Math.floor(elapsedTime / breathDuration) % 2;

  // Inhale/Exhale
  var isInhale = breathCycleIndex === 0;

  // Play the sound
  if (elapsedTime % breathDuration === 0) {
    if (isInhale) {
      console.log("audio.canPlayType? ", inhaleAudio.canPlayType("audio/mp3"));
      inhaleAudio.play();
    } else {
      console.log("audio.canPlayType? ", exhaleAudio.canPlayType("audio/mp3"));
      exhaleAudio.play();
    }
  };

  // Update the breathing animation
  playBreathingAnimation(isInhale);

  // Check if the total duration has been reached
  if (elapsedTime >= totalDuration) {
    // Stop the timer
    stopTimer();
    animationElement.classList.remove('inhale');
    animationElement.classList.remove('exhale');
  };
};

// Event listener for the Start button
startBtn.addEventListener('click', function () {
  // Disable the Start button and enable the Stop button
  startBtn.disabled = true;
  stopBtn.disabled = false;

  animationElement.classList.remove('exhale');
  animationElement.classList.add('inhale');

  // Get the selected duration and interval from the dropdowns
  totalDuration = parseInt(document.getElementById('duration-select').value) * 60;
  breathDuration = Math.round(parseFloat(document.getElementById('interval-select').value)); // Round to the nearest whole number

  // Initialize the start time
  startTime = Date.now();

  // Set up the timer interval for breathwork logic
  timerInterval = setInterval(breathworkTimerLogic, 1000); // Update every second
});

// Event listener for the Stop button
stopBtn.addEventListener('click', function () {
  // Enable the Start button and disable the Stop button
  startBtn.disabled = false;
  stopBtn.disabled = true;

  // Clear breathing animation
  animationElement.classList.remove('inhale');
  animationElement.classList.remove('exhale');

  // Clear the timer interval
  clearInterval(timerInterval);

  // Reset the timer display
  timerElement.innerText = '00:00';
  animationElement.innerText = 'Breathe In';
});
