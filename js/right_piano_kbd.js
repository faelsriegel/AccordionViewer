/*
Right Hand Piano Keyboard

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

//=================================================
//
// CRightPianoKbd class
//
//=================================================

class CRightPianoKbd {
    constructor() {

        this.mKbdType = 1;// [0]:37keys 0x37~, [1]:41 keys 0x35~
        this.mNumOfWKey = 24;
        this.mNumOfBKey = 17;
        this.mNumOfKey = this.mNumOfWKey + this.mNumOfBKey;
        this.mWKey = new Array(this.mNumOfWKey);
        this.mBKey = new Array(this.mNumOfBKey);

        this.mGlobalXOfst = 15;
        this.mGlobalYOfst = 0;
        this.mXOfst = 0;
        this.mYOfstW = 105;
        this.mYOfstB = 50;;


        this.mXIntervalWhite = 28;
        this.mXIntervalOctave = this.mXIntervalWhite * 7;
        this.mXIntervalBlackGb = this.mXIntervalWhite * 0 + 10;
        this.mXIntervalBlackAb = this.mXIntervalWhite * 1 + 15;;
        this.mXIntervalBlackBb = this.mXIntervalWhite * 2 + 20;
        this.mXIntervalBlackDb = this.mXIntervalWhite * 4 + 11;
        this.mXIntervalBlackEb = this.mXIntervalWhite * 5 + 19;

        this.mWhiteKeyWidth = 23;
        this.mBlackKeyWidth = 18;
        this.mBlackKeyXOfst = 10;
        this.mXIntervalC  = 0;
        this.mXIntervalDb = this.mXIntervalC + this.mWhiteKeyWidth * 5 / 7 ;
        this.mXIntervalD  = this.mXIntervalC + this.mWhiteKeyWidth + 1;
        this.mXIntervalEb = this.mXIntervalD + this.mWhiteKeyWidth * 5 / 7 ;
        this.mXIntervalE  = this.mXIntervalD + this.mWhiteKeyWidth + 1;
        this.mXIntervalF  = this.mXIntervalE + this.mWhiteKeyWidth + 1;
        this.mXIntervalGb = this.mXIntervalF + this.mWhiteKeyWidth * 5 / 7 ;
        this.mXIntervalG  = this.mXIntervalF + this.mWhiteKeyWidth + 1;
        this.mXIntervalAb = this.mXIntervalG + this.mWhiteKeyWidth * 5 / 7 ;
        this.mXIntervalA  = this.mXIntervalG + this.mWhiteKeyWidth + 1;
        this.mXIntervalBb = this.mXIntervalA + this.mWhiteKeyWidth * 5 / 7 ;
        this.mXIntervalB  = this.mXIntervalA + this.mWhiteKeyWidth + 1;

        this.mLowestNoteNum = 0x35;
        this.mLowestNoteOfstC = this.mLowestNoteNum % 12;

        new CRightPianoKbdBassBoard();

        var noteNum = this.mLowestNoteNum;
        switch (this.mLowestNoteNum) {
            case 0x35: // F3 (41Keys)
                //-- White Keyboard
                for (var i = 0; i < this.mNumOfWKey; i++) {
                    noteNum = this.mLowestNoteNum + Math.floor(i / 7) * 12;
                    switch (i % 7) {
                        case 0: noteNum = noteNum + 0; break;//F
                        case 1: noteNum = noteNum + 2; break;//G
                        case 2: noteNum = noteNum + 4; break;//A
                        case 3: noteNum = noteNum + 6; break;//B
                        case 4: noteNum = noteNum + 7; break;//C
                        case 5: noteNum = noteNum + 9; break;//D
                        case 6: noteNum = noteNum + 11; break;//E
                        default: break;
                    }
                    //console.log("i:" + i + "  / (i % 7): " + (i % 7) + " /NoteNum: " + noteNum);
                    this.mWKey[i] = new CKey((this.mGlobalXOfst + this.mXOfst + this.mXIntervalWhite * i + 0), this.mGlobalYOfst + this.mYOfstW, noteNum);
                };
                //-- Black Keyboard
                for (var i = 0; i < this.mNumOfBKey; i++) {
                    noteNum = this.mLowestNoteNum + Math.floor(i / 5) * 12;
                    switch (i % 5) {
                        case 0://Gb
                            noteNum = noteNum + 1;
                            this.mBKey[i] = new CKey((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackGb + 3), this.mGlobalYOfst + this.mYOfstB, noteNum);
                            break;
                        case 1://Ab
                            noteNum = noteNum + 3;
                            this.mBKey[i] = new CKey((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackAb + 3), this.mGlobalYOfst + this.mYOfstB, noteNum);
                            break;
                        case 2://Bb
                            noteNum = noteNum + 5;
                            this.mBKey[i] = new CKey((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackBb + 3), this.mGlobalYOfst + this.mYOfstB, noteNum);
                            break;
                        case 3://Db
                            noteNum = noteNum + 8;
                            this.mBKey[i] = new CKey((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackDb + 3), this.mGlobalYOfst + this.mYOfstB, noteNum);
                            break;
                        case 4://Eb
                            noteNum = noteNum + 10;
                            this.mBKey[i] = new CKey((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackEb + 3), this.mGlobalYOfst + this.mYOfstB, noteNum);
                            break;
                        default: break;
                    }
                };
                break;
            default: break;
        }
    }

    receiveEvent(event) {
        for (var i = 0; i < this.mNumOfWKey; i++) {
            this.mWKey[i].receiveEvent(event);
        }
        for (var i = 0; i < this.mNumOfBKey; i++) {
            this.mBKey[i].receiveEvent(event);
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
// CRightPianoKbdBassBoard class
//
//=================================================

class CRightPianoKbdBassBoard {
    constructor() {
         this.mNumOfWKey = 24;
         this.mNumOfBKey = 17;
         this.mGlobalXOfst = 15;
         this.mGlobalYOfst = 0;
         this.mXOfst = 0;
         this.mYOfstW = 0;
         this.mYOfstB = 0;
         this.mXIntervalWhite = 28;
         this.mXIntervalOctave = this.mXIntervalWhite * 7;
         this.mXIntervalBlackGb = this.mXIntervalWhite * 0 + 10;
         this.mXIntervalBlackAb = this.mXIntervalWhite * 1 + 15;
         this.mXIntervalBlackBb = this.mXIntervalWhite * 2 + 20;
         this.mXIntervalBlackDb = this.mXIntervalWhite * 4 + 11;
         this.mXIntervalBlackEb = this.mXIntervalWhite * 5 + 19;

        //-- Canvas
        this.canvas = $('.right_btn_kbd').get(0);
        if(! this.canvas || ! this.canvas.getContext) return;
        this.ctx = this.canvas.getContext("2d");

        this.drawForm(0, 0, 700, 185);
        this.drawKeyboardBase(this.mGlobalXOfst, this.mGlobalYOfst, 28*24, 170);

        for (var i = 0; i < this.mNumOfWKey; i++) {
            this.drawRect((this.mGlobalXOfst + this.mXOfst + this.mXIntervalWhite * i + 0), this.mGlobalYOfst + this.mYOfstW, 28-3, 105);
        };

        for (var i = 0; i < this.mNumOfBKey; i++) {
            switch (i % 5) {
                case 0://Gb
                    this.drawRectB((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackGb + 3), this.mGlobalYOfst + this.mYOfstB, 18, 105);
                    break;
                case 1://Ab
                    this.drawRectB((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackAb + 3), this.mGlobalYOfst + this.mYOfstB, 18, 105);
                    break;
                case 2://Bb
                    this.drawRectB((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackBb + 3), this.mGlobalYOfst + this.mYOfstB, 18, 105);
                    break;
                case 3://Db
                    this.drawRectB((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackDb + 3), this.mGlobalYOfst + this.mYOfstB, 18, 105);
                    break;
                case 4://Eb
                    this.drawRectB((this.mGlobalXOfst + this.mXOfst + this.mXIntervalOctave * Math.floor(i / 5) + this.mXIntervalBlackEb + 3), this.mGlobalYOfst + this.mYOfstB, 18, 105);
                    break;
                default: break;
            }
        }
    }

    drawForm(posx, posy, width, height) {
        //-- Outside
        var roundSize = 40;
        var shrimpSize= 10;
        var shrimpStartYOfst= 160;
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
    drawKeyboardBase(posx, posy, width, height) {
        var radius = 4;
        this.ctx.fillStyle = 'rgb(30, 30, 30)';
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
        var radius = 0;
        this.ctx.beginPath();
        var grad  = this.ctx.createLinearGradient(posx, posy, posx, posy+height);
        grad.addColorStop(0,'rgba(150, 150, 150, 1.0)');
        grad.addColorStop(1,'rgba(200, 200, 200, 1.0)');
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

    drawRectB(posx, posy, width, height) {
        var radius = 0;
        this.ctx.beginPath();
        var grad  = this.ctx.createLinearGradient(posx, posy, posx, posy+height);
        grad.addColorStop(0,'rgba(10, 10, 10, 1.0)');
        grad.addColorStop(1,'rgba(10, 10, 10, 1.0)');
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
// CKey class
//
//=================================================

class CKey {
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
      //this.grad.addColorStop( offset, 'rgba('+ r +','+ g +','+ b + ',' + alpha + ')');
    }
    myAddColorStopB(offset, r, g, b) {
      //this.grad.addColorStop( offset, 'rgb('+ r +','+ g +','+ b + ')');
    }
    drawBtn(isNoteOn) {
        var x = this.x;
        var y = this.y;
        var isBlack = this.isBlack;
        var radius = 15;
        var whiteW = 25;
        var whiteV = 65;
        var blackW = 18;
        var blackV = 55;
        this.grad = this.ctx.createLinearGradient(x, y, x, y+100);

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
                this.myAddColorStop(0.0,  10,  10,  10);
                this.myAddColorStop(1.0,  0,  0,  0);
            } else {
                this.myAddColorStop(0.0, 200, 200, 200);
                this.myAddColorStop(1.0, 240, 240, 240);
            }
        }
        this.ctx.fillStyle = this.grad;

        if (isNoteOn) {
            if (isBlack) {
                this.drawRect(x, y, blackW, blackV);
            } else {
                this.drawRect(x, y, whiteW, whiteV);
            }
        } else {
            if (isBlack) {
                this.drawRect(x, y, blackW, blackV);
            } else {
                this.drawRect(x, y, whiteW, whiteV);
            }
        }
    }

    drawRect(posx, posy, width, height) {
        var radiusX = 12;
        var radiusY = 6;
        this.ctx.beginPath();
        this.ctx.moveTo(posx        , posy);
        this.ctx.lineTo(posx + width, posy);
        this.ctx.lineTo(posx + width, posy + height - radiusY);
        this.ctx.quadraticCurveTo(posx + width, posy + height, posx + width - radiusX, posy + height);
        this.ctx.lineTo(posx + radiusX, posy + height);
        this.ctx.quadraticCurveTo(posx, posy + height, posx, posy + height - radiusY);
        this.ctx.lineTo(posx, posy);
        this.ctx.fill();
    }
};
