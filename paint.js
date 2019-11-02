// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = 'black';
// ctx.fillRect(30,30,730,400);

// $(#crayon).click(function(){

// });

(function($){

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
// ctx.fillStyle = $("#color_pickerbg").val();
ctx.fillStyle = "white";
var cbg = ctx.fillStyle;
// var strokeColor="red";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var lastX;
var lastY;

var strokeWidth=5;
var mouseX;
var mouseY;
var canvasOffset=$("canvas").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var isMouseDown=false;



// BOUTONS SELECTIONNÉS
$("label.btn").prop("checked",$(this).prop("checked"));

// GÉNÉRER LES MENUS
        $('#showtool').click(function() {
                $('.menu_tool').slideToggle("fast");
        });
        $('#showform').click(function() {
                $('.menu_form').slideToggle("fast");
        });


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
      $("#canvas").css("background-color", cbg);
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


//LIGNE
var mouse = {
    x: 0,
    y: 0
};

$("#line").click(function(){
    $("#canvas").css('cursor','crosshair');
    $("canvas").click(function(el){
        if(mouse.x != 0 && mouse.y != 0){
        	
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(el.offsetX, el.offsetY);
            ctx.closePath();
            ctx.stroke();
            mouse.x = 0;
            mouse.y = 0;
        }else{
            mouse.x = el.offsetX;
            mouse.y = el.offsetY;
        }
    });
});

//CERCLE VIDE

var cisDrawing = false;
var cstartX;
var cstartY;


$("#circle").click(function(){
$("#canvas").mousedown(function (ec) {
    circlehandleMouseDown(ec);
});
});
function circlehandleMouseDown(ec) {
    cmouseX = parseInt(ec.clientX - offsetX);
    cmouseY = parseInt(ec.clientY - offsetY);
    // $("#downlog").html("Down: " + mouseX + " / " + mouseY);

    // Put your mousedown stuff here
    if (cisDrawing) {
        cisDrawing = false;
        ctx.strokeStyle = $("#color_picker").val();
        ctx.beginPath();
        ctx.lineWidth = $("#epaisseurC").val();
        var dist = Math.sqrt((cmouseX - cstartX) * (cmouseX - cstartX) + (cmouseY - cstartY) * (cmouseY - cstartY));
        ctx.arc(cstartX, cstartY, dist, 0, 2 * Math.PI);
        // console.log(((cmouseY-cstartY)/(cmouseX - cstartX)));
        // console.log(dist);
        // ctx.arc(mouseX,mouseY, 20 , 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke(); 
        canvas.style.cursor = "default";
    } else {
        cisDrawing = true;
        cstartX = cmouseX;
        cstartY = cmouseY;
        $("#canvas").css('cursor','crosshair');
    }

}

//CIRCLE REMPLI

var crisDrawing = false;
var crstartX;
var crstartY;

$("#circleR").click(function(){
$("#canvas").mousedown(function (ecr) {
    RcirclehandleMouseDown(ecr);
});
});
function RcirclehandleMouseDown(ecr) {
    crmouseX = parseInt(ecr.clientX - offsetX);
    crmouseY = parseInt(ecr.clientY - offsetY);
    // Put your mousedown stuff here
    if (crisDrawing) {
        crisDrawing = false;
        ctx.beginPath();
        var dist = Math.sqrt((crmouseX - crstartX) * (crmouseX - crstartX) + (crmouseY - crstartY) * (crmouseY - crstartY));
        ctx.arc(crstartX, crstartY, dist, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = $("#color_picker").val();;
        ctx.fill(); 
        canvas.style.cursor = "default";
    } else {
        crisDrawing = true;
        crstartX = crmouseX;
    
        crstartY = crmouseY;
        $("#canvas").css('cursor','crosshair');
    }

}


//RECTANGLE VIDE

var isDrawing = false;
var startX;
var startY;

$("#rectangle").click(function(){
$("#canvas").mousedown(function (e) {
    recthandleMouseDown(e);
});
});
function recthandleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    // $("#downlog").html("Down: " + mouseX + " / " + mouseY);

    // Put your mousedown stuff here
    if (isDrawing) {
        isDrawing = false;
        ctx.strokeStyle = $("#color_picker").val();
        ctx.beginPath();
        ctx.lineWidth = $("#epaisseurRV").val();
        ctx.rect(startX, startY, mouseX - startX, mouseY - startY);
        ctx.closePath();
        ctx.stroke(); 
        canvas.style.cursor = "default";
    } else {
        isDrawing = true;
        startX = mouseX;
        startY = mouseY;
        $("#canvas").css('cursor','crosshair');
    }

}
//RECTANGLE REMPLI

var risDrawing = false;
var rstartX;
var rstartY;
$("#rectangleR").click(function(){
$("#canvas").mousedown(function (er) {
    rectRhandleMouseDown(er);
});
});

function rectRhandleMouseDown(er) {
    rmouseX = parseInt(er.clientX - offsetX);
    rmouseY = parseInt(er.clientY - offsetY);
    // $("#downlog").html("Down: " + mouseX + " / " + mouseY);

    // Put your mousedown stuff here
    if (risDrawing) {
        risDrawing = false;
        ctx.fillStyle = $("#color_picker").val();
        ctx.beginPath();
        ctx.rect(rstartX, rstartY, rmouseX - rstartX, rmouseY - rstartY);
        ctx.closePath();
        ctx.fill(); 
        canvas.style.cursor = "default";
    } else {
        risDrawing = true;
        rstartX = rmouseX;
        rstartY = rmouseY;
        $("#canvas").css('cursor','crosshair');
    }

}

//SAUVEGARDE
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});
//OUVRIR FICHIER
$('#button').on('click', function() {
    $('#file-input').trigger('click');
});

//CLEAR
document.getElementById('clear').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, false);

//BACK
// document.getElementById('cancel').addEventListener('click', function(event) {

//       event.preventDefault();
//       // canvas.remove();

//       // return false;

//     });


//COULEUR CANVAS
// $("#color_pickerbg").click(function(){
//   $("#canvas").mousedown(function(cc){
//     change_color(cc);
//   });
// });

// function change_color(cc){
//   var canvas=document.getElementById("canvas");
// var ctx=canvas.getContext("2d");
// ctx.fillStyle = $("#color_pickerbg").val();
// // ctx.fillStyle = "white";
// var cbg = ctx.fillStyle;
// // var strokeColor="red";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// };

})(jQuery);