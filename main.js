Webcam.set({
    width: 350,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

Camera = document.getElementById("Camera");

Webcam.attach("Camera");

function Capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("Picture").innerHTML = "<img id='CapturedImage' src='" + data_uri + "'>";
    });
}

console.log("Ml5 Version:", ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vtNYrfayk/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded!");
}

function Identify() {
    Img = document.getElementById("CapturedImage");
    Classifier.classify(Img, GetResult);
}

function GetResult(Error, Results) {
    if (Error) {
        console.error(Error);
    } else {
        console.log(Results);
        document.getElementById("MemberName").innerHTML = "Member: " + Results[0].label;
        document.getElementById("MemberAccuracy").innerHTML = "Accuracy: " + (Results[0].confidence).toFixed(3) * 100 + "%";
    }
}