/*
Left Hand Button Keyboard

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var leftBtnKbd;
var initLeftBtnKbd = function () {
    leftBtnKbd = new CLeftBtnKbd();

};

/* from FR-4x MIDI Implementation
MIDI Channel
0＝トレブル、
1＝ベース／フリーベース、
2＝コード、
3＝オーケストラ
4＝オーケストラ・ベース、
5＝オーケストラ・コード、
6＝オーケストラ・フリー・ベース、
*/

function toHex(v) {
    return '0x' + (('00' + v.toString(16).toUpperCase()).substr(-2));
}
//=================================================
//
// CLeftBtnKbd class
//
//=================================================
var eChordBtnType = {
    Major: Symbol("Maj"),
    Minor: Symbol("Min"),
    Seventh: Symbol("7th"),
    Diminish: Symbol("Dim"),
};

var NumOfRow = 20;
var LowestBtnNumOfRowA = 0;
var LowestBtnNumOfRowB = NumOfRow;
var LowestBtnNumOfRowC = LowestBtnNumOfRowB + NumOfRow;
var LowestBtnNumOfRowD = LowestBtnNumOfRowC + NumOfRow;
var LowestBtnNumOfRowE = LowestBtnNumOfRowD + NumOfRow;
var LowestBtnNumOfRowF = LowestBtnNumOfRowE + NumOfRow;

