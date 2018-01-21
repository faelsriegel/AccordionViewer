/*
Main Function

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

$(window).on("load",function(){
//$(window).load(function(){
//$(function(){

    cssDeviceIcon();
    cssManualIcon();
    cssRotateIcon();

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
    //alert("RightBtnKbd");
    initRightBtnKbd();

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
