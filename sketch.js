let points = [];
let d;
let canvas;
let testPoint;
let clearImage = null;
let tmpI;
let loopBool = true;

function preload() {
    img = loadImage('peter cartoon vvsmall.png');




}


function setup() {
    const picWidth = img.drawingContext.canvas.width;
    const picHeight = img.drawingContext.canvas.height;
    createCanvas(picWidth, picHeight);
    //tmpI = createGraphics(picWidth, picHeight);
    image(img, 0, 0);
    loadPixels();

    background(255);

    //image(img, 0, 0);



    for (let i = 0; i < (pixels.length / 4); i = i + 1) {

        const r = pixels[i * 4];
        const g = pixels[i * 4 + 1];
        const b = pixels[i * 4 + 2];
        const a = pixels[i * 4 + 3];
        const y = floor(i / picWidth);
        const x = floor(i % picWidth)

        if (r == 0 & g == 0 & b == 0) {

        } else {

            points.push(new Point(x, y, r, g, b));
        }

    }

    for (let i = 0; i < (pixels.length); i = i + 1) {
        pixels[i] = 0;
    }
    canvas = createCanvas(picWidth, picHeight);
    // canvas.parent('canvas')


    console.log(points.length + " points in the array");
    clear();

    // for (let i = 0; i < pixels.length; i++) {
    //     const element = array[i];

    // }

    canvas = createCanvas(picWidth * 4, picHeight * 4);
    canvas.remove();
    canvas.parent('canvas');

    canvas.mouseOver(loopOn);
    canvas.mouseOut(loopOn);


    for (let i = 0; i < points.length; i++) {
        points[i].render();

    }


}

function draw() {
    
    if (loopBool) {
        background(0);
        let count = 0
        for (let i = 0; i < points.length; i++) {

            
            points[i].flee();
            count = count + points[i].arrive();
            
            points[i].update();

            points[i].render();

           
        }
       
        if (count < 0.1 ) {
            loopBool = false;    // the face is recreated

        }
        
      
    }
    
    if (mouseX >0 && mouseX < width &&
        mouseY >0 && mouseY < height) {
        loopOn(); }
    //         for (let i = 0; i < points.length; i++) {
    //             //console.log("flee");
               
    //             points[i].flee();
    //             points[i].arrive();
    //             points[i].update();
        
    //             points[i].render();
                
    //         }
           
    // }
}

function resetFace() {
    loopBool = false;

    background(0);

    for (let i = 0; i < points.length; i++) {
        points[i].reset();

        points[i].render();
    }


    // for (let i = 0; i < points.length; i++) {
    //    // points[i].reset();
    //     points[i].render();
    // }


}

function loopOn() {
    loopBool = true;
  
}
