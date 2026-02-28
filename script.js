const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", function (e) {
  const copyBtn = e.target.closest(".copy-btn");
  const colorBox = e.target.closest(".color-box");
  const hex_value = e.target.closest(".hex-value");
  const colorElement = e.target.closest(".color");

  if (!colorBox) return;
  const hexValue = colorBox && colorBox.querySelector(".hex-value").textContent;
  if (!hexValue) return;

  navigator.clipboard
    .writeText(hexValue)
    .then(() => showCopySucess(colorBox.querySelector(".copy-btn")))
    .catch((err) => console.log(err));
});

function showCopySucess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}
generatePalette();
