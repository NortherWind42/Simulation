"use strict";

let instance, functionLine, startValue, finishValue, rectangleHeight;

function draw() {
    try {

        functionLine = document.getElementById('function').value;

        startValue = document.getElementById('start').value;
        finishValue = document.getElementById('finish').value;
        rectangleHeight = eval("let x = " + finishValue + ";" + functionLine);

        instance = functionPlot({
            target: '#plot',
            data: [
                {
                    fn: functionLine
                },
                {
                    points: [
                        [startValue, 0], //x, y
                        [finishValue, 0],
                        [finishValue, rectangleHeight],
                        [startValue, rectangleHeight],
                        [startValue, 0]
                    ],
                    fnType: 'points',
                    graphType: 'polyline'
                },
                {
                    points: [
                    ],
                    fnType: 'points',
                    graphType: 'scatter'
                }
            ]
        })
    }
    catch (err) {
        console.log(err);
        alert(err);
    }
};

function addPoint() {
    instance.options.data[2].points.push([randomInRange(+startValue, +finishValue), randomInRange(0, +rectangleHeight)]);
}

function getVal() {
    let up = 0, under = 0;
    for (let point of instance.options.data[2].points) {
        eval("let x = " + point[0] + ";" + functionLine) >= +point[1] ? under++ : up++;
    }
    let output = under/up;
    console.log(`up: ${up} | under: ${under}`);
    return output;
}

function randomInRange(start, end) {
    let output = Math.floor(Math.random() * (end - start + 1) + start);
    return output;
}

