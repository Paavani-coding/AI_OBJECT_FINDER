objectDetector="";
input="";
objects = [];
status = "";

function preload(){
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300,300);
  video.hide();
  synth= window.speechSynthesis;
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
  }

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input= document.getElementById("input").value;
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;

   
  }

  function draw() {
    image(video, 0, 0, 300, 300);
    
        if(status != "")
        {
          r =  random(255);
          g =  random(255);
          b =  random(255);      
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
   
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            

            if(objects[i].label == input)
            {
              document.getElementById("confirm").innerHTML = input +" found";
              console.log(input+ " found");
              utterThis= new SpeechSynthesisUtterance(input+ " found");
              synth.speak(utterThis);
            }
        }
    }  
  }
