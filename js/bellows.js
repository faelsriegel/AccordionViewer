/*
Bellows

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var bellows;
var initBellows = function () {
    bellows = new CBellows();
};

var timerInterval = 50; // 50 msec
var grobalLeftYPos = 0;
var grobalBellowsTop = 200;

//=================================================
//
// CBellows class
//
//=================================================

class CBellows {
    constructor() {
        //-- Canvas
        this.canvas = $('#bellows').get(0);
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
        for (var i = 0; i < 2; i++) {
            this.map[i] = new graph(0, 0);
        }

        this.context.fillStyle = null;
        this.context.strokeStyle = null;
        this.grad = null;
        this.pushpull = 0;

        this.integral  = 0;
        this.lengthFromBottom = 0;
        this.nowMove = 0;

        setInterval(function() {
            $("#bellows_container").css("top", grobalBellowsTop);
            this.draw();
        }.bind(this), timerInterval);

    };

    draw() {
        this.h = 100 + this.lengthFromBottom;

        //-- Clear graph area
        this.context.fillStyle = "#000000";

        for (var i = 0; i < 2; i++) {

            this.grad = this.context.createLinearGradient(0, 128 - this.map[i].val - 1, 0, this.h);
            if (this.map[i].pushpull) {
                this.grad.addColorStop(0, '#7869fd');
                this.grad.addColorStop(1, '#7869fd');
            } else {
                this.grad.addColorStop(0, '#fdb918');
                this.grad.addColorStop(1, '#fdb918');
            }
            this.context.fillStyle = this.grad;
        }


        //-- When Expression is 0, Bellews status change pull annd push.
        if (this.map[1].val === 0 && this.map[0].val !== 0 ) {
            this.nowMove = 0;
            //console.log("動きが止まった");
        } else if (this.map[1].val === 0 && this.map[0].val === 0 ) {
            this.nowMove = 1;
            //console.log("止まっている");
        } else if (this.map[1].val !== 0 && this.map[0].val === 0 ) {
            this.nowMove = 2;
            //console.log("動き始めた");
        } else {
            this.nowMove = 3;
            //console.log("動いている");
        }

        if (this.nowMove == 2) {
            if (this.pushpull) {
                this.pushpull = 0;
            } else {
                this.pushpull = 1;
            }
            this.map[1].pushpull = this.pushpull;
        }

        // push pull が転換した時から速度(cc11)を積分してベローの移動距離を計算
        // 以下いろいろチューニングを要した部分
        var maxIntegral = 128*(200000/timerInterval);
        if (this.pushpull) {// pull
            this.integral  = this.integral  + this.map[1].val;
            this.lengthFromBottom = 15000 * (this.integral/maxIntegral);
            if (this.lengthFromBottom  > 500) {
                this.pushpull = 0;
            }

        } else {// push
            this.integral  = this.integral  - this.map[1].val * 1.0;
            this.lengthFromBottom = 15000 * (this.integral/maxIntegral);
            if (this.integral  < 0) {
                this.integral  = 0;
                this.lengthFromBottom  = 0;
                this.pushpull = 1;
            }
        }
        //console.log("pushpull=" + this.pushpull + "  / Integral=" + this.integral + "  / lengthFromBottom=" + this.lengthFromBottom  + " /   H=" + this.h);

        var numOfFrame = 21;

        this.bellowsframe_yPos = new Array(numOfFrame);

        grobalLeftYPos = 300 - 100 - 200 - this.lengthFromBottom;
        grobalBellowsTop = 300 - 100 - this.lengthFromBottom;
        this.canvas.height = 100 + this.lengthFromBottom;

        //console.log(this.lengthFromBottom);
        for (var i = 0; i < numOfFrame; i++) {
            this.bellowsframe_yPos[i] =  (i*6) + i * this.lengthFromBottom/numOfFrame;
            this.context.fillRect(0, this.h - this.bellowsframe_yPos[i], 700, 2);
        }

        this.map[0] = Object.assign({}, this.map[1]);

    };

    receiveEvent(event) {

        var ev0 = event.data[0];

        //-- receive omni channel
        ev0 = ev0 & 0xf0;

        //-- MIDI Event Filter: Volume:7 Expression:11
        if (ev0 == 0xB0 && (event.data[1] == 0x07 || event.data[1] == 0x0B )) {
            this.map[1].val = event.data[2];

            //console.log(event.data[2]);
            //console.log(this.map[this.w-1]);
        }
    };
};
