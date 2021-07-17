class Producto {
    constructor(obj) {
        this.id = parseInt(obj.id);
        this.nombre = obj.producto.toUpperCase();
        this.cantidad = parseInt(obj.cantidad);
        this.precio = parseFloat(obj.precio);
    }
}


var cantidadTotal = 0;
const productos = [];

for (const objeto of almacenados) {
    productos.push(new Producto(objeto));
}
//Modifica en el array que contiene todos los productos que inicialmente esta en cero a la cantidad que va a comprar segun el input
function agregarAListaCarrito(id) {
    cantidadTotal = 0;
    //crea el area para la animacion de seleccion de producto
    $("#animacion").prepend('  <h3  style="display: none; color:white; background-color:grey;" id="animacion_h3" ></h3>');
    var cantidad = document.getElementById("producto" + id).value;

    productos.map(function (dato) {
        if (dato.id == id) {
            dato.cantidad = cantidad;
        }
    });
    for (i = 0; i < productos.length; i++) {
        var cantidadproducto = parseInt(productos[i]['cantidad']);
        cantidadTotal = cantidadproducto + cantidadTotal;
        if (productos[i]['id'] == id) {
            var descripcion = productos[i]['nombre'];

        }
    }
    //configura el texto del producto selccionado a mostrar con el tiempo
    $('#animacion_h3').text('Agregaste ' + descripcion + ' a tu carrito');
    $('#animacion_h3').fadeIn(1000);
    $('#animacion_h3').fadeOut(2000);

    let tabla = document.getElementById('tabla_carrito');
    if (tabla) {
        tabla.parentNode.removeChild(tabla);
    }
    let boton = document.getElementById('pagar');
    boton.style.visibility = "hidden";
    totalizaCarrito(cantidadTotal);


}
// funcion que suma la cantidad de productos seleccionados para mostrar en el carrito final
function totalizaCarrito(cantidadTotal) {

    $('#carrito').attr('data-original-title', cantidadTotal).tooltip({ placement: "bottom", trigger: 'manual' });
    $('#carrito').tooltip('show');
}

// recorre el array para dibujar en la tabla segun la cantidad que tenga cada producto
function mostrar_carrito() {

    let total = 0;

    let tabla = document.getElementById('tabla_carrito');
    if (tabla) {
        tabla.parentNode.removeChild(tabla);
    }

    let mi_tabla = document.createElement("table");
    mi_tabla.setAttribute("id", 'tabla_carrito');
    mi_tabla.setAttribute("class", "table table-dark");
    let mi_tabla_body = document.createElement("tbody");

    let mi_fila = document.createElement("tr");
    mi_fila.setAttribute("id", 'titulos');


    let marca = document.createElement("td");
    marca.innerText = 'Cantidad';
    mi_fila.appendChild(marca);

    let descripcion = document.createElement("td");
    descripcion.innerText = 'Descripcion';
    mi_fila.appendChild(descripcion);

    let precio = document.createElement("td");
    precio.innerText = 'Precio';
    mi_fila.appendChild(precio);

    mi_tabla_body.appendChild(mi_fila);

    for (elemento of productos) {
        if (elemento.cantidad > 0) {
            total += elemento.precio * elemento.cantidad;
            let mi_fila = document.createElement("tr");
            mi_fila.setAttribute("id", elemento.id);
            let mi_celda = document.createElement("td");
            mi_celda.innerText = elemento.cantidad;
            mi_fila.appendChild(mi_celda);

            let mi_celda3 = document.createElement("td");
            mi_celda3.innerHTML = `<b> ${elemento.nombre}</b>`;
            mi_fila.appendChild(mi_celda3);

            let mi_celda2 = document.createElement("td");
            mi_celda2.innerText = elemento.precio;
            mi_fila.appendChild(mi_celda2);

            let mi_celda4 = document.createElement("td");
            mi_celda4.innerHTML = '<i class="fas fa-trash-alt" onclick ="borra(' + elemento.id + ')"></i>';
            mi_fila.appendChild(mi_celda4);

            mi_tabla_body.appendChild(mi_fila);
        }

    }
    let mi_filaTotal = document.createElement("tr");

    let Total = document.createElement("td");
    Total.setAttribute("colspan", "2");
    Total.setAttribute("align", "right");
    Total.innerText = 'TOTAL:';
    mi_filaTotal.appendChild(Total);

    let montoTotal = document.createElement("td");
    montoTotal.setAttribute("colspan", "2");
    montoTotal.innerText = total;
    mi_filaTotal.appendChild(montoTotal);

    mi_tabla_body.appendChild(mi_filaTotal);


    mi_tabla.appendChild(mi_tabla_body);
    document.getElementById("inferior").appendChild(mi_tabla);
    let boton = document.getElementById('pagar');
    boton.style.visibility = "visible";

}
// elimina producto del listado seleccionado
function borra(id) {


    productos.map(function (dato) {
        if (dato.id == id) {
            dato.cantidad = 0;
        }
    });
    console.log(productos);
    var total = 0;
    for (elemento of productos) {
        total = total + parseInt(elemento.cantidad);
    }
    mostrar_carrito();
    totalizaCarrito(total);
}