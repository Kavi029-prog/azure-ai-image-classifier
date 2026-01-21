const API_URL = "/api/predict";

async function predictImage() {
  const fileInput = document.getElementById("imageInput");
  const result = document.getElementById("result");

  if (!fileInput.files.length) {
    result.innerText = "Please upload an image.";
    return;
  }

  result.innerText = "Analyzing image...";

  const imageFile = fileInput.files[0];

  const response = await fetch(API_URL, {
    method: "POST",
    body: imageFile
  });

  const data = await response.json();

  result.innerText = `Emotion: ${data.tag} (${data.probability}%)`;
}