class CLeftBtnKbd {
    constructor() {

        var mKbdType = 0;// [0]: Stradella 2 Bass Row, [1]:

        var mNumOfRow = NumOfRow;

        this.mNumOfBtn = mNumOfRow * 6;
        this.btn = new Array(this.mNumOfBtn);

        var mLowestBtnNumOfRowA = LowestBtnNumOfRowA;
        var mLowestBtnNumOfRowB = LowestBtnNumOfRowB;
        var mLowestBtnNumOfRowC = LowestBtnNumOfRowC;
        var mLowestBtnNumOfRowD = LowestBtnNumOfRowD;
        var mLowestBtnNumOfRowE = LowestBtnNumOfRowE;
        var mLowestBtnNumOfRowF = LowestBtnNumOfRowF;

        var mLowestNoteNumOfRowA = 0x38;
        var mLowestNoteNumOfRowB = 0x34;
        var mLowestNoteNumOfRowC = 0x34;
        var mLowestNoteNumOfRowD = 0x34;
        var mLowestNoteNumOfRowE = 0x34;
        var mLowestNoteNumOfRowF = 0x34;

        var mGlobalXOfst = 70;
        var mGlobalYOfst = 80;
        var mXOfst = 10;
        var mXInterval = 24;

        var mYOfstA = mGlobalYOfst+ 0;
        var mYOfstB = mGlobalYOfst + 32/2+2;
        var mYOfstC = mGlobalYOfst + 64/2+4;
        var mYOfstD = mGlobalYOfst + 96/2+6;
        var mYOfstE = mGlobalYOfst + 128/2+8;
        var mYOfstF = mGlobalYOfst + 160/2+8;

        new CLeftBtnKbdBassBoard();

        var count;
        //-- Row A
        count = 0;
        for (var i = mLowestBtnNumOfRowA; i < (mLowestBtnNumOfRowA + mNumOfRow); i++) {
            switch(count%12) {
            case 0:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA);
                break;
            case 1:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 5);
                break;
            case 2:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA + 2);
                break;
            case 3:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 3);
                break;
            case 4:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 8);
                break;
            case 5:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 1);
                break;
            case 6:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 6);
                break;
            case 7:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA + 1);
                break;
            case 8:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 4);
                break;
            case 9:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA + 3);
                break;
            case 10:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 2);
                break;
            case 11:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval * count), mYOfstA, mLowestNoteNumOfRowA - 7);
                break;
            default:
                break;
            }
            this.btn[i].setChannel(1, 4);//-- Bass, Orch Bass
            count++;
        }
        //-- Row B
        count = 0;
        for (var i = mLowestBtnNumOfRowB; i < (mLowestBtnNumOfRowB + mNumOfRow); i++) {
            switch(count%12) {
            case 0:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB);
                break;
            case 1:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 7);
                break;
            case 2:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 2);
                break;
            case 3:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB - 3);
                break;
            case 4:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 4);
                break;
            case 5:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB - 1);
                break;
            case 6:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 6);
                break;
            case 7:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 1);
                break;
            case 8:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB - 4);
                break;
            case 9:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 3);
                break;
            case 10:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB - 2);
                break;
            case 11:
                this.btn[i] = new CBassBtn(i, (mGlobalXOfst + mXOfst + mXInterval*0.5 + mXInterval * count), mYOfstB, mLowestNoteNumOfRowB + 5);
                break;
            default:
                break;
            }
            this.btn[i].setChannel(1, 4);//-- Bass, Orch Bass
            count++;
        }
        //-- Row C
        count = 0;
        for (var i = mLowestBtnNumOfRowC; i < (mLowestBtnNumOfRowC + mNumOfRow); i++) {
            //this.btn[i] = new CChordBtn(i, (mXOfst+ mXInterval*1.0 + mXInterval * count), mYOfstC, (mLowestNoteNumOfRowC + count * 3));
            switch(count%12) {
            case 0:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC, eChordBtnType.Major);
                break;
            case 1:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 7, eChordBtnType.Major);
                break;
            case 2:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 2, eChordBtnType.Major);
                break;
            case 3:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC - 3, eChordBtnType.Major);
                break;
            case 4:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 4, eChordBtnType.Major);
                break;
            case 5:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC - 1, eChordBtnType.Major);
                break;
            case 6:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 6, eChordBtnType.Major);
                break;
            case 7:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 1, eChordBtnType.Major);
                break;
            case 8:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC - 4, eChordBtnType.Major);
                break;
            case 9:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 3, eChordBtnType.Major);
                break;
            case 10:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC - 2, eChordBtnType.Major);
                break;
            case 11:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.0 + mXInterval * count), mYOfstC, mLowestNoteNumOfRowC + 5, eChordBtnType.Major);
                break;
            default:
                break;
            }
            this.btn[i].setChannel(2, 5);//-- Chord, Orch Chord
            count++;
        }
        //-- Row D
        count = 0;
        for (var i = mLowestBtnNumOfRowD; i < (mLowestBtnNumOfRowD + mNumOfRow); i++) {
            //this.btn[i] = new CBassBtn(i, (mXOfst+ mXInterval*1.5 + mXInterval * count), mYOfstD, (mLowestNoteNumOfRowD + count * 3));
            switch(count%12) {
            case 0:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD, eChordBtnType.Minor);
                break;
            case 1:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 7, eChordBtnType.Minor);
                break;
            case 2:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 2, eChordBtnType.Minor);
                break;
            case 3:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD - 3, eChordBtnType.Minor);
                break;
            case 4:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 4, eChordBtnType.Minor);
                break;
            case 5:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD - 1, eChordBtnType.Minor);
                break;
            case 6:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 6, eChordBtnType.Minor);
                break;
            case 7:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 1, eChordBtnType.Minor);
                break;
            case 8:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD - 4, eChordBtnType.Minor);
                break;
            case 9:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 3, eChordBtnType.Minor);
                break;
            case 10:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD - 2, eChordBtnType.Minor);
                break;
            case 11:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*1.5 + mXInterval * count), mYOfstD, mLowestNoteNumOfRowD + 5, eChordBtnType.Minor);
                break;
            default:
                break;
            }
            this.btn[i].setChannel(2, 5);//-- Chord, Orch Chord
            count++;
        }
        //-- Row E
        count = 0;
        for (var i = mLowestBtnNumOfRowE; i < (mLowestBtnNumOfRowE + mNumOfRow); i++) {
            //this.btn[i] = new CBassBtn(i, (mXOfst+ mXInterval*2.0 + mXInterval * count), mYOfstE, (mLowestNoteNumOfRowE + count * 3));
            switch(count%12) {
            case 0:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE, eChordBtnType.Seventh);
                break;
            case 1:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 7, eChordBtnType.Seventh);
                break;
            case 2:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 2, eChordBtnType.Seventh);
                break;
            case 3:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE - 3, eChordBtnType.Seventh);
                break;
            case 4:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 4, eChordBtnType.Seventh);
                break;
            case 5:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE - 1, eChordBtnType.Seventh);
                break;
            case 6:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 6, eChordBtnType.Seventh);
                break;
            case 7:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 1, eChordBtnType.Seventh);
                break;
            case 8:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE - 4, eChordBtnType.Seventh);
                break;
            case 9:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 3, eChordBtnType.Seventh);
                break;
            case 10:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE - 2, eChordBtnType.Seventh);
                break;
            case 11:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.0 + mXInterval * count), mYOfstE, mLowestNoteNumOfRowE + 5, eChordBtnType.Seventh);
                break;
            default:
                break;
            }
            this.btn[i].setChannel(2, 5);//-- Chord, Orch Chord

            count++;
        }
        //-- Row F
        count = 0;
        for (var i = mLowestBtnNumOfRowF; i < (mLowestBtnNumOfRowF + mNumOfRow); i++) {
            //this.btn[i] = new CBassBtn(i, (mXOfst+ mXInterval*2.5 + mXInterval * count), mYOfstF, (mLowestNoteNumOfRowF + count * 3));

            switch(count%12) {
            case 0:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF, eChordBtnType.Diminish);
                break;
            case 1:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 7, eChordBtnType.Diminish);
                break;
            case 2:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 2, eChordBtnType.Diminish);
                break;
            case 3:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF - 3, eChordBtnType.Diminish);
                break;
            case 4:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 4, eChordBtnType.Diminish);
                break;
            case 5:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF - 1, eChordBtnType.Diminish);
                break;
            case 6:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 6, eChordBtnType.Diminish);
                break;
            case 7:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 1, eChordBtnType.Diminish);
                break;
            case 8:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF - 4, eChordBtnType.Diminish);
                break;
            case 9:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 3, eChordBtnType.Diminish);
                break;
            case 10:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF - 2, eChordBtnType.Diminish);
                break;
            case 11:
                this.btn[i] = new CChordBtn(i, (mGlobalXOfst + mXOfst + mXInterval*2.5 + mXInterval * count), mYOfstF, mLowestNoteNumOfRowF + 5, eChordBtnType.Diminish);
                break;
            default:
                break;
            }
            this.btn[i].setChannel(2, 5);//-- Chord, Orch Chord

            count++;
        }

        //-- Timer
        this.timer(60);

    }

    timer(interval) {
       setInterval(function() {
           $("#left_btn_kbd_container").css("top", grobalLeftYPos);
        }.bind(this), interval);

    }

    receiveEvent(event) {
        for (var i = 0; i < this.mNumOfBtn; i++) {
            this.btn[i].receiveEvent(event);
        }
    }
};


