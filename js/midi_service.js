/*
MIDIService

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var gMIDIService;
var initMIDIService = function () {
    gMIDIService = new CMIDIService();
};


var inputs = null;
var outputs = null;
var midiAccess = null;
var input_menu_id = null;
var output_menu_id = null;
var input = null;
var output = null;
var input_device = 0;
var output_device = 0;
var no_midi_interface = 0;

function requestMIDIAccess()
{
    navigator.requestMIDIAccess().then( success, failure );
    //navigator.requestMIDIAccess( { sysex: true } ).then( success, failure );

}

function success(m) {
    midiAccess = m;

    if (typeof midiAccess.inputs === "function") {
        inputs = midiAccess.inputs();
        outputs = midiAccess.outputs();
    } else {
        var inputIterator = midiAccess.inputs.values();
        inputs = [];
        for (var o = inputIterator.next(); !o.done; o = inputIterator.next()) {
            inputs.push(o.value)
        }

        var outputIterator = midiAccess.outputs.values();
        outputs = [];
        for (var o = outputIterator.next(); !o.done; o = outputIterator.next()) {
            outputs.push(o.value)
        }
    }

    if(input_menu_id != null) setInputDeviceSelect();
    if(output_menu_id != null) setOutputDeviceSelect();
};

function failure(error) {
    alert("Failed MIDI!");
};



function setOutputMenuID(parts) {
    output_menu_id = parts;
}

function setOutputDeviceSelect() {
    var i=0;
    if(midiAccess!=null){
        //--- 使用可能なデバイスの名前をメニューに設定する ---
        if(outputs.length>0){
            for(i=0; i<outputs.length; i++)
            output_menu_id.options[i+1] = new Option(outputs[i].name, i+1);
        }
        output_menu_id.value=1;
        output_device=0;
        output=outputs[output_device];
    }
}


function setInputMenuID(parts) {
    input_menu_id = parts;
}

function setInputDeviceSelect() {
    var i=0;
    if(midiAccess!=null){
        //--- 使用可能なデバイスの名前をメニューに設定する ---
        if(inputs.length>0){
            for(i=0; i<inputs.length; i++)
            input_menu_id.options[i+1] = new Option(inputs[i].name, i+1);
            input_menu_id.value=1;
            input_device=0;
            input=inputs[input_device];
            input.onmidimessage = handleMIDIMessage;
        } else {
            no_midi_interface=1;
        }
    }
}

function inputDeviceSelect(item) {
    input_device = item.options[item.selectedIndex].value-1;

    if(input_device!=-1){
        input= inputs[input_device];
        input.onmidimessage = handleMIDIMessage;
    } else {
        input=null;
    }
}

function outputDeviceSelect(item) {
    output_device = item.options[item.selectedIndex].value-1;
    if(output_device!=-1){
        output=outputs[output_device];
    } else {
        output=null;
    }
}

function handleMIDIMessage( event ) {
    var str = null;
    var i,k;

    if( event.data[0] == 0xFE ) return;

    //-- MIDI Through
    //output.send( event.data, event.timestamp );
    //output.send( event.data );

    //-- Chord Display
    chordDisplay.setEvent(event);

    //-- Righht Hand Keyboard View
    rightKbd.receiveEvent(event);

    //-- Left Hand Keyboard View
    leftBtnKbd.receiveEvent(event);

    //-- Bellows
    bellows.receiveEvent(event);

    //-- Expression Graph
    expGraph.receiveEvent(event);

}

//=================================================
//
// CMIDIService class
//
//=================================================

class CMIDIService {
    constructor() {
        //-- WEB MIDI API
        requestMIDIAccess();

        //-- Set Interval (Auto MIDI Device Setting)
        var hoge = setInterval(function() {
            //wait webmidi start
            if (inputs != null) {
                setInputMenuID(document.input_device_select.ids);
                setOutputMenuID(document.output_device_select.ids);
                if(input_menu_id != null) setInputDeviceSelect();
                if(output_menu_id != null) setOutputDeviceSelect();
                clearInterval(hoge);
            }
        }.bind(this), 200);
    };
};
