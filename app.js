// Timer vars
let totalDuration = 300;  // Default duration in seconds (5 minutes)
let breathDuration = 6;   // Default breath cycle duration in seconds
const defaultVolume = 0.5;
let timerInterval;
let startTime;

// Audio
const soundFiles = [
  "./audio/Gong2.mp3",
  "./audio/Gong1.mp3",
];

// silentAudio plays when users interacts with button
// in order to get around iOS memory protection code
const silentAudio = new Audio();
silentAudio.src = "data:audio/mp3;base64,";
// silentAudio.preload = "auto";
const exhaleAudio = new Audio(soundFiles[0]);
const inhaleAudio = new Audio(soundFiles[1]);
exhaleAudio.volume = defaultVolume;
inhaleAudio.volume = defaultVolume;
exhaleAudio.preload = "auto";
inhaleAudio.preload = "auto";

// DOM Elements
const animationElement = document.getElementById('breathingAnimation');
const volumeSlider = document.getElementById('volumeSlider');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timerElement = document.getElementById('timer');

// Function to update the timer display
function updateTimer(elapsedTime) {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
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
      inhaleAudio.play();
    } else {
      exhaleAudio.play();
    };
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

volumeSlider.addEventListener('change', function (event) {
  const newVolume = event.target.value;
  exhaleAudio.volume = newVolume;
  inhaleAudio.volume = newVolume;
});

// Event listener for the Start button
startBtn.addEventListener('click', function () {
  // Disable the Start button and enable the Stop button
  startBtn.disabled = true;
  stopBtn.disabled = false;

  silentAudio.play();

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
