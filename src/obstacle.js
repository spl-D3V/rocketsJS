'use strict';
function Target(_x, _y, _r, source){
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragged = false;
    this.show = function(){
        if(source){
            push();
            fill(255, 155);
            ellipse(this.x, this.y, this.r, this.r);
            pop();
        }else{
            fill(255,0,0);
            ellipse(this.x, this.y, this.r, this.r);
            fill(255);
            ellipse(target.x, target.y, this.r*0.33, this.r*0.33);
        }
    }
    this.contains = function(pos){
        return dist(pos.x, pos.y, this.x, this.y) < this.r;
    }
}

function Obstacle(_x, _y, _w, _h){
    this.x = _x;
    this.y = _y;
    this.w = _w ? _w - _x : 0;
    this.h = _h ? _h - _y : 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragged = false;
    this.show = function(){
        stroke(0);
        strokeWeight(2);
        if(this.isDragged){
            fill(255, 155);
        }else{
            fill(175);
        }
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
    }
    this.contains = function(position) {
        if (position.x > this.x && position.x < (this.x + this.w) && 
            position.y > this.y && position.y < (this.y + this.h)){
            return true;
        }
        return false;
    }
}