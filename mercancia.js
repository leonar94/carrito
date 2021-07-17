const mercancias = [{ id: 1, producto: "combo pestañas", cantidad: 0, precio: "3500" },
{ id: 2, producto: "molde de silicona", cantidad: 0, precio: "2000" },
{ id: 3, producto: "Kit mirada perfecta", cantidad: 0, precio: "2000" }];

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//Almacenar producto por producto
for (const mercancia of mercancias) {
    guardarLocal(mercancia.id, JSON.stringify(mercancia));
}
// o almacenar array completo
guardarLocal("listadoProductos", JSON.stringify(mercancias));
const almacenados = JSON.parse(localStorage.getItem("listadoProductos"));



