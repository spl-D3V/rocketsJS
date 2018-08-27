'use strict';
let lifespan;
let maxAcc;
let populationSize;
let thresholdRep;
let maxReward;
let minReward;
let mutationRate;
let poprockets;
let newObstacle;
let obstacles = [];
let target;
let sourceRockets;
let radius = 30;
let count = 0;
let generation = 0
let trackWinners = [];
let recordGlobal;

p5.disableFriendlyErrors = true;
function setup(){
    let canvas = createCanvas(500, 400);
    canvas.parent(canvasContainer);
    html5stuff();
    target = new Target(width/5, 50, radius);
    sourceRockets = new Target(width*0.75, height, 35, true);
    poprockets = new Population(populationSize, mutationRate);
    printHTMLdata();
}

function draw(){
    background(0);
    target.show();
    sourceRockets.show();
    drawObstacles();
    poprockets.run();
    count++;
    if(count === lifespan){
        poprockets.evaluate();
        poprockets.selection();
        if(recordGlobal > poprockets.recordPopulation){
            if(trackWinners.length === 10){
                trackWinners.splice(0,1);
            }
            trackWinners.push(poprockets.trackFollowed.slice());
            recordGlobal = poprockets.recordPopulation;
        }
        count = 0;
        generation++
        printData = true;
    }
    drawTrails();
    printHTMLdata();
}

let drawTrails = function(){
    if (trackWinners.length){
        for(let i = 0; i < trackWinners.length; i++){
            push();
            beginShape();
            noFill();
            if(i===(trackWinners.length-1)){
                stroke(255, 204, 0, 200);
            }else{
                stroke(100);
            }
            strokeWeight(2);
            let trail = trackWinners[i];
            for(let j = 0; j < trail.length; j++){
                vertex(trail[j].x, trail[j].y);
            }
            endShape();
            pop();
        }
    }
}

let drawObstacles = function(){
    if(newObstacle){
        newObstacle.show();
    }
    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].show();
    }
}

let ResetPopulation = function(sourceX, sourceY){
    if(!sourceX && !sourceY){
        target = new Target(width/4, 50, radius);
    }
    sourceRockets = new Target(sourceX ? sourceX : width*0.75, sourceY ? sourceY : height, 35, true);
    poprockets = new Population(populationSize, mutationRate);
    obstacles = [];
    trackWinners = [];
    count = 0;
    generation = 0;
    recordGlobal = lifespan+1;
    printData = true;
    loop();
}