/*
Accordion Body Transform

Copyright 2018 Luv-Accordion
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

var accBodytransform;
var transformAccBody = function (id_name) {
    accBodytransform = new CTransformAccBody(id_name);
};

var leftBtnKbdTransform;
var transformLeftBtnKbd = function (id_name) {
    leftBtnKbdTransform = new CTransformLeftBtnKbd(id_name);
};

var bellowsTransform;
var transformBellows = function (id_name) {
    bellowsTransform = new CTransformBellows(id_name);
};

//=================================================
//
// CTransformAccBody class
//
//=================================================

class CTransformAccBody {
    constructor(id) {
        this.acc_body_id = id;
        this.rotateZ_cnt = 1;
        //this.rotate_btn_id = $('#rotate_icon');
        this.rotateY_btn_id = $(document.getElementById('rotateY_icon').contentDocument).find('#layer3');
        this.rotateZ_btn_id = $(document.getElementById('rotate_icon').contentDocument).find('#layer3');
        this.scale = 0.8;//1.0;

		this.isMirror = false;
        this.degX = 0;
        this.degY = 0;
        this.degZ = this.rotateZ_cnt*90;
        this.cssTransform(this.degX, this.degY, this.degZ);

        this.rotateZ_btn_id.on("click", function() {
            //-- .animate( properties, options )
            $(this.acc_body_id).animate(
                {//-- properties
                    'z-index': 1
                },
                {//-- options
                    duration: 1000,
                    step: function (num) {
                    	if (this.isMirror) {
                    		this.degY = 180 * (1 - num);
                    	} else {
                        	this.degZ = (num * 90) + (this.rotateZ_cnt * 90);
                    	}
                   		this.cssTransform(this.degX, this.degY, this.degZ);
                    }.bind(this),
                    complete: function () {
                        $(this.acc_body_id).css('z-index', 0);
                    	if (this.isMirror) {
                    		this.isMirror = false;
                    		this.rotateZ_cnt = 1;
                    		this.degZ = this.rotateZ_cnt*90;
                    	} else {
	                        this.rotateZ_cnt++;
	                        if(this.rotateZ_cnt == 4) this.rotateZ_cnt =0;
	                    }
                    }.bind(this)
                }
            );
        }.bind(this));

        this.rotateY_btn_id.on("click", function() {
            //-- .animate( properties, options )
            $(this.acc_body_id).animate(
                {//-- properties
                    'y-index': 1
                },
                {//-- options
                    duration: 1000,
                    step: function (num) {
                    	if (this.isMirror) {
                    		this.degY = 180 * (1 - num);
                    	} else {
                    		this.degY = 180 * num;
                   			this.degZ = 90 + (this.degZ - 90) * (1-num);

                    	}
                        this.cssTransform(this.degX, this.degY, this.degZ);
                    }.bind(this),
                    complete: function () {
                        $(this.acc_body_id).css('y-index', 0);
                    	if (this.isMirror) {
                    		this.isMirror = false;
                    		this.rotateZ_cnt = 1;
                    		this.degZ = this.rotateZ_cnt*90;
                    	} else {
                    		this.isMirror = true;
                    	}
                    }.bind(this)
                }
            );
        }.bind(this));
    };

    cssTransform(degRotateX, degRotateY, degRotateZ) {
        $(this.acc_body_id).css({
            'transform' : 'rotateX(' + degRotateX + 'deg)' +
                          'rotateY(' + degRotateY + 'deg)' +
                          'rotateZ(' + degRotateZ + 'deg)' +
                          'scale(' + this.scale + ',' + this.scale + ')',
            'transform-origin' : '50% 50%'
        });
    };
};

//=================================================
//
// CTransformLeftBtnKbd class
//
//=================================================

class CTransformLeftBtnKbd {
    constructor(id) {
        this.acc_body_id = id;
        this.rotate_cnt = 2;
        this.scale = 1.0;
        this.cssTransform(0, 0, this.rotate_cnt*90);
    };
    cssTransform(degRotateX, degRotateY, degRotateZ) {
        $(this.acc_body_id).css({
            'transform' : 'rotateX(' + degRotateX + 'deg)' +
                          'rotateY(' + degRotateY + 'deg)' +
                          'rotateZ(' + degRotateZ + 'deg)' +
                          'scale(' + this.scale + ',' + this.scale + ')',
            'transform-origin' : '50% 50%'
        });
    };
};

//=================================================
//
// CTransformBellows class
//
//=================================================

class CTransformBellows {
    constructor(id) {
        this.acc_body_id = id;
        this.rotate_cnt = 4;
        this.scale = 1.0;
        this.cssTransform(0, 0, this.rotate_cnt*90);
    };
    cssTransform(degRotateX, degRotateY, degRotateZ) {
        $(this.acc_body_id).css({
            'transform' : 'rotateX(' + degRotateX + 'deg)' +
                          'rotateY(' + degRotateY + 'deg)' +
                          'rotateZ(' + degRotateZ + 'deg)' +
                          'scale(' + this.scale + ',' + this.scale + ')',
            'transform-origin' : '50% 50%'
        });
    };
};

//=================================================
//
// Draggable
//
//=================================================
class CDraggable {
    constructor() {
        $('#acc_body_container').draggable();
    };
};
