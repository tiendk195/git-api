const nextButton = document.getElementById("nextButton");
const image = document.getElementById("image");
const imageTypeSelect = document.getElementById("image-type");

function fetchRandomImage() {
  const selectedType = imageTypeSelect.value;
  const apiUrl = `https://nekobot.xyz/api/image?type=${selectedType}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        image.src = data.message;
      } else {
        console.error("Failed to fetch image:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
}

// Load initial image
fetchRandomImage();

// Add event listener to nextButton
nextButton.addEventListener("click", fetchRandomImage);

// Show access deny popup
window.onload = function () {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML =
    "<p>Access deny</p><button id='cancelButton'>Cancel</button>";
  document.body.appendChild(popup);

  const cancelButton = document.getElementById("cancelButton");
  let countdown = 5;

  const timer = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      cancelButton.style.display = "block";
    }
  }, 1000);

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(popup);
  });
};
