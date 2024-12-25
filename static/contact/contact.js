document.addEventListener("DOMContentLoaded", function () {
  const sendLetterButton = document.getElementById("sendLetter");

  sendLetterButton.addEventListener("click", function () {
    // Add the "sent" class to trigger the animation for the result message
    document.body.classList.add("sent");
  });
});
