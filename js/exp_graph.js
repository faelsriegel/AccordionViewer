/*
Expression Graph

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var expGraph;
var initExpGraph = function () {
    expGraph = new CExpGraph();
};

//=================================================
//
// CExpGraph class
//
//=================================================

class CExpGraph {
    constructor() {
        //-- Canvas
        this.canvas = $('#exp_graph').get(0);
        if(! this.canvas || ! this.canvas.getContext) return;
        this.context = this.canvas.getContext("2d");
        this.w = this.canvas.width;
        this.h = this.canvas.height;

        //-- new Graph Map
        function graph(_val, _pushpull) {
            this.val = _val;
            this.pushpull = _pushpull;
        }
        this.map = new Array();
        for (var i = 0; i < this.w; i++) {
            this.map[i] = new graph(0, 0);
        }

        this.context.fillStyle = null;
        this.context.strokeStyle = null;
        this.grad = null;
        this.pushpull = 0;

        setInterval(function() {
            this.drawExpGraph();
        }.bind(this), 100);
    };

    drawExpGraph() {
        //-- Clear graph area
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.w, this.h);

        //-- Draw graph
        for (var i = 0; i < this.w; i++) {

            if (i + 1 < this.w) {
                //-- Copy Object [from ES6]
                this.map[i] = Object.assign({}, this.map[i+1]);
                //this.map[i] = this.map[i+1];// NG
            }

            //-- Gradation Setting
            this.grad = this.context.createLinearGradient(0, this.h - this.map[i].val - 1, 0, this.h);
            if (this.map[i].pushpull) {
                this.grad.addColorStop(0, '#FF8000');
                this.grad.addColorStop(1, '#191007');
            } else {
                this.grad.addColorStop(0, '#FF0000');
                this.grad.addColorStop(1, '#190707');
            }
            this.context.fillStyle = this.grad;

            //-- Draw Virtical Line
            this.context.fillRect(i, this.h - this.map[i].val - 1, 1, this.map[i].val - 1);
        }

        //console.log(this.map[this.w - 1]);

    };

    receiveEvent(event) {

        var ev0 = event.data[0];

        //-- receive omni channel
        ev0 = ev0 & 0xf0;

        //-- MIDI Event Filter: Volume:7 Expression:11
        if (ev0 == 0xB0 && (event.data[1] == 0x07 || event.data[1] == 0x0B )) {
            this.map[this.w - 1].val = event.data[2];

            //-- Push-pull determination
            //-- It is not possible to make an accurate push-pull decision.
            if (event.data[2] == 0 && this.map[this.w - 2].val != 0) {
                if (this.pushpull) {
                    this.pushpull = 0;
                } else {
                    this.pushpull = 1;
                }
                this.map[this.w - 1].pushpull = this.pushpull;

            }
            
            //console.log(event.data[2]);
            //console.log(this.map[this.w-1]);
        }

    };
};
