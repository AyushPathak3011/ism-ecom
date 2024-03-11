// Initialization
let maxAttempts = 5; // Maximum number of attempts per minute
const timerKey = 'bruteForceTimer';
const attemptsKey = 'bruteForceAttempts';

window.onload = function () {
  checkAndUpdateTimers();
};

// Function to make an API call
function sendRequest() {
  // Make your API call here, e.g., fetching data from the local server
  // ...

  incrementAttempts();
  checkAndUpdateTimers();
}

// Increment the number of attempts in the local storage
function incrementAttempts() {
  let currentAttempts = parseInt(localStorage.getItem(attemptsKey) || '0');
  currentAttempts++;
  localStorage.setItem(attemptsKey, currentAttempts);
}

// Function to check and update the timer and maximum attempts
function checkAndUpdateTimers() {
  let remainingAttempts = maxAttempts - parseInt(localStorage.getItem(attemptsKey) || '0');
  if (remainingAttempts <= 0) {
    // If no more attempts are left, disable the button and show an error message;
    document.getElementById('submitButton').disabled = true;
    document.getElementById('errorMessage').style.display = 'block';
    return;
  }

  if (localStorage.getItem(timerKey)) {
    const timeLeft = new Date().getTime() - JSON.parse(localStorage.getItem(timerKey)).time;
    if (timeLeft < 60 * 1000) {
      // If the timer has not expired yet
      document.getElementById('submitButton').disabled = true;
      document.getElementById('errorMessage').innerHTML = `Please wait 
${Math.floor((60 * 1000 - timeLeft) / 1000)} seconds before trying again`;
    } else {
      document.getElementById('submitButton').disabled = false;
      document.getElementById('errorMessage').style.display = 'none';
    }
  } else {
    localStorage.setItem(timerKey, new Date());
    sendRequest();
  }
}
