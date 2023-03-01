song="";

LWX="";
LWY="";
RWX="";
RWY="";
keyLW="";
keyRW="";

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    POSE=ml5.poseNet(video, modelLoaded);
    POSE.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if(keyRW>0.2){
    circle(RWX, RWY, 20);
    if(RWY>=0&&RWY<=100){
        song.rate(0.5);
        document.getElementById("speed_display").innerHTML="Speed of song: 0.5x";
    }
    else if(RWY>100&&RWY<=200){
        song.rate(1);
        document.getElementById("speed_display").innerHTML="Speed of song: 1x";
    }
    else if(RWY>200&&RWY<=300){
        song.rate(1.5);
        document.getElementById("speed_display").innerHTML="Speed of song: 1.5x";
    }
    else if(RWY>300&&RWY<=400){
        song.rate(2);
        document.getElementById("speed_display").innerHTML="Speed of song: 2x";
    }
    else if(RWY>400&&RWY<=500){
        song.rate(2.5);
        document.getElementById("speed_display").innerHTML="Speed of song: 2.5x";
    }
}


    if(keyLW>0.2){
        circle(LWX, LWY, 20);
        numberLWY=Number(LWY);
        UNdecimalLWY=floor(numberLWY);
        volume=UNdecimalLWY/500;
        song.setVolume(volume);
        document.getElementById("volume_display").innerHTML="Volume of song: "+volume;
    }
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1.0);
    song.rate(1.0);
}

function modelLoaded(){
    console.log("MODEL LOADED");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        LWY=results[0].pose.leftWrist.y;
        LWX=results[0].pose.leftWrist.x;
        RWY=results[0].pose.rightWrist.y;
        RWX=results[0].pose.rightWrist.x;
        keyLW=results[0].pose.keypoints[9].score;
        keyRW=results[0].pose.keypoints[10].score;

        console.log("LWX: "+LWX);
        console.log("LWY: "+LWY);
        console.log("RWX: "+RWX);
        console.log("RWY: "+RWY);
        console.log("keyLW: "+keyLW);
        console.log("keyRW: "+keyRW);
    }
}