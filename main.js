function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
    document.getElementById("draw_object").innerHTML = 'Sketch to be Drawn: ' + sketch;
}
function setup() {
    canvas = createCanvas(400,400);
    canvas.center();
    background("White");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function updateCanvas() {
    background("White");
}
function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    } 
    check_sketch();
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    if (results) {
        console.log(results);
        document.getElementById('sketch_label').innerHTML = 'Your Sketch: ' + results[0].label;
        document.getElementById('accuracy_label').innerHTML = 'Accuracy: ' + Math.round(results[0].confidence * 100) + '%';
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}
function check_sketch() {
    if (drawn_sketch==sketch) {
        answer_holder = "set";
        score = score + 1;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
    timer_counter = timer_counter + 1;
    document.getElementById("timer").innerHTML = "Time Left: " + timer_counter;
    if (timer_counter>1000) {
        timer_counter = 0;
        timer_check = "complete";
    }
    if (answer_holder == "set" || timer_check == "complete") {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
        random_number = Math.floor((Math.random() * array_art_names.length) + 1);
        sketch = array_art_names[random_number];
        document.getElementById("draw_object").innerHTML = 'Sketch to be Drawn: ' + sketch;
    }
}

array_art_names = ["Smile Emoji", "Moon", "Circle", "Cake", "Clock", "Doughnut"];
random_number = Math.floor(Math.random() * array_art_names.length);
console.log(array_art_names[random_number]);
sketch = array_art_names[random_number];

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
