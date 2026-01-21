function predictImage() {
    const fileInput = document.getElementById("imageInput");
    const result = document.getElementById("result");

    if (fileInput.files.length === 0) {
        result.innerText = "Please upload an image first.";
        return;
    }

    result.innerText = "Image uploaded successfully. AI prediction will come here.";
}
