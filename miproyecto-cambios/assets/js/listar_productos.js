var IDProductoGlobal;
$(document).ready(function(){

listar_productos();

jQuery("#btncancelarModal").on("click",function(){
    jQuery("#modificar_datos").hide();
    jQuery("#tabla").show();
});
jQuery("#btnguardar").on("click",function(){
    actualizarDatos();
});    
});


function listar_productos(){
  jQuery.ajax({
    type:"POST",        
    url: "productos.php",
    data:{'paccion':'LISTAR',
          'pid':'',
          'pnombre':'',
          'pdescripcion':'',
          'pprecio':'',
          'pcategoria':'' 
        },
    dataType:'json',
    success: function(datos){
      var vhtml="";
      vhtml=vhtml+"<table border='2'>";
      vhtml=vhtml+"<th>";
      vhtml=vhtml+"ID";
      vhtml=vhtml+"</th>";
      vhtml=vhtml+"<th>";
      vhtml=vhtml+"nombre";
      vhtml=vhtml+"</th>";
      vhtml=vhtml+"<th>";
      vhtml=vhtml+"descripcion";
      vhtml=vhtml+"</th>";
      vhtml=vhtml+"<th>";
      vhtml=vhtml+"precio";
      vhtml=vhtml+"</th>";
      vhtml=vhtml+"<th>";
      vhtml=vhtml+"categoria";
      vhtml=vhtml+"</th>";
      vhtml=vhtml+"<th>";
      vhtml=vhtml+"Accion";
      vhtml=vhtml+"</th>";
    for(i in datos){
        vhtml=vhtml+"<tbody>";
        vhtml=vhtml+"<tr>";
        vhtml=vhtml+"<td>";
        vhtml=vhtml+datos[i].id;
        vhtml=vhtml+"</td>";
        vhtml=vhtml+"<td>";
        vhtml=vhtml+datos[i].nombre;
        vhtml=vhtml+"</td>";
        vhtml=vhtml+"<td>";
        vhtml=vhtml+datos[i].descripcion;
        vhtml=vhtml+"</td>";
        vhtml=vhtml+"<td>";
        vhtml=vhtml+datos[i].precio;
        vhtml=vhtml+"</td>";
        vhtml=vhtml+"<td>";
        vhtml=vhtml+datos[i].categoria_id;
        vhtml=vhtml+"</td>";
        vhtml=vhtml+"<td>";
        vhtml=vhtml+"<input type='button' id="+datos[i].id+" class='btneliminar' value='ELIMINAR'></input>";
        vhtml=vhtml+"<input type='button' id="+datos[i].id+" class='btnactualizar' value='ACTUALIZAR'></input>";
        vhtml=vhtml+"<input type='button' id="+datos[i].id+" class='btnimagen' value='IMAGEN'></input>";
        vhtml=vhtml+"</td>";
        vhtml=vhtml+"</tr>";
        vhtml=vhtml+"</tbody>";
        
      }
      vhtml=vhtml+"</table>";
      //console.log(vhtml);
      jQuery("#tabla").html(vhtml);
  
      jQuery(".btneliminar").on("click",function(){
        var vIDProducto = this.id;
        eliminarProducto(vIDProducto);
      });
      jQuery(".btnactualizar").on("click",function(){
        var vIDProducto = this.id;
        IDProductoGlobal = vIDProducto;
        buscarDatosProducto(vIDProducto);
        jQuery("#modificar_datos").show();
        jQuery("#tabla").hide();
      });
      //imagen
      jQuery(".btnimagen").on("click",function(){
        var vIDProducto = this.id;
        IDProductoGlobal = vIDProducto;
        buscarImagen(vIDProducto);
        jQuery("#ventanaImagen").show();
        jQuery("#tabla").hide();
      });
     
    },
    error:function(a,b,c){
      console.log(r.exito);
      console.log(r.textoerror);
    }
  });
}

function eliminarProducto(vIDProducto){
    jQuery.ajax({
        type:"POST",        
        url: "productos.php",
        data:{'paccion':'ELIMINAR',
              'pid':vIDProducto,
              'pnombre':'',
              'pdescripcion':'',
              'pprecio':'',
              'pcategoria':''
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

function actualizarProducto(vIDProducto){
    jQuery.ajax({
        type:"POST",        
        url: "productos.php",
        data:{'paccion':'ACTUALIZAR',
              'pid':vIDProducto,
              'pnombre':'',
              'pdescripcion':'',
              'pprecio':'',
              'pcategoria':''
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

function buscarDatosProducto(vIDProducto){
    jQuery.ajax({
        type:"POST",        
        url: "productos.php",
        data:{'paccion':'BUSCAR_PRODUCTO',
              'pid':vIDProducto,
              'pnombre':'',
              'pdescripcion':'',
              'pprecio':'',
              'pcategoria':''
            },
        dataType:'json',
        success: function(datos){
            jQuery("#nombre_producto").val(datos[0].nombre);
            jQuery("#descripcion_producto").val(datos[0].descripcion);
            jQuery("#precio_producto").val(datos[0].precio);
            jQuery("#categoria_producto").val(datos[0].categoria_id);
        },
        error:function(a,b,c){
            alert("NO SE PUDO CONECTAR CON EL SERVIDOR...");
        }
      });
    
}
function actualizarDatos(){
    jQuery.ajax({
        type:"POST",        
        url: "productos.php",
        data:{'paccion':'ACTUALIZAR',
              'pid':IDProductoGlobal,
              'pnombre':jQuery("#nombre_producto").val(),
              'pdescripcion':jQuery("#descripcion_producto").val(),
              'pprecio':jQuery("#precio_producto").val(),
              'pcategoria':jQuery("#categoria_producto").val()
            },
        dataType:'json',
        success: function(r){
          alert(r.textoerror);
          window.location="../../backend/views/lista_productos.html";
        },
        error:function(a,b,c){
          alert("NO SE PUDO CONECTAR CON EL SERVIDOR...");
        }
})};

//*Buscar imagen para visualizar ---
function buscarImagen(vIDProducto){
  jQuery.ajax({
      type:"POST",        
      url: "buscar_imagen.php",
      data:{'pid':vIDProducto},
      dataType:'html',
      success: function(r){
        jQuery("#visualizarImagen").html(r);
          window.open("./assets/img/"+r.$nombrearchivo)
      },
      error:function(a,b,c){
          alert("NO SE PUDO CONECTAR CON EL SERVIDOR...");
      }
    });
  
}