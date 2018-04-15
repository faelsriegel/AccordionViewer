/*
Main Function

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

$(window).on("load",function(){

    var userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
        // not support
        alert("I'm sorry.\nYour browser is not supported.\nOnly the following browsers are supported.\nPC(Win/Mac): Google Chrome\niPad/iPhone: Web MIDI Browser");
    } else if(userAgent.indexOf('edge') != -1) {
        // not support
        alert("I'm sorry.\nYour browser is not supported.\nOnly the following browsers are supported.\nPC(Win/Mac): Google Chrome\niPad/iPhone: Web MIDI Browser");
    } else if (userAgent.indexOf('chrome') != -1) {
        // OK
    } else if (userAgent.indexOf('webmidibrowser') != -1) {
        // OK
    } else {
        // not support
        alert("I'm sorry.\nYour browser is not supported.\nOnly the following browsers are supported.\nPC(Win/Mac): Google Chrome\niPad/iPhone: Web MIDI Browser");
    }

    cssDeviceIcon();
    cssManualIcon();
    cssRightBtnSysIcon();
    cssRotateIcon();
    cssMirrorIcon();
    cssKbdBtnIcon();

    //-- Setting viewport
    //settingViewPort();

    //-- Transform
    transformLeftBtnKbd('#left_btn_kbd_rotate');
    transformBellows('#bellows');
    transformAccBody('#acc_body_container');

    //-- MIDI
    //alert("MIDIService");
    initMIDIService();

    //-- Init Right Btn Kbd
    //alert("RightKbd");
    initRightKbd();

    //-- Init Left Btn Kbd
    //alert("LeftBtnKbd");
    initLeftBtnKbd();

    //-- Bellows
    //alert("Bellows");
    initBellows();

    //-- Expression Graph
    //alert("ExpGraph");
    initExpGraph();

    //-- Chord Display
    //alert("Chord");
    initChordDisplay();

    //-- Draggable
    //new CDraggable();

    //-- Show
    $("body").css({ visibility: "visible" });
});
