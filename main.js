function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", ModelLoaded);
}

function ModelLoaded() {
  console.log("ModelLoaded");
}

function draw() {
  image(video, 0,0,300,300);
  classifier.classify(video, gotresult);
}

var Last_result = '';

function gotresult(error, result) {
  if (error) {
    console.error("error");
  }

  else{

    if (( result[0].confidence > 0.5) && (Last_result != result[0].label)) {
      console.log("results");
      Last_result = result[0].label;
      var Synth = window.speechSynthesis;
      var speak_data = result[0].label;
      var Utterthis = new SpeechSynthesisUtterance(speak_data);
      Synth.speak(Utterthis);

      document.getElementById("result_object_name").innerHTML = result[0].label;

      document.getElementById("result_accuracy_name").innerHTML = result[0].confidence.toFixed(2);
    }
  }
}
