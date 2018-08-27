'use strict';
function Population(population, mutRate){
    this.rockets = [];
    this.popsize = population;
    this.maxFit = 0;
    this.averageFit = 0;
    this.recordPopulation = lifespan+10;
    this.trackFollowed = undefined;
    for(var i = 0; i< this.popsize; i++){
        this.rockets[i] = new Rocket();
    }
    this.run = function(){
        for(var i = 0; i< this.popsize; i++){
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
    this.evaluate = function(){
        this.maxFit = 0;
        this.recordPopulation = lifespan+10;
        this.trackFollowed = undefined;
        let normStats = 0;
        for(let i =0; i< this.popsize; i++){
            this.rockets[i].calculateFitness();
            normStats += this.rockets[i].fitness
            if (this.rockets[i].fitness > this.maxFit){
                this.maxFit = this.rockets[i].fitness;
            }
            if(this.rockets[i].success){
                let record = lifespan - this.rockets[i].speedFactor
                if(this.recordPopulation > record ){
                    this.recordPopulation = record;
                    this.trackFollowed = this.rockets[i].trail.slice();
                }
            }
        }
        for(let i =0; i< this.popsize; i++){
            this.rockets[i].prob = this.rockets[i].fitness/normStats;
        }
        this.averageFit = this.maxFit/this.popsize;
    }
    this.parentSelection = function(){
        let r = Math.random();
        let irocket = 0;
        while(r > 0 && irocket < this.popsize){
            r -= this.rockets[irocket].prob;
            irocket++;
        }
        irocket--
        return this.rockets[irocket];
    }
    this.selection = function(){
        let newRockets = [];
        for(let i = 0; i < this.popsize; i++){
            let parentA = this.parentSelection().dna;
            let parentB = this.parentSelection().dna;
            let child = parentA.crossOver(parentB);
            child.mutation(mutRate);
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }
}