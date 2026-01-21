async function predictImage() {
    const fileInput = document.getElementById("imageInput");
    const result = document.getElementById("result");

    if (!fileInput.files.length) {
        result.innerText = "Please upload an image first.";
        return;
    }

    result.innerText = "Analyzing image...";

    const imageFile = fileInput.files[0];

    // 🔴 DIRECT VALUES (for static app demo)
    const predictionUrl = "https://eyeemotioncustomvision-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/9911eeb2-c049-4f20-a122-58e9fab4440b/classify/iterations/eye-emotion-model-v1/url";
    const predictionKey = "BAbCVxBtPbn8hkh4gZjgPRWKUuLAAjCU2TZmIX2Pph1hltAiINpdJQQJ99CAACYeBjFXJ3w3AAAIACOGDtsA";

    try {
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
