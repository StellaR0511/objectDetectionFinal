img = "";
status = "";
object = [];

function setup(){
canvas = createCanvas(640,420);
canvas.center();
objectDetected = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";

}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetected.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function preload(){

img = loadImage("web4.jpg");

}

function draw(){

image(img, 0,0,640,420);

if(status!=""){
    document.getElementById("status").innerHTML = "Status: Object Detected";
    for(i=0;i<object.length;i++){
        //console.log(object);
        fill("red");
        percent = floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%", object[i].x+5,object[i].y+20);
        noFill();
        stroke("red");
        rect(object[i].x,object[i].y, object[i].width, object[i].height);
    }
}
}