class Point {


    constructor(x_, y_, r_, g_, b_) {

        this.r = r_;
        this.g = g_;
        this.b = b_;
        this.originalPos = createVector(x_, y_);
        //this.pos = createVector(x_, y_);
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);


    }

    render() {
        noStroke();
        fill(this.r, this.g, this.b);
        ellipse(this.pos.x * 4, this.pos.y * 4, 4, 4);


    }



    update() {


        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // clear the accumulated forces.


    }

    applyForce(f) {

        this.acc.add(f);
    }

    arrive() {
        let maxSpeed = 5;
        let maxForce = 2;

        let desired = p5.Vector.sub(this.originalPos, this.pos); // vector to the start
        let d = desired.mag();
        if (d < 5) {
            desired.setMag(map(d, 0, 5, 0, 5));
        } else {
            desired.setMag(maxSpeed);
        }

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(maxForce);
        this.applyForce(steer);
        return d;
    }

    flee() {
        let maxSpeed = 12;
        let maxForce = 2;
        let mouseV = createVector(mouseX * 0.25, mouseY * 0.25);
        //console.log(mouseV);
        let desired = p5.Vector.sub(mouseV, this.pos); // vector to the start
        let d = desired.mag();
        
        if (d < 30.0) {
            //console.log(d);
        desired.setMag(maxSpeed);
        desired.mult(-1);   //reverse it as we are fleeing
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(maxForce);
        this.applyForce(steer);
        }
        //this.update();
    }

    reset() {

        this.pos.x = this.originalPos.x;
        this.pos.y = this.originalPos.y;

    }

}