//=================================================
//
// CRightBtnKbdBassBoard class
//
//=================================================

class CLeftBtnKbdBassBoard {
    constructor() {
        //-- Canvas
        this.canvas = $('.left_btn_kbd').get(0);
        if(! this.canvas || ! this.canvas.getContext) return;
        this.ctx = this.canvas.getContext("2d");

        this.draw(0, 0, 700, 200);
        this.drawInner(50, 60, 600, 140);
    }

    draw(posx, posy, width, height) {
        //-- Outside
        var roundSize = 50;
        var shrimpSize= 10;
        var shrimpStartYOfst= 150;
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

    drawInner(posx, posy, width, height) {
        var radius = 20;
        this.ctx.beginPath();
        var grad  = this.ctx.createLinearGradient(posx, posy, posx, posy+height);
        grad.addColorStop(0,'rgba(20, 0, 0, 0.6)');
        grad.addColorStop(1,'rgba(70, 0, 0, 0.6)');
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
// CBassBtn class
//
//=================================================

class CBassBtn {
    constructor(btnNum, x, y, noteNum) {
    	//-- Canvas
    	this.canvas = $('.left_btn_kbd').get(0);
    	if(! this.canvas || ! this.canvas.getContext) return;
    	this.ctx = this.canvas.getContext("2d");
    	this.w = this.canvas.width;
    	this.h = this.canvas.height;
    	this.grad = null;

    	//-- Position
        this.x = x;
        this.y = y;

        //-- Btn Num
        this.btnNum = btnNum;

        //-- Note Infomation
        this.isNoteOn = false;
        this.isNoteOnPre = false;
        this.noteNum = noteNum;
        this.cOfst = this.noteNum%12;

        //-- Channel
        this.accCh = undefined;
        this.orchCh = undefined;

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

        //-- Expression
        this.expression = 0;
        this.expressionPre = 0;

        //-- Draw
        this.drawBtn(this.isNoteOn);

        //-- Timer
        this.timer(60);

    }

    timer(interval) {
       setInterval(function() {

          if (this.isNoteOn != this.isNoteOnPre) {
                this.drawBtn(this.isNoteOn);
          } else if (this.isNoteOn && this.expression != this.expressionPre) {
                this.drawBtn(this.isNoteOn);
          }
          this.isNoteOnPre = this.isNoteOn;
          this.expressionPre = this.expression;

        }.bind(this), interval);

    }



    setChannel(accCh, orchCh) {
        this.accCh = accCh;
        this.orchCh = orchCh;
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
            //if (event.data[1] != this.noteNum) {
            //    return;
            //}
            //-- Ch Check
            if (noteCh == this.accCh || noteCh == this.orchCh) {
           		this.noteOnKey(event.data[1]);
            } else {
            }
        //-- Note Off
        } else if ((noteEv == 0x90 && event.data[2] == 0) || noteEv == 0x80) {
            //-- Note Num Check
            //if (event.data[1] != this.noteNum) {
            //    return;
            //}
            //-- Ch Check
            if (noteCh == this.accCh || noteCh == this.orchCh) {
        		this.noteOffKey(event.data[1]);
            } else {
            }
        }

        //-- Expression
        if (noteEv == 0xB0 && (event.data[1] == 0x07 || event.data[1] == 0x0B )) {// Volume:7 Expression:11
            this.expression = event.data[2];
        }
    }

    noteOnKey(noteNum) {
        //-- Note Num Check
        if (noteNum != this.noteNum && noteNum != this.noteNum - 12 && noteNum != this.noteNum - 24) {
            return;
        }
        this.isNoteOn = true;
    }

    noteOffKey(noteNum) {
        //-- Note Num Check
        if (noteNum != this.noteNum && noteNum != this.noteNum - 12 && noteNum != this.noteNum - 24) {
            return;
        }
        this.isNoteOn = false;
    }
    myAddColorStop(offset, r, g, b) {
      this.grad.addColorStop( offset, 'rgb('+ r +','+ g +','+ b +')');
    }
    drawBtn(isNoteOn) {
        var x = this.x;
        var y = this.y;
        var isBlack = this.isBlack;
        var radius = 7;//ボタンの半径
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
        this.ctx.arc(x + radius, y + radius, radius, 0, Math.PI*2, false);
        this.ctx.fill();

        //console.log(this.btnNum + " : " + LowestBtnNumOfRowB);
        if (this.btnNum >= LowestBtnNumOfRowB && this.btnNum < LowestBtnNumOfRowC) {
            if (this.cOfst === 0 || this.cOfst === 4 || this.cOfst === 8) {
                this.ctx.beginPath();
                if (this.cOfst === 8) {
                    this.ctx.fillStyle = 'rgba(30, 30, 30, 1.0)'; // 紫
                } else {
                    this.ctx.fillStyle = 'rgba(80, 80, 80, 1.0)'; // 紫
                }
                this.ctx.arc(x + radius, y + radius, radius/2, 0, Math.PI*2, false);
                this.ctx.fill();
            }
         }

    }
};

//=================================================
//
// CChordBtn class
//
//=================================================

class CChordBtn extends CBassBtn {
    constructor(btnNum, x, y, noteNum, chordType) {
        super(btnNum, x, y, noteNum);

        this.chordType = chordType;
        this.btnVoicing = new Array();

        switch (chordType) {
        case eChordBtnType.Major:
            this.btnVoicing[0] = this.noteNum;
            this.btnVoicing[1] = this.noteNum + 4;// major 3rd
            this.btnVoicing[2] = this.noteNum + 7;// 5th

            if(this.btnVoicing[0] > 0x3b) { this.btnVoicing[0] -= 12; }
            if(this.btnVoicing[1] > 0x3b) { this.btnVoicing[1] -= 12; }
            if(this.btnVoicing[2] > 0x3b) { this.btnVoicing[2] -= 12; }
            if(this.btnVoicing[0] < 0x30) { this.btnVoicing[0] += 12; }
            if(this.btnVoicing[1] < 0x30) { this.btnVoicing[1] += 12; }
            if(this.btnVoicing[2] < 0x30) { this.btnVoicing[2] += 12; }
            this.btnVoicing.sort();

            break;
        case eChordBtnType.Minor:
            this.btnVoicing[0] = this.noteNum;
            this.btnVoicing[1] = this.noteNum + 3;// minor 3rd
            this.btnVoicing[2] = this.noteNum + 7;// 5th

            if(this.btnVoicing[0] > 0x3b) { this.btnVoicing[0] -= 12; }
            if(this.btnVoicing[1] > 0x3b) { this.btnVoicing[1] -= 12; }
            if(this.btnVoicing[2] > 0x3b) { this.btnVoicing[2] -= 12; }
            if(this.btnVoicing[0] < 0x30) { this.btnVoicing[0] += 12; }
            if(this.btnVoicing[1] < 0x30) { this.btnVoicing[1] += 12; }
            if(this.btnVoicing[2] < 0x30) { this.btnVoicing[2] += 12; }
            this.btnVoicing.sort();

            break;
        case eChordBtnType.Seventh:
            this.btnVoicing[0] = this.noteNum;
            this.btnVoicing[1] = this.noteNum + 4;// major 3rd
            this.btnVoicing[2] = this.noteNum + 10;// Dominant 7th

            if(this.btnVoicing[0] > 0x3b) { this.btnVoicing[0] -= 12; }
            if(this.btnVoicing[1] > 0x3b) { this.btnVoicing[1] -= 12; }
            if(this.btnVoicing[2] > 0x3b) { this.btnVoicing[2] -= 12; }
            if(this.btnVoicing[0] < 0x30) { this.btnVoicing[0] += 12; }
            if(this.btnVoicing[1] < 0x30) { this.btnVoicing[1] += 12; }
            if(this.btnVoicing[2] < 0x30) { this.btnVoicing[2] += 12; }
            this.btnVoicing.sort();

            break;
        case eChordBtnType.Diminish:
            this.btnVoicing[0] = this.noteNum;
            this.btnVoicing[1] = this.noteNum + 3;// minor 3rd
            this.btnVoicing[2] = this.noteNum + 9;// 6th

            if(this.btnVoicing[0] > 0x3b) { this.btnVoicing[0] -= 12; }
            if(this.btnVoicing[1] > 0x3b) { this.btnVoicing[1] -= 12; }
            if(this.btnVoicing[2] > 0x3b) { this.btnVoicing[2] -= 12; }
            if(this.btnVoicing[0] < 0x30) { this.btnVoicing[0] += 12; }
            if(this.btnVoicing[1] < 0x30) { this.btnVoicing[1] += 12; }
            if(this.btnVoicing[2] < 0x30) { this.btnVoicing[2] += 12; }

            break;
        }

        this.playVoicing = new Array();
    }

    noteOnKey(noteNum) {
        this.playVoicing.push(noteNum);
        if(this.playVoicing.length >= 3) {
            var sortVoicing = this.playVoicing;

            if(sortVoicing[0] > 0x3b) { sortVoicing[0] -= 12; }
            if(sortVoicing[1] > 0x3b) { sortVoicing[1] -= 12; }
            if(sortVoicing[2] > 0x3b) { sortVoicing[2] -= 12; }
            if(sortVoicing[0] < 0x30) { sortVoicing[0] += 12; }
            if(sortVoicing[1] < 0x30) { sortVoicing[1] += 12; }
            if(sortVoicing[2] < 0x30) { sortVoicing[2] += 12; }

            if (this.chordType !== eChordBtnType.Diminish) {
                sortVoicing.sort();
            }

            // for Debug
            // if (this.btnNum ==42) {
            //     console.log("REAL:" + toHex(sortVoicing[0]) + ","+ toHex(sortVoicing[1]) + ","+ toHex(sortVoicing[2]));
            //     console.log("TBLE:" + toHex(this.btnVoicing[0]) + ","+ toHex(this.btnVoicing[1]) + ","+ toHex(this.btnVoicing[2]));
            // }

            if (sortVoicing[0] === this.btnVoicing[0] && sortVoicing[1] === this.btnVoicing[1] && sortVoicing[2] === this.btnVoicing[2]) {
                this.isNoteOn = true;
            }
        }
    }

    noteOffKey(noteNum) {
        this.playVoicing.pop(noteNum);
        if(this.playVoicing.length === 0) {
            this.isNoteOn = false;
        }
    }
};
