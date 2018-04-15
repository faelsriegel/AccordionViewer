/*
Right Hand Button Keyboard

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var rightKbd;
var pianoKbd;
var btnKbd;
var isPianoType = 0;
var initRightKbd = function () {
    if (rightKbd == undefined) {
        rightKbd = new CRightBtnKbd();
    }
    isPianoType = 0;

    $(document.getElementById('kbd_btn_icon').contentDocument).find('#layer3').on("click", function() {
        changeRightKbd();
        return;
    });
    $(document.getElementById('right_btn_sys_icon').contentDocument).find('#layer3').on("click", function() {
        if (isPianoType == 1) {
            changeRightKbd();
        }
        return;
    });
};

var changeRightKbd = function () {
    if (rightKbd != undefined) {
        rightKbd.destructor();
        delete rightKbd;
    }
    if (isPianoType) {
        rightKbd = new CRightBtnKbd();
        isPianoType = 0;
    } else {
        rightKbd = new CRightPianoKbd();
        isPianoType = 1;
    }
};

//=================================================
//
// CRightBtnKbd class
//
//=================================================

class CRightBtnKbd {
    constructor() {

        var mKbdType = 0;// [0]:C system, [1]:B system

        var mNumOfRowA = 18;
        var mNumOfRowB = 19;
        var mNumOfRowC = 18;
        var mNumOfRowD = 19;
        var mNumOfRowE = 18;

        this.mNumOfBtn = mNumOfRowA + mNumOfRowB + mNumOfRowC + mNumOfRowD + mNumOfRowE;
        this.btn = new Array(this.mNumOfBtn);

        var mLowestBtnNumOfRowA = 0;
        var mLowestBtnNumOfRowB = mNumOfRowA;
        var mLowestBtnNumOfRowC = mLowestBtnNumOfRowB + mNumOfRowB;
        var mLowestBtnNumOfRowD = mLowestBtnNumOfRowC + mNumOfRowC;
        var mLowestBtnNumOfRowE = mLowestBtnNumOfRowD + mNumOfRowD;

        var mLowestNoteNumOfRowA = 0x31;
        var mLowestNoteNumOfRowB = 0x30;
        var mLowestNoteNumOfRowC = 0x32;
        var mLowestNoteNumOfRowD = 0x31;
        var mLowestNoteNumOfRowE = 0x33;

        var mGlobalXOfst = 45;
        var mGlobalYOfst = 20;
        var mXOfst = 15;
        var mXInterval = 32;

        var mYOfstA = 0;
        var mYOfstB = 32;
        var mYOfstC = 64;
        var mYOfstD = 96;
        var mYOfstE = 128;

        new CRightBtnKbdBassBoard();

        var count;
        //-- Row A
        count = 0;
        for (var i = mLowestBtnNumOfRowA; i < (mLowestBtnNumOfRowA + mNumOfRowA); i++) {
            this.btn[i] = new CBtn((mGlobalXOfst + mXOfst + mXInterval * count), mGlobalYOfst + mYOfstA, (mLowestNoteNumOfRowA + count * 3));
            count++;
        }
        //-- Row B
        count = 0;
        for (var i = mLowestBtnNumOfRowB; i < (mLowestBtnNumOfRowB + mNumOfRowB); i++) {
            this.btn[i] = new CBtn((mGlobalXOfst + 0 + mXInterval * count), mGlobalYOfst + mYOfstB, (mLowestNoteNumOfRowB + count * 3));
            count++;
        }
        //-- Row C
        count = 0;
        for (var i = mLowestBtnNumOfRowC; i < (mLowestBtnNumOfRowC + mNumOfRowC); i++) {
            this.btn[i] = new CBtn((mGlobalXOfst + mXOfst + mXInterval * count), mGlobalYOfst + mYOfstC, (mLowestNoteNumOfRowC + count * 3));
            count++;
        }
        //-- Row D
        count = 0;
        for (var i = mLowestBtnNumOfRowD; i < (mLowestBtnNumOfRowD + mNumOfRowD); i++) {
            this.btn[i] = new CBtn((mGlobalXOfst + 0 + mXInterval * count), mGlobalYOfst + mYOfstD, (mLowestNoteNumOfRowD + count * 3));
            count++;
        }
        //-- Row E
        count = 0;
        for (var i = mLowestBtnNumOfRowE; i < (mLowestBtnNumOfRowE + mNumOfRowE); i++) {
            this.btn[i] = new CBtn((mGlobalXOfst + mXOfst + mXInterval * count), mGlobalYOfst + mYOfstE, (mLowestNoteNumOfRowE + count * 3));
            count++;
        }


        this.rightBtnType_id = $(document.getElementById('right_btn_sys_icon').contentDocument).find('#layer3');
        this.rightBtnType_id.on("click", function() {
            if (isPianoType) return;

            if (mKbdType == 0) {
                mKbdType = 1;
                mLowestNoteNumOfRowA = 0x34;
                mLowestNoteNumOfRowB = 0x32;
                mLowestNoteNumOfRowC = 0x33;
                mLowestNoteNumOfRowD = 0x31;
                mLowestNoteNumOfRowE = 0x32;
            } else {
                mKbdType = 0;
                mLowestNoteNumOfRowA = 0x31;
                mLowestNoteNumOfRowB = 0x30;
                mLowestNoteNumOfRowC = 0x32;
                mLowestNoteNumOfRowD = 0x31;
                mLowestNoteNumOfRowE = 0x33;
            }

            //-- Update Note Assign
            var count;
            count = 0;
            for (var i = mLowestBtnNumOfRowA; i < (mLowestBtnNumOfRowA + mNumOfRowA); i++) {
                this.btn[i].setNote(mLowestNoteNumOfRowA + count * 3);
                count++;
            }
            count = 0;
            for (var i = mLowestBtnNumOfRowB; i < (mLowestBtnNumOfRowB + mNumOfRowB); i++) {
                this.btn[i].setNote(mLowestNoteNumOfRowB + count * 3);
                count++;
            }
            count = 0;
            for (var i = mLowestBtnNumOfRowC; i < (mLowestBtnNumOfRowC + mNumOfRowC); i++) {
                this.btn[i].setNote(mLowestNoteNumOfRowC + count * 3);
                count++;
            }
            count = 0;
            for (var i = mLowestBtnNumOfRowD; i < (mLowestBtnNumOfRowD + mNumOfRowD); i++) {
                this.btn[i].setNote(mLowestNoteNumOfRowD + count * 3);
                count++;
            }
            count = 0;
            for (var i = mLowestBtnNumOfRowE; i < (mLowestBtnNumOfRowE + mNumOfRowE); i++) {
                this.btn[i].setNote(mLowestNoteNumOfRowE + count * 3);
                count++;
            }

        }.bind(this));

    }

    receiveEvent(event) {
        for (var i = 0; i < this.mNumOfBtn; i++) {
            this.btn[i].receiveEvent(event);
        }
    }

    destructor() {
        this.canvas = $('.right_btn_kbd').get(0);
        if(! this.canvas || ! this.canvas.getContext) return;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

//=================================================
//
// CRightBtnKbdBassBoard class
//
//=================================================

class CRightBtnKbdBassBoard {
    constructor() {
        //-- Canvas
        this.canvas = $('.right_btn_kbd').get(0);
        if(! this.canvas || ! this.canvas.getContext) return;
        this.ctx = this.canvas.getContext("2d");

        this.draw(0, 0, 700, 200);
        this.drawRect(25, 20, 650, 31);
        this.drawRect(25, 52, 650, 31);
        this.drawRect(30, 84, 640, 31);
        this.drawRect(37, 116, 626, 31);
        this.drawRect(45, 148, 610, 31);
    }

    draw(posx, posy, width, height) {
        //-- Outside
        var roundSize = 50;
        var shrimpSize= 10;
        var shrimpStartYOfst= 80;
        this.ctx.beginPath();
        this.ctx.moveTo(posx, posy);
        this.ctx.lineTo(posx + width, posy);//上辺
        this.ctx.lineTo(posx + width, posy + shrimpStartYOfst);//右辺
        this.ctx.quadraticCurveTo(posx + width - shrimpSize , posy + height, posx + width - roundSize, posy + height);
        this.ctx.lineTo(posx + roundSize, posy + height);//底辺
        this.ctx.quadraticCurveTo(posx + shrimpSize, posy + height, posx, posy + shrimpStartYOfst);
        this.ctx.lineTo(posx, posy);
        var grad  = this.ctx.createLinearGradient(posx, posy, posx, posy+height);
        grad.addColorStop(0,'rgba(220, 0, 0, 0.7)');
        grad.addColorStop(0.93,'rgba(255, 0, 0, 0.7)');
        grad.addColorStop(1,'rgba(150, 0, 0, 0.7)');
        this.ctx.fillStyle = grad;
        this.ctx.fill();
    }

    drawRect(posx, posy, width, height) {
        var radius = 4;
        this.ctx.beginPath();
        var grad  = this.ctx.createLinearGradient(posx, posy, posx, posy+height);
        grad.addColorStop(0,'rgba(80, 0, 0, 0.6)');
        grad.addColorStop(1,'rgba(140, 0, 0, 0.6)');
        this.ctx.fillStyle = grad;

        this.ctx.beginPath();
        this.ctx.moveTo(posx + radius, posy);
        this.ctx.lineTo(posx + width - radius, posy);
        this.ctx.quadraticCurveTo(posx + width, posy, posx + width, posy + radius);
        this.ctx.lineTo(posx + width, posy + height - radius);
        this.ctx.quadraticCurveTo(posx + width, posy + height, posx + width - radius, posy + height);
        this.ctx.lineTo(posx + radius, posy + height);
        this.ctx.quadraticCurveTo(posx, posy + height, posx, posy + height - radius);
        this.ctx.lineTo(posx, posy + radius);
        this.ctx.quadraticCurveTo(posx, posy, posx + radius, posy);
        this.ctx.fill();
    }
}

//=================================================
//
// CBtn class
//
//=================================================

class CBtn {
    constructor(x, y, noteNum) {
    	//-- Canvas
    	this.canvas = $('.right_btn_kbd').get(0);
    	if(! this.canvas || ! this.canvas.getContext) return;
    	this.ctx = this.canvas.getContext("2d");
    	this.w = this.canvas.width;
    	this.h = this.canvas.height;
    	this.grad = null;

    	//-- Position
        this.x = x;
        this.y = y;

        //-- Note Infomation
        this.isNoteOn = false;
        this.isNoteOnPre = false;
        this.setNote(noteNum);

        //-- Expression
        this.expression = 0;
        this.expressionPre = 0;

        //-- Draw
        this.drawBtn(this.isNoteOn);

        //-- Set Interval
        setInterval(function() {
                if (this.isNoteOn != this.isNoteOnPre) {
                    this.drawBtn(this.isNoteOn);
                } else if (this.isNoteOn && this.expression != this.expressionPre) {
                    this.drawBtn(this.isNoteOn);
                }
                this.isNoteOnPre = this.isNoteOn;
                this.expressionPre = this.expression;
        }.bind(this), 60);
    }

    setNote(noteNum) {
        this.noteNum = noteNum;
        this.cOfst = this.noteNum%12;

        this.isBlack;
        switch (this.cOfst) {
        case 1:
        case 3:
        case 6:
        case 8:
        case 10:
            this.isBlack = true;
            break;
        default:
            this.isBlack = false;
            break;
        }
        this.drawBtn(this.isNoteOn);
    }
    receiveEvent(event) {

        var noteEv = event.data[0];
        var noteCh = event.data[0];
        noteEv = noteEv & 0xf0;
        noteCh = noteCh & 0x0f;

        //console.log(noteCh+"Ch");

        //-- Note On
        if (noteEv == 0x90 && event.data[2] > 0) {
            //-- Note Num Check
            if (event.data[1] != this.noteNum) {
                return;
            }
            //-- Ch Check
            if (noteCh == 0 || noteCh == 3) { // 1ch(Treble), 4ch(Orchestra)
           		this.noteOnKey(event.data[2]);
            } else {
            }
        //-- Note Off
        } else if ((noteEv == 0x90 && event.data[2] == 0) || noteEv == 0x80) {
            //-- Note Num Check
            if (event.data[1] != this.noteNum) {
                return;
            }
            //-- Ch Check
            if (noteCh == 0 || noteCh == 3) {
        		this.noteOffKey(event.data[2]);
            } else {
            }
        }

        //-- Expression
        if (noteEv == 0xB0 && (event.data[1] == 0x07 || event.data[1] == 0x0B )) {// Volume:7 Expression:11
            this.expression = event.data[2];
        }
    }

    noteOnKey(noteNum) {
        //console.log(noteNum);
        this.isNoteOn = true;
    }

    noteOffKey(noteNum) {
        //console.log(noteNum);
        this.isNoteOn = false;
    }

    myAddColorStop(offset, r, g, b, alpha) {
        switch (arguments.length) {
            case 5:
                this.grad.addColorStop( offset, 'rgba('+ r +','+ g +','+ b + ',' + 0.5 + ')');
                break;
            case 4:
            default:
                this.grad.addColorStop( offset, 'rgb('+ r +','+ g +','+ b + ')');
                break;
        }
    }
    myAddColorStopA(offset, r, g, b, alpha) {
      this.grad.addColorStop( offset, 'rgba('+ r +','+ g +','+ b + ',' + alpha + ')');
    }
    myAddColorStopB(offset, r, g, b) {
      this.grad.addColorStop( offset, 'rgb('+ r +','+ g +','+ b + ')');
    }
    drawBtn(isNoteOn) {
        var x = this.x;
        var y = this.y;
        var isBlack = this.isBlack;
        var radius = 15;//ボタンの半径

        this.grad = this.ctx.createRadialGradient( x + radius - radius/8, y + radius - radius/4, 4, x + radius, y + radius, radius ); //ボタン内側（明るい部分の円）の半径をあえてずらしています。

        if (isNoteOn) {

            // 押鍵時のエクスプレッションによる3色グラデーション制御
            var centgrad = 64;
            var diff1 = centgrad;
            var diff2 = 127-diff1;
            if (isBlack) {
                if (this.expression < centgrad) {// 黄緑 - 黄
                    this.myAddColorStop(0.0,   0 + Math.floor(((255)*this.expression)/diff1), 255, 0);
                    this.myAddColorStop(1.0,   0 + Math.floor(((255)*this.expression)/diff1), 255, 0);
                } else { //黄 - 赤
                    this.myAddColorStop(0.0, 255, 255 - Math.floor(((255)*(this.expression-diff1))/diff2), 0);
                    this.myAddColorStop(1.0, 255, 255 - Math.floor(((255)*(this.expression-diff1))/diff2), 0);
                }
            } else {
                if (this.expression < centgrad) {// 黄緑 - 黄
                    this.myAddColorStop(0.0,   0 + Math.floor(((255)*this.expression)/diff1), 255, 0);
                    this.myAddColorStop(1.0,   0 + Math.floor(((255)*this.expression)/diff1), 255, 0);
                } else { //黄 - 赤
                    this.myAddColorStop(0.0, 255, 255 - Math.floor(((255)*(this.expression-diff1))/diff2), 0);
                    this.myAddColorStop(1.0, 255, 255 - Math.floor(((255)*(this.expression-diff1))/diff2), 0);
                }
            }
        } else {
            if (isBlack) {
                this.myAddColorStop(0.0, 130, 130, 130);
                this.myAddColorStop(0.6,  90,  90,  90);
                this.myAddColorStop(0.8,  70,  70,  70);
                this.myAddColorStop(1.0,  60,  60,  60);
            } else {
                this.myAddColorStop(0.0, 230, 230, 230);
                this.myAddColorStop(0.6, 220, 190, 190);
                this.myAddColorStop(0.8, 160, 160, 160);
                this.myAddColorStop(1.0, 140, 140, 140);
            }
        }

        this.ctx.fillStyle = this.grad;

        this.ctx.beginPath();
        if (isNoteOn) {
            this.ctx.arc(x + radius, y + radius, radius-2, 0, Math.PI*2, false);
        } else {
            this.ctx.arc(x + radius, y + radius, radius, 0, Math.PI*2, false);
        }

        this.ctx.fill();

        // C and F marker
        if(this.cOfst == 0 || this.cOfst == 5) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = 'rgba(150, 150, 150, 1.0)';
                this.ctx.arc(x + radius, y + radius, radius/1.5, 0, Math.PI*2, false);
                this.ctx.stroke();
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
