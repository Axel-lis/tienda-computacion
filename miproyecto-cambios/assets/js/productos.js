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
          'pdescripcion':jQuery("#descripcion_producto").val(),
          'pprecio':jQuery("#precio_producto").val(),
          'pcategoria':jQuery("#categoria_producto").val(),
        },
    dataType:'json',
    success: function(r){
      console.log(r.exito);
      console.log(r.textoerror);
    },
    error:function(a,b,c){
      console.log(r.exito);
      console.log(r.textoerror);
    }
  });
}
