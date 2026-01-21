async function predictImage() {
    const fileInput = document.getElementById("imageInput");
    const result = document.getElementById("result");

    if (!fileInput.files.length) {
        result.innerText = "Please upload an image first.";
        return;
    }

    result.innerText = "Analyzing image...";

    const imageFile = fileInput.files[0];

    try {
        // These are injected by Azure Static Web Apps
        const predictionUrl = window.PREDICTION_URL;
        const predictionKey = window.PREDICTION_KEY;

        const response = await fetch(predictionUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Prediction-Key": predictionKey
            },
            body: imageFile
        });

        const data = await response.json();

        if (!data.predictions || data.predictions.length === 0) {
            result.innerText = "No prediction received.";
            return;
        }

        const top = data.predictions[0];
        result.innerText = `Emotion: ${top.tagName} (${(top.probability * 100).toFixed(2)}%)`;

    } catch (err) {
        console.error(err);
        result.innerText = "Prediction failed. Check console.";
    }
}
