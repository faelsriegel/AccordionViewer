/*
Chord Display

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var chordDisplay;
var noteMap = new Array(128);

var initChordDisplay = function () {
    chordDisplay = new CChordDisplay();
};

//=================================================
//
// CChordDisplay class
//
//=================================================

class CChordDisplay {
    constructor() {
        this.noteMap = new Array(128);
        this.lowestNoteNum = 36;
        this.highestNoteNum = 84;
        this.chordName = "";
        this.rootdName = "";

        this.voicingMap = new Array(128);
        for (var i = 0; i < 128; i++) {
            this.voicingMap[i] = -1;
        }

        this.is0 = 0;
        this.is1 = 0;
        this.is2 = 0;
        this.is3 = 0;
        this.is4 = 0;
        this.is5 = 0;
        this.is6 = 0;
        this.is7 = 0;
        this.is8 = 0;
        this.is9 = 0;
        this.is10 = 0;
        this.is11 = 0;

        this.rootNoteNum = 0;
        this.rootOfst = -1;
        this.topNoteNum = 0;

        setInterval(function() {
            this.drawChord();
        }.bind(this), 100);
    }

    drawChord() {
        if (1) {
            //-- add span tag: omit is delete
            this.chordName = this.chordName.replace('(omit5)', '');
            this.chordName = this.chordName.replace('(omit3)', '');
        } else {
            //-- add span tag: omit is gray
            this.chordName = this.chordName.replace('(omit5)', '<span style="color:#444;">(omit5)</span>');
            this.chordName = this.chordName.replace('(omit3)', '<span style="color:#444;">(omit3)</span>');
        }

        if (this.chordName === "") {    // Root Display
            $('#chord_display').css('color', '#CCC');
            $('#chord_display').html(this.rootName);
        } else {                        // Chord Display
            $('#chord_display').css('color', '#0EE');
            $('#chord_display').html(this.chordName);
        }

        //$('#root_display').text(this.rootName);
    };

    setEvent(event) {

        // ノートマップ管理
        var noteEv = event.data[0];
        var noteCh = event.data[0];
        noteEv = noteEv & 0xf0;
        noteCh = noteCh & 0x0f;
        //console.log(noteCh+"Ch");
        if (noteEv == 0x90 && event.data[2] > 0) {
            if (noteCh == 0 || noteCh == 3) {// 1ch:Treble 4ch:Orchestra
                //nop
            } else if (noteCh == 1 || noteCh == 4) {// 2ch:Bass, FreeBass 5ch:Orch Bass
                noteMap[event.data[1]-12] = 1;//for FR-3 ベースパートのオクターブを下げて、ルートを補正してからコード解析させる。
            } else {// 3ch:Chord ...
                noteMap[event.data[1]] = 1;
            }
        } else if ((noteEv == 0x90 && event.data[2] == 0) || noteEv == 0x80) {
            if (noteCh == 0 || noteCh == 3) {// 1ch:Treble 4ch:Orchestra
                //nop
            } else if (noteCh == 1 || noteCh == 4) {// 2ch:Bass, FreeBass 5ch:Orch Bass
                noteMap[event.data[1]-12] = 0;
            } else {// 3ch:Chord ...
                noteMap[event.data[1]] = 0;
            }
        }
        /*
        if (event.data[0] == 0x90 && event.data[2] > 0) {
            noteMap[event.data[1]] = 1;
        } else if (event.data[0] == 0x90 && event.data[2] == 0) {
            noteMap[event.data[1]] = 0;
        } else if (event.data[0] == 0x80) {
            noteMap[event.data[1]] = 0;
        }
        */

        // 最低音ノート番号を検索
        this.rootOfst = -1;
        for (var i = 0; i < 128; i++) {
            if (noteMap[i] == 1) {
                this.rootOfst = i % 12;
                this.rootNoteNum = i;
                break;
            }
        }

        // 最高音ノート番号を検索
        for (var i = (128 - 1); i >= 0; i--) {
            if (noteMap[i] == 1) {
                this.topNoteNum = i;
                break;
            }
        }

        // ルートの文字列変換
        var rootStr;
        if (this.rootToStr(this.rootOfst) == "") {
            rootStr =  this.rootToStr(this.rootOfst);
        } else {
            rootStr = "" + this.rootToStr(this.rootOfst);
        }

        // ルートを基準にソートする。
        var count = 0;
        // 弾かれた鍵盤の最低音から最高音までをループ
        for (var i = this.lowestNoteNum; i <= this.highestNoteNum; i++) {
            if (noteMap[i] == 1) {
                this.voicingMap[count] = i;
                count++;
            } else {
                this.voicingMap[count] = -1;
            }
        }

        var chordStr = this.voicingMapToChordStr(this.voicingMap, count);

        // コード文字列を連結作成
        this.chordName = chordStr;
        this.rootName = rootStr;

    };

    rootToStr(root) {
        if (root<0) { return ""; }
        root += 12;
        var str = [ 'C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
        root = root%12;
        return str[root];
    }

    voicingMapToChordStr(voicingMap, count) {
        this.is0 = 0;
        this.is1 = 0;
        this.is2 = 0;
        this.is3 = 0;
        this.is4 = 0;
        this.is5 = 0;
        this.is6 = 0;
        this.is7 = 0;
        this.is8 = 0;
        this.is9 = 0;
        this.is10 = 0;
        this.is11 = 0;

        //console.log(count);

        var root = voicingMap[0];
        var chordStr = null;


        for (var i = 0; i < 128; i++) {
            if (voicingMap[i] == -1) break;

            switch ((voicingMap[i] - root)%12) {
            case 0:
                this.is0 = 1;
                break;
            case 1:
                this.is1 = 1;
                break;
            case 2:
                this.is2 = 1;
                break;
            case 3:
                this.is3 = 1;
                break;
            case 4:
                this.is4 = 1;
                break;
            case 5:
                this.is5 = 1;
                break;
            case 6:
                this.is6 = 1;
                break;
            case 7:
                this.is7 = 1;
                break;
            case 8:
                this.is8 = 1;
                break;
            case 9:
                this.is9 = 1;
                break;
            case 10:
                this.is10 = 1;
                break;
            case 11:
                this.is11 = 1;
                break;
            default:
                break;
            }
        }

        chordStr = "";

    /*
        if (count <= 2) {
            // N.C
        } else if (count == 3) {
            chordStr += this.voicing3MapToChordStr();
        } else if (count == 4) {
            chordStr += this.voicing4MapToChordStr();
        } else {
        }
    */
        if (count <= 2) {
            // N.C
        } else {
            chordStr += this.voicing4MapToChordStr();
        }
        return chordStr;
    }

    voicing4MapToChordStr() {
        //console.log(this.rootOfst);
        /*
        console.log(this.is0 + " , " + this.is1+ " , " + this.is2 + " , " + this.is3 + " , " + this.is4 + " , " + this.is5 + " , " + this.is6 + " , " + this.is7 + " , " + this.is8 + " , " + this.is9 + " , " + this.is10 + " , " + this.is11);
        console.log(this.voicingMap[0] + " , " + this.voicingMap[1]+ " , " + this.voicingMap[2] + " , " + this.voicingMap[3] + " , " + this.voicingMap[4] + " , " + this.voicingMap[5] + " , " + this.voicingMap[6] + " , " + this.voicingMap[7] +
        " , " + this.voicingMap[8] + " , " + this.voicingMap[9] + " , " + this.voicingMap[10] + " , " + this.voicingMap[11]);
        */

        var chordStr = "";
        if (this.is1) {// 第2音 (1度) //////////////////////

            if      (this.is2)  {// 第3音 (2度)

                if      (this.is3)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(-9)(9)(omit5)"; }
                else if (this.is4)  { chordStr += this.rootToStr(this.rootOfst + 1) + "m(-9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is5)  { chordStr += this.rootToStr(this.rootOfst + 2) + "mM7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 2) + "M7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "sus2(-9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "sus4-5/" + this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 2) + "M7(omit3)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "(+9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "m(9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "sus2(-9)(omit5)"; }

            } else if (this.is3)  {// 第3音 (短３度)

                if      (this.is4)  { chordStr += this.rootToStr(this.rootOfst + 1) + "mM9(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is5)  { chordStr += this.rootToStr(this.rootOfst + 1) + "M9(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m-5(-9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(-9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "sus4/" + this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "-5/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 3) + "7(omit3)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "mM7(-9)(omit5)"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "m(-9)(omit5)"; }

            } else if (this.is4)  {// 第3音 (長３度)

                if      (this.is5)  { chordStr += this.rootToStr(this.rootOfst + 1) + "(+9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "-5(-9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(-9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 1) + "m/" + this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "m-5/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 1) + "m7(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 1) + "m(omit5)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is5)  {// 第3音 (４度)

                if      (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4-5(-9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4(-9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 1) + "/" + this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "aug/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "m/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "sus2-5/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 1) + "(omit5)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is6)  {// 第3音 (減５度)

                if      (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 1) + "sus4-5/" + this.rootToStr(this.rootOfst); }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 1) + "sus4/" + this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 6) + "m/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 6) + "/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 6) + "sus4/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 6) + "5/" + this.rootToStr(this.rootOfst); }

            } else if (this.is7)  {// 第3音 (完全５度)

                if      (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "M7sus4(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 7) + "m-5/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 7) + "-5/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 7) + "sus4-5/" + this.rootToStr(this.rootOfst); }

            } else if (this.is8)  {// 第3音 (増５度)

                if      (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "M7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "m7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 1) + "7(omit3)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 1) + "5/" + this.rootToStr(this.rootOfst); }

            } else if (this.is9)  {// 第3音 (６度)

                if      (this.is10)  { chordStr += this.rootToStr(this.rootOfst + 10) + "mM7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 9) + "(9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 9) + "(omit5)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is10)  {// 第3音 (ドミナント７度)

                if      (this.is11)  { chordStr += this.rootToStr(this.rootOfst + 10) + "m(-9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 10) + "m(omit5)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is11)  {// 第3音 (メジャー７度)

                chordStr += this.rootToStr(this.rootOfst + 11) + "sus2(omit5)/" + this.rootToStr(this.rootOfst);

            }

        } else if (this.is2) {// 第2音 (2度) //////////////////////

            if      (this.is3)  {// 第3音 (短３度)

                if      (this.is4)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(9)(+9)(omit5)"; }
                else if (this.is5)  { chordStr += this.rootToStr(this.rootOfst + 2) + "m(-9)(omit5)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m-5(9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(add9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "(+11)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(9)(13)(omit5)"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "m9(omit5)"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "mM9(omit5)"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "m(9)(omit5)"; }

            } else if (this.is4)  {// 第3音 (長３度)

                if      (this.is5)  { chordStr += this.rootToStr(this.rootOfst + 2) + "m9(omit5)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "-5(9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "add9"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 0) + "+5(9)"; }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "sus4/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "-5/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "M9(omit5)"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "(9)(omit5)"; }

            } else if (this.is5)  {// 第3音 (４度)

                if      (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4-5(9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4(9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 2) + "m-5/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 2) + "m/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "m-5/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 2) + "m(omit5)/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is6)  {// 第3音 (減５度)
             //chordStr += this.rootToStr(this.rootOfst + 0) + "sus2-5";

                if      (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 7) + "M7sus4/" +  this.rootToStr(this.rootOfst); }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 2) + "-5/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 2) + "/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 2) + "aug/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "m/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 2) + "7(omit5)/" +  this.rootToStr(this.rootOfst); }
                //else                { chordStr += this.rootToStr(this.rootOfst + 0) + "sus2-5"; }

            } else if (this.is7)  {// 第3音 (完全５度)
             //chordStr += this.rootToStr(this.rootOfst + 0) + "sus2";

                if      (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "M7-5/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 2) + "sus4/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 7) + "m/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 7) + "/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "sus2"; }

            } else if (this.is8)  {// 第3音 (増５度)
             //chordStr += this.rootToStr(this.rootOfst + 8) + "-5/" + this.rootToStr(this.rootOfst);

                if      (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 0) + "6sus2+5"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7sus2+5"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 8) + "m-5/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 8) + "-5/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is9)  {// 第3音 (６度)
             //chordStr += this.rootToStr(this.rootOfst + 2) + "5/" + this.rootToStr(this.rootOfst);

                if      (this.is10)  { chordStr += this.rootToStr(this.rootOfst + 10) + "M7(omit5)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "m7(omit5)/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 2) + "5/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is10) {// 第3音 (ドミナント７度)
             //chordStr += this.rootToStr(this.rootOfst + 10) + "(omit5)/" + this.rootToStr(this.rootOfst);

                if      (this.is11)  { chordStr += this.rootToStr(this.rootOfst + 11) + "mM7(omit5)/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 10) + "(omit5)/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is11) {// 第3音 (メジャー７度)

                chordStr += this.rootToStr(this.rootOfst + 11) + "m(omit5)/" + this.rootToStr(this.rootOfst);

            }

        } else if (this.is3) {// 第2音 (短３度) //////////////////////

            if      (this.is4)  {// 第3音 (長３度)

                if      (this.is5)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(+9)(11)(omit5)"; }
                else if (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "-5(+9)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(+9)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "(-13)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "m(+11)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7(+9)(omit5)"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 4) + "M7(omit3)/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "(+9)(omit5)"; }

            } else if (this.is5)  {// 第3音 (４度)

                if      (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m-5(11)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(11)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 5) + "m7/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 5) + "7/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 10) + "sus4/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "-5/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 5) + "7(omit3)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is6)  {// 第3音 (減５度)

                if      (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(+11)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "7/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 0) + "dim7"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "m7-5"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "dim"; }

            } else if (this.is7)  {// 第3音 (完全５度)

                if      (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m(-13)"; }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m6"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "m7"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "mM7"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "m"; }

            } else if (this.is8)  {// 第3音 (増５度)

                if      (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 0) + "m6+5"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 3) + "sus4/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 8) + "m/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 8) + "/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is9)  {// 第3音 (６度)

                if      (this.is10) { chordStr += this.rootToStr(this.rootOfst + 9) + "m-5(-9)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "7(omit5)/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 9) + "dim/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is10) {// 第3音 (ドミナント７度)

                if      (this.is11)  { chordStr += this.rootToStr(this.rootOfst + 11) + "M7(omit5)/" +  this.rootToStr(this.rootOfst); }
                else                 { chordStr += this.rootToStr(this.rootOfst + 0) + "m7(omit5)/"; }

            } else if (this.is11) {// 第3音 (メジャー７度)
                chordStr += this.rootToStr(this.rootOfst + 0) + "mM7(omit5)";
            }

        } else if (this.is4) {// 第2音 (長３度) //////////////////////

            if        (this.is5)  {// 第3音 (４度)

                if      (this.is6)  { chordStr += this.rootToStr(this.rootOfst + 0) + "-5(11)"; }
                else if (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(11)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 5) + "mM7/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 5) + "M7/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 5) + "M7sus4/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "sus4-5/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "(11)(omit5)/"; }// this.rootToStr(this.rootOfst + 5) + "M7(omit3)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is6)  { // 第3音 (減５度)

                if      (this.is7)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(+11)"; }
                else if (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 8) + "aug7/" +  this.rootToStr(this.rootOfst); }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "m6/" +  this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7-5/"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "sus4/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "-5"; }

            } else if (this.is7)  { // 第3音 (完全５度)

                if      (this.is8)  { chordStr += this.rootToStr(this.rootOfst + 0) + "(-13)"; }
                else if (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 0) + "6"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "M7"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + ""; }

            } else if (this.is8)  { // 第3音 (増５度)

                if      (this.is9)  { chordStr += this.rootToStr(this.rootOfst + 9) + "mM7/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "aug7"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 4) + "/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "aug"; }

            } else if (this.is9)  { // 第3音 (６度)

                if      (this.is10) { chordStr += this.rootToStr(this.rootOfst + 9) + "m(-9)/" +  this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 4) + "sus4/" +  this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 9) + "m/" +  this.rootToStr(this.rootOfst); }

            } else if (this.is10) { // 第3音 (ドミナント７度)

                if      (this.is11)  { chordStr += this.rootToStr(this.rootOfst + 0) + "M7(+13)(omit5)"; }
                else                 { chordStr += this.rootToStr(this.rootOfst + 0) + "7(omit5)"; }

            } else if (this.is11) { // 第3音 (メジャー７度)

                chordStr += this.rootToStr(this.rootOfst + 4)+ "5/" + this.rootToStr(this.rootOfst);

            }

        } else if (this.is5) {// 第2音 (４度) //////////////////////

            if      (this.is6)  {

                if      (this.is7) { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4(+11)"; }
                else if (this.is8) { chordStr += this.rootToStr(this.rootOfst + 5) + "m(-9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is9) { chordStr += this.rootToStr(this.rootOfst + 5) + "(-9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7sus4-5"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "M7sus4-5"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4-5"; }

            } else if (this.is7)  {

                if      (this.is8) { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4(-13)"; }
                else if (this.is9) { chordStr += this.rootToStr(this.rootOfst + 0) + "6sus4"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7sus4"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "M7sus4"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "sus4"; }

            } else if (this.is8)  {

                if      (this.is9) { chordStr += this.rootToStr(this.rootOfst + 5) + "(+9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7sus4+5"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 5) + "m-5/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 5) + "m/" + this.rootToStr(this.rootOfst); }

            } else if (this.is9)  {

                if      (this.is10) { chordStr += this.rootToStr(this.rootOfst + 5) + "add4/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 5) + "-5/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 5) + "/" + this.rootToStr(this.rootOfst); }

            } else if (this.is10)  {

                if      (this.is11) { chordStr += this.rootToStr(this.rootOfst + 5) + "sus4-5/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 5) + "sus4/" + this.rootToStr(this.rootOfst); }

            } else if (this.is11)  {

                chordStr += this.rootToStr(this.rootOfst + 0) + "M7sus4(omit5)";

            }


        } else if (this.is6) {// 第2音 (減５度) //////////////////////

            if      (this.is7)  {

                if      (this.is8) { chordStr += this.rootToStr(this.rootOfst + 0) + "(+11)(-13)(omit3)"; }
                else if (this.is9) { chordStr += this.rootToStr(this.rootOfst + 6) + "m-5(-9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 7) + "mM7(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 7) + "M7(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "(+11)(omit3)"; }

            } else if (this.is8)  {

                if      (this.is9) { chordStr += this.rootToStr(this.rootOfst + 6) + "m-5(9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 6) + "-5(9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 8) + "m7(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 8) + "7(omit5)/" + this.rootToStr(this.rootOfst); }
                //else                { chordStr += this.rootToStr(this.rootOfst + 6) + "sus2-5/" + this.rootToStr(this.rootOfst); }

            } else if (this.is9)  {

                if      (this.is10) { chordStr += this.rootToStr(this.rootOfst + 6) + "-5(+9)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "7(omit3)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 6) + "m-5/" + this.rootToStr(this.rootOfst); }

            } else if (this.is10)  {

                if      (this.is11) { chordStr += this.rootToStr(this.rootOfst + 11) + "M7(omit3)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 6) + "-5/" + this.rootToStr(this.rootOfst); }

            } else if (this.is11)  {
                chordStr += this.rootToStr(this.rootOfst + 11)+ "5/" + this.rootToStr(this.rootOfst);
            }

        } else if (this.is7) {// 第2音 (完全５度) //////////////////////

            if      (this.is8)  {

                if      (this.is9) { chordStr += this.rootToStr(this.rootOfst + 0) + "6(-13)(omit3)"; }
                else if (this.is10) { chordStr += this.rootToStr(this.rootOfst + 8) + "M9(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 8) + "mM7(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "(-13)(omit3)"; }

            } else if (this.is9)  {

                if      (this.is10) { chordStr += this.rootToStr(this.rootOfst + 0) + "7(13)(omit3)"; }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 9) + "m9(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "6(omit3)"; }

            } else if (this.is10)  {

                if      (this.is11) { chordStr += this.rootToStr(this.rootOfst + 0) + "M7(+13)(omit3)"; }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "7(omit3)"; }

            } else if (this.is11)  {
                chordStr += this.rootToStr(this.rootOfst + 0) + "M7(omit3)";
            }

        } else if (this.is8) {// 第2音 (増５度) //////////////////////

            if      (this.is9)  {

                if      (this.is10) { chordStr += this.rootToStr(this.rootOfst + 9) + "mM7(-9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else if (this.is11) { chordStr += this.rootToStr(this.rootOfst + 9) + "mM9(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 9) + "mM7(omit5)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is10)  {

                if      (this.is11) { chordStr += this.rootToStr(this.rootOfst + 8) + "m(9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 0) + "7+5(omit3)"; }

            } else if (this.is11)  {
                chordStr += this.rootToStr(this.rootOfst + 8) + "m(omit5)/" + this.rootToStr(this.rootOfst);
            }

        } else if (this.is9) {// 第2音 (６度) //////////////////////

            if      (this.is10)  {

                if      (this.is11) { chordStr += this.rootToStr(this.rootOfst + 9) + "sus2(-9)(omit5)/" + this.rootToStr(this.rootOfst); }
                else                { chordStr += this.rootToStr(this.rootOfst + 9) + "m(-9)(omit5)/" + this.rootToStr(this.rootOfst); }

            } else if (this.is11)  {
                chordStr += this.rootToStr(this.rootOfst + 9) + "sus2(omit5)/" + this.rootToStr(this.rootOfst);
            }

        } else if (this.is10) {// 第2音 (ドミナント７度) //////////////////////

            if      (this.is11)  {
                chordStr += this.rootToStr(this.rootOfst + 11) + "M7(omit3)(omit5)/" + this.rootToStr(this.rootOfst);
            }

        }

        return chordStr;
    }

};
