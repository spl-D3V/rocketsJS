'use strict';
class DNA {
    constructor(genes){
        this.genes = [];
        if(genes){
            this.genes = genes;
        }else{
            this.genes = [];
            for(let i = 0; i < lifespan; i++){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxAcc);
            }
        }
    }
}
DNA.prototype.crossOver = function(partner){
    let newDNA = [];
    let cut = Math.floor(Math.random()*this.genes.length);
    for(let i = 0; i< this.genes.length; i++){
        newDNA[i] = (i<=cut) ? this.genes[i] : partner.genes[i];
    }
    return new DNA(newDNA);
}
DNA.prototype.mutation = function(mutRate){
    for(let i = 0; i< this.genes.length; i++){
        if(Math.random() < mutRate){
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxAcc);
        }
    }
}