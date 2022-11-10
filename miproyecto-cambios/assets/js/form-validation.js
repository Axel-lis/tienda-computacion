//var expr= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Wait for the DOM to be ready


//! Hay que solucionar el tema de reload la pag cuando aparece un error
$(document).ready(function(){


  // Initialize form validation on the registration form.

  // It has the name attribute "registration"

  $("form[name='form_productos']").validate({

// Specificar las reglas de la validación

rules:{

// The key name on the left side is the name attribute
// of an input field. Validation rules are defined
// on the right side

nombre: "required",
descripcion: {required:true, maxlength: 15},
precio: "required",
categoria: "required",
},

    // Specify validation error messages

    messages: {

        nombre: "Por favor, introduzca nombre del producto",

        descripcion: {

        required: "Por favor proporcione una descripcion del producto",

        maxlength: "Descripcion debe tener max 15 caracteres."

      },

      precio: "introduce un precio válido",
      categoria: "introduce la categoria correspondiente"

    },

    submitHandler: function(form) {

      form.submit();

    }

  });

});