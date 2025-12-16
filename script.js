function appendToDisplay(message) {
  const display = document.getElementById('display');
  if (display) {
    display.value = message + display.value;
  }
}
