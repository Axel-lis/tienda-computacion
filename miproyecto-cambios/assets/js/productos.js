$(document).ready(function(){
    jQuery("#btnguardar").on("click",function(){
        guardar_producto();
    });
    jQuery("#btncancelar").on("click",function(){
        window.open('home.html','self');
    });
});

function guardar_producto(){
  jQuery.ajax({
    type:"POST",        
    url: "productos.php",
    data:{'paccion':'GUARDAR',
          'pid':'',
          'pnombre':jQuery("#nombre_producto").val(),
          'pdescripcion':jQuery("#descripcion_producto").val(),
          'pprecio':jQuery("#precio_producto").val(),
          'pcategoria':jQuery("#categoria_producto").val(),
        },
    dataType:'json',
    success: function(r){
      guardarImagen(r.idgenerado);
    },
    error:function(a,b,c){
      console.log(r.exito);
      console.log(r.textoerror);
    }
  });
}

function guardarImagen(vIDGenerado){
  jQuery("#idgenerado").val(vIDGenerado);
  $.ajax({
    url: 'guardar_imagen_productos.php',
    type: 'POST',
    data: new FormData($("#form_productos")[0]),
    cache: false,
    contentType: false,
    processData: false,
    xhr: function () {var myXhr = $.ajaxSettings.xhr();if (myXhr.upload) {myXhr.upload.addEventListener('progress', function (e) {if (e.lengthComputable) {$('progress').attr({value: e.loaded,max: e.total,});}}, false);}return myXhr;},
    success: function (xml) {
      //console.log(xml);
    },
    error: function (xml) {
      //console.log(xml);
    }
  });
}


