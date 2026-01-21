async function predictImage() {
    const fileInput = document.getElementById("imageInput");
    const result = document.getElementById("result");

    if (fileInput.files.length === 0) {
        result.innerText = "Please upload an image first.";
        return;
    }

    result.innerText = "Analyzing image...";

    const imageFile = fileInput.files[0];

    try {
        const response = await fetch(window.location.origin + "/api/predict", {
            method: "POST",
            body: imageFile
        });

        const data = await response.json();

        if (!data.predictions || data.predictions.length === 0) {
            result.innerText = "No prediction received.";
            return;
        }

        const topPrediction = data.predictions[0];
        const emotion = topPrediction.tagName;
        const confidence = (topPrediction.probability * 100).toFixed(2);

        result.innerText = `Emotion: ${emotion} (${confidence}%)`;

    } catch (error) {
        console.error(error);
        result.innerText = "Prediction failed. Please try again.";
    }
}
