status = '';
objects = [];
function preload(){
alarm = loadSound("alarm.mp3");
}
function setup(){
canvas = createCanvas(400, 370);
canvas.center();
video = createCapture(VIDEO);
video.hide();

objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Detecting Objects";
}
function draw(){
image(video, 0, 0, 400, 370);
if(status != ""){
    objectDetector.detect(video, gotResults);
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Object Detected";
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        text(objects[i].label, objects[i].x + 15, objects[i].y + 15);

        if(objects[i].label == "person"){
            document.getElementById("baby_detect").innerHTML = "Baby Found";
            alarm.stop();
        }
        else{
            document.getElementById("baby_detect").innerHTML = "Baby Not Found";
            alarm.play(); 
        }
    }
}
}
function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}
function gotResults(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}