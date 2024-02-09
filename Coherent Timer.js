<!-- Dropdown for customizing the length of time -->
<label for="duration">Select duration (in minutes):</label>
<select id="duration">
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
    <option value="20">20</option>
</select>

<!-- Dropdown for customizing the duration between chimes -->
<label for="interval">Select interval duration (in seconds):</label>
<select id="interval">
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
</select>

<!-- Start/Stop buttons -->
<button id="startBtn">Start</button>
<button id="stopBtn" disabled>Stop</button>

<!-- Timer display -->
<div id="timer">00:00</div>

<!-- Breathing animation -->
<div id="breathingAnimation">Breathe In</div>

<script>
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

    // Function to play the breathing animation
    function playBreathingAnimation(inhale) {
    var animationElement = document.getElementById('breathingAnimation');
    animationElement.innerText = inhale ? 'Breathe In' : 'Breathe Out';
    animationElement.style.fontSize = inhale ? '24px' : '18px';
}

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

    // Update the breathing animation
    playBreathingAnimation(!isInhale);

    // Update the timer
    updateTimer(elapsedTime);

    // Check if the total duration has been reached
    if (elapsedTime >= totalDuration) {
    // Stop the timer
    stopTimer();
}
}

    // Event listener for the Start button
    document.getElementById('startBtn').addEventListener('click', function () {
    // Disable the Start button and enable the Stop button
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;

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

    // Clear the timer interval
    clearInterval(timerInterval);

    // Reset the breathing animation
    playBreathingAnimation(true);

    // Reset the timer display
    document.getElementById('timer').innerText = '00:00';
}
</script>