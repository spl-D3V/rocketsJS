'use strict';
let btnStop;
let btnReset;
let btnResume;
let form;
let printData = true;
let lifeP;
let fitnessP;
let avgfitnessP;
let generationP;
let recordP;
let cicloVal;
let poblacionVal;
let mutacionVal;
let acelVal;
let maxrewVal;
let minrewVal;
let umbralVal;

let html5stuff = function(){
    lifeP = document.getElementById("count");
    fitnessP = document.getElementById("fitness");
    avgfitnessP = document.getElementById("avgfitness");
    generationP = document.getElementById("generation");
    recordP = document.getElementById("record");
    btnStop = document.getElementById("stop");
    btnStop.addEventListener("click", stopButton);
    btnResume = document.getElementById("resume");
    btnResume.addEventListener("click", resumeButton);
    btnReset = document.getElementById("reset");
    btnReset.addEventListener("click", resetButton);
    form = document.getElementById("form");
    form.addEventListener('submit', sendForm);
    canvas.addEventListener("mousedown", startMouseEvent);
    canvas.addEventListener("mousemove",movingObstacle)
    canvas.addEventListener("mouseup", endMouseEvent);
    canvas.addEventListener("dblclick", moveSource);
    canvas.addEventListener("click", startSketch);
    cicloVal = document.getElementById("ciclo");
    poblacionVal = document.getElementById("poblacion");
    mutacionVal = document.getElementById("mutacion");
    acelVal = document.getElementById("acel");
    maxrewVal = document.getElementById("maxrew");
    minrewVal = document.getElementById("minrew");
    umbralVal = document.getElementById("umbral");
    setDefaultValues();
}
let setDefaultValues = function(){
    lifespan = 200;
    populationSize = 30;
    mutationRate = 0.05;
    maxAcc = 0.15;
    maxReward = 80;
    minReward = 5;
    thresholdRep = 100;
    recordGlobal = lifespan+1;
    cicloVal.value = lifespan;
    poblacionVal.value = populationSize;
    mutacionVal.value = mutationRate;
    acelVal.value = maxAcc;
    maxrewVal.value = maxReward;
    minrewVal.value = minReward;
    umbralVal.value = thresholdRep;
}
let setNewValues = function(){
    lifespan = parseInt(cicloVal.value);
    populationSize = parseInt(poblacionVal.value);
    mutationRate = parseFloat(mutacionVal.value);
    maxAcc = parseFloat(acelVal.value);
    maxReward = parseInt(maxrewVal.value);
    minReward = parseInt(minrewVal.value);
    thresholdRep = parseInt(umbralVal.value);
    recordGlobal = lifespan+1;
}
let printHTMLdata = function(){
    if (printData){
        fitnessP.innerText = (poprockets ? poprockets.maxFit.toFixed(6) : 0.000000);
        avgfitnessP.innerText = (poprockets ? poprockets.averageFit.toFixed(6) : 0.000000);
        generationP.innerText = generation;
        recordP.innerText = recordGlobal;
        printData = false;
    }
    lifeP.innerText = count;
}
let stopButton = function(){
    noLoop();
    btnStop.hidden = true;
    btnResume.hidden = false;
}
let resumeButton = function(){
    loop();
    btnResume.hidden = true;
    btnStop.hidden = false;
}
let resetButton = function(){
    setDefaultValues();
    ResetPopulation();
    btnResume.hidden = true;
    btnStop.hidden = false;
}
let sendForm = function(e){
    e.preventDefault();
    if(e.target.checkValidity()){
        setNewValues();
        ResetPopulation();
        btnResume.hidden = true;
        btnStop.hidden = false;
    }
}
let startSketch = function(){
    started = true;
}
let startMouseEvent = function(e){
    let position = {x: mouseX, y:mouseY};
    if (e.button === 1){
        for(let i=0; i<obstacles.length; i++){
            if(obstacles[i].contains(position)){
                obstacles.splice(i,1);
                break;
            }
        }
        return false;
    }
    let obsDragged = obstacles.find(o => o.contains(position));
    if(obsDragged){
        obsDragged.offsetX = obsDragged.x - mouseX;
        obsDragged.offsetY = obsDragged.y -mouseY;
        obsDragged.isDragged = true;
        return false;
    }
    if(target.contains(position)){
        target.offsetX = target.x - mouseX;
        target.offsetY = target.y - mouseY;
        target.isDragged = true;
        return false;
    }
    newObstacle = new Obstacle(mouseX, mouseY, 0, 0);
};
let movingObstacle = function(){
    let obsDragged = obstacles.find(o => o.isDragged);
    if(obsDragged){
        obsDragged.x = mouseX + obsDragged.offsetX;
        obsDragged.y = mouseY + obsDragged.offsetY;
        return false;
    }
    if(newObstacle){
        newObstacle.w = mouseX - newObstacle.x;
        newObstacle.h = mouseY - newObstacle.y;
        return false;
    }
    if(target.isDragged){
        target.x = mouseX + target.offsetX;
        target.y = mouseY + target.offsetY;
        return false;
    }
};
let endMouseEvent = function(){
    if(newObstacle){
        newObstacle.w = mouseX - newObstacle.x;
        newObstacle.h = mouseY - newObstacle.y;
        obstacles.push(newObstacle);
        newObstacle = null;
    }else{
        obstacles.find(o => o.isDragged ? o.isDragged = false : undefined);
        target.isDragged = false;
    }
};
let moveSource = function(){
    ResetPopulation(mouseX, mouseY)
};