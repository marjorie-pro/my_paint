// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = 'black';
// ctx.fillRect(30,30,730,400);

// $(#crayon).click(function(){

// });

(function($){

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var lastX;
var lastY;
var strokeColor="red";
var strokeWidth=5;
var mouseX;
var mouseY;
var canvasOffset=$("canvas").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var isMouseDown=false;


function handleMouseDown(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  lastX=mouseX;
  lastY=mouseY;
  isMouseDown=true;
}

function handleMouseUp(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseup stuff here
  isMouseDown=false;
}

function handleMouseOut(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mouseOut stuff here
  isMouseDown=false;
}

function handleMouseMove(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousemove stuff here
  if(isMouseDown){
  	$("#canvas").css('cursor','pointer');
    ctx.beginPath();

    ctx.strokeStyle = $("#color_picker").val();
    ctx.lineWidth = $("#epaisseur").val();
    if(mode=="pen"){
      ctx.globalCompositeOperation="source-over";
      ctx.moveTo(lastX,lastY);
      ctx.lineTo(mouseX,mouseY);
      ctx.stroke();     
    }else{
      ctx.globalCompositeOperation="destination-out";
      ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
      ctx.fill();
    }
    lastX=mouseX;
    lastY=mouseY;
  }
}

$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

var mode="pen";
$("#pen").click(function(){ mode="pen"; });
$("#eraser").click(function(){ mode="eraser"; });


////////////////////////////////////////////////////////////////


// function lineMouse(e){
// 	var mouse = {
// 	x: -1,
//     y: -1
// };
//  var cvs = $("canvas")[0].getContext("2d");
//     $("canvas").click(function(e){
//         if(mouse.x != -1 && mouse.y != -1){
//         	$("#canvas").css('cursor','crosshair');
//             ctx.beginPath();
//             ctx.moveTo(mouse.x, mouse.y);
//             ctx.lineTo(e.pageX, e.pageY);
//             ctx.closePath();
//             ctx.stroke();
//             mouse.x = -1;
//             mouse.y = -1;
//         }else{
//             mouse.x = e.pageX;
//             mouse.y = e.pageY;
//         }
//     });

// }


// $("#line").click(function(){ 
// 	mode="line";
// 	$("#canvas").mousedown(function(e){lineMouse(e);});
// 	$("#canvas").mouseup(function(e){lineMouse(e);}); 
// });

////////////////////////////////////////////////////////////////////:



var mouse = {
    x: 0,
    y: 0
};

$("#line").click(function(){
    $("#canvas").css('cursor','crosshair');
    $("canvas").click(function(e){
        if(mouse.x != 0 && mouse.y != 0){
        	
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.closePath();
            ctx.stroke();
            mouse.x = 0;
            mouse.y = 0;
        }else{
            mouse.x = e.offsetX;
            mouse.y = e.offsetY;
        }
    });
});

var mouseC = {
    xC: 0,
    yC: 0
};
$("#circle").click(function(){
    $("#canvas").css('cursor','crosshair');
    $("canvas").click(function(e){
        	
        ctx.beginPath();
        ctx.arc(100,100, 20, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke(); 
         
    });
});

var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

$('#button').on('click', function() {
    $('#file-input').trigger('click');
});

// var canvas = new fabric.Canvas('c', { selection: false });

// var circle, isDown, origX, origY;

// canvas.on('mouse:down', function(o){
//   isDown = true;
//   var pointer = canvas.getPointer(o.e);
//   origX = pointer.x;
//   origY = pointer.y;
//   circle = new fabric.Circle({
//     left: pointer.x,
//     top: pointer.y,
//     radius: 1,
//     strokeWidth: 5,
//     stroke: 'red',
//     selectable: false,
//     originX: 'center', originY: 'center'
//   });
//   canvas.add(circle);
// });

// canvas.on('mouse:move', function(o){
//   if (!isDown) return;
//   var pointer = canvas.getPointer(o.e);
//   circle.set({ radius: Math.abs(origX - pointer.x) });
//   canvas.renderAll();
// });

// canvas.on('mouse:up', function(o){
//   isDown = false;
// });

// $('#canvas').attr('height', $('#canvas').css('height'));
//     $('#canvas').attr('width', $('#canvas').css('width'));
    
//     $("#canvas").click(function(e){ 

//         var x = e.pageX - this.offsetLeft;
//         var y = e.pageY - this.offsetTop; 

//         /* var c=document.getElementById("special"); */
//         var ctx= this.getContext("2d"); /*c.getContext("2d");*/
//         ctx.beginPath();
//         ctx.arc(x, y, 10,0, 2*Math.PI);
//         ctx.stroke();

//    });


  // var letsdraw ;

  // var canvasOffset = $('#canvas').offset();

  // $('#canvas').mousemove(function(e) {
  //   if (letsdraw) {
  //     ctx.clearRect(0,0,canvas.width,canvas.height);
  //     ctx.strokeStyle = 'blue';
  //     ctx.lineWidth = 1;
  //     ctx.beginPath();
    
  //     ctx.moveTo(letsdraw.x, letsdraw.y);
  //     ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
  //     ctx.stroke();
  //   }
  // });

  // $('#canvas').mousedown(function(e) {
  //   letsdraw = {
  //     x:e.pageX - canvasOffset.left,
  //     y:e.pageY - canvasOffset.top
  //     }
    
  // });

  // $(window).mouseup(function() {
  //   letsdraw = null;
  // });

})(jQuery);