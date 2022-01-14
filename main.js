objects = [];
status = "";

function preload()
{
    video = createVideo("video.mp4");
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start()
{
    objectDectector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects..";
}

function modelLoaded()
{
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDectector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object(s) detected!";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].length, objects[i].height);
        }
    }
}