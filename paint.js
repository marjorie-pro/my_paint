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
        // $('#showtool').click(function() {
        //         $('.menu_tool').slideToggle("fast");
        // });
        // $('#showform').click(function() {
        //         $('.menu_form').slideToggle("fast");
        // });

//CRAYON & GOMME
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

  isMouseDown=false;
}

function handleMouseOut(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  isMouseDown=false;
}

function handleMouseMove(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

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
      ctx.lineWidth = $("#epaisseur").val();
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


//LIGNE
var mouse = {
    x: 0,
    y: 0
};

var lisDrawing = false;
    function linehandleMouseDown(el){
      if(mouse.x != 0 && mouse.y != 0){
        var lisDrawing = false;
          
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(el.offsetX, el.offsetY);
            ctx.closePath();
            ctx.stroke();
            mouse.x = 0;
            mouse.y = 0;
        }else{
          var lisDrawing = true;
            mouse.x = el.offsetX;
            mouse.y = el.offsetY;
            $("#canvas").css('cursor','crosshair');
        }

    }

    $("#line").click(function(){
    $("canvas").mousedown(function(el){
      linehandleMouseDown(el);
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

    if (cisDrawing) {
        cisDrawing = false;
        ctx.strokeStyle = $("#color_picker").val();
        ctx.lineWidth = $("#epaisseurC").val();

        ctx.beginPath();
        var dist = Math.sqrt((cmouseX - cstartX) * (cmouseX - cstartX) + (cmouseY - cstartY) * (cmouseY - cstartY));
        ctx.arc(cstartX, cstartY, dist, 0, 2 * Math.PI);
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

//CERCLE REMPLI

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

    if (crisDrawing) {
        crisDrawing = false;
        ctx.beginPath();
        var dist = Math.sqrt((crmouseX - crstartX) * (crmouseX - crstartX) + (crmouseY - crstartY) * (crmouseY - crstartY));
        ctx.arc(crstartX, crstartY, dist, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = $("#color_picker").val();
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

var rvisDrawing = false;
var rvstartX;
var rvstartY;

$("#rectangle").click(function(){
$("#canvas").mousedown(function (erv) {
    recthandleMouseDown(erv);
});
});
function recthandleMouseDown(erv) {
    rvmouseX = parseInt(erv.clientX - offsetX);
    rvmouseY = parseInt(erv.clientY - offsetY);

    if (rvisDrawing) {
        rvisDrawing = false;
        ctx.strokeStyle = $("#color_picker").val();
        ctx.lineWidth = $("#epaisseurRV").val();

        ctx.beginPath();
        ctx.rect(rvstartX, rvstartY, rvmouseX - rvstartX, rvmouseY - rvstartY);
        ctx.closePath();
        ctx.stroke(); 
        canvas.style.cursor = "default";
    } else {
        rvisDrawing = true;
        rvstartX = rvmouseX;
        rvstartY = rvmouseY;
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

//CLEAR
document.getElementById('clear').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, false);

//OUVRIR FICHIER
// $('#button').on('click', function() {
//     $('#file-input').trigger('click');
// });

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