'use strict';
function Rocket(ndna){
    this.pos = createVector(sourceRockets.x, sourceRockets.y);
    this.vel = createVector();
    this.acc = createVector();
    this.prob = 0;
    this.fitness = 0;
    this.success = false;
    this.crashed = false;
    this.speedFactor = lifespan;
    this.trail = [];
    if(ndna){
        this.dna = ndna;
    }else{
        this.dna =  new DNA();
    }
    this.applyForce = function(force){
        this.acc.add(force);
    }
    this.calculateFitness = function(){
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        let penalty = 1.0;
        if(this.crashed){
            if((lifespan - this.speedFactor)<thresholdRep){
                penalty = 0.01;
            }else{
                let d = lifespan - thresholdRep;
                penalty = (d - this.speedFactor)/(10*d) + 0.01;
            }
        }
        else if(this.success){
            if((lifespan - this.speedFactor)<thresholdRep){
                penalty = maxReward;
            }else{
                penalty = ((maxReward - minReward)/(lifespan - thresholdRep))*this.speedFactor + minReward; 
            }
        }
        this.fitness = penalty/d;
    }
    this.crash = function(){
        if(!this.crashed && !this.success){
            if(this.pos.x < 0 || this.pos.x > width ||
               this.pos.y < 0 || this.pos.y > height){
                 this.crashed = true;
                 this.trail = [];
                 return;
            }
            for(let i = 0; i < obstacles.length; i++){
                if(obstacles[i].contains(this.pos)){
                    this.crashed = true;
                    this.trail = [];
                    break;
                }
            }
        }
    }
    this.goal = function(){
        if(!this.success){
            let d = (this.pos.x-target.x)*(this.pos.x-target.x)+(this.pos.y - target.y)*(this.pos.y - target.y);
            this.success = d < (target.r - 5)*(target.r - 5);
        }
    }
    this.update = function(){
        this.goal();
        this.crash();
        if(!this.crashed && !this.success){
            this.applyForce(this.dna.genes[count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.speedFactor--
            if(count % 2){
                this.trail.push({x:this.pos.x, y:this.pos.y});
            }
        }
    }
    this.show = function(){
        push();
        noStroke();
        fill(255, 155);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        triangle(-5, 5, -5, -5, 10, 0);
        pop();
    }
}