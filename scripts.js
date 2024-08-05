// Arreglo precargado con los productos
let productos = [{nombre : "Manzana", precio : 100, stock : 30}, {nombre : "Naranja", precio : 80, stock : 30}, {nombre : "Arroz", precio : 50, stock : 30}, {nombre : "Papa", precio : 30, stock : 30}, {nombre : "Manteca", precio : 90, stock : 30}, {nombre : "Detergente", precio : 120, stock : 30}, {nombre : "Carne", precio : 500, stock : 30}, {nombre : "Pollo", precio : 400, stock : 30}, {nombre : "Pescado", precio : 600, stock : 30}, {nombre : "Leche", precio : 110, stock : 30}];

// Identifico la lista de mi HTML
let lista = document.getElementById("lista-productos");


cargarProductos();

function cargarProductos(){
    for(let c=0; c<productos.length; c++){
        // Para cada producto del arreglo, creo un elemento li donde va a ser insertado
        let newli = document.createElement("li");
        // Agrego el contenido del item de la lista con el nombre del producto y su precio
        newli.textContent = productos[c].nombre +" $"+ productos[c].precio +"/kg"+ " Stock: "+ productos[c].stock;
        // Inserto el item en la lista
        lista.appendChild(newli);

            // Creo un input para que el usuario pueda ingresar la cantidad de producto que desea comprar
            let newinput = document.createElement("input");
            newinput.type = "text";
            newinput.className = "input-producto";
            newli.appendChild(newinput);

            // Creo un botón para que el usuario pueda agregar el producto al carrito
            let newbutton = document.createElement("button");
            newbutton.textContent = "Agregar";
            newbutton.className = "boton-agregar";
            newbutton.addEventListener('click', agregarProducto);
            newli.appendChild(newbutton);
    }
}

function agregarProducto(event){
    const button = event.target;
    const li = button.parentElement;
    const input = li.querySelector('.input-producto');
    const cantidad = input.value;

    if (cantidad && !isNaN(cantidad)) {
        // Aquí puedes realizar alguna acción con la cantidad obtenida, por ejemplo, agregar al carrito
        alert(`Producto agregado: ${cantidad} kg`);
        restarProductoAlStock(cantidad, li);
        let producto = productos.find(producto => producto.nombre === li.textContent.split(" ")[0]);
        sumarAlTotal(producto.precio * cantidad);
    } else {
        alert('Por favor, ingrese una cantidad válida');
    }
}

function restarProductoAlStock(cantidad, li){
    const producto = productos.find(producto => producto.nombre === li.textContent.split(" ")[0]);
    if (producto.stock >= cantidad) {
        producto.stock -= cantidad;
        li.textContent = producto.nombre +" $"+ producto.precio +"/kg"+ " Stock: "+ producto.stock;

        let newinput = document.createElement("input");
        newinput.type = "text";
        newinput.className = "input-producto";
        li.appendChild(newinput);

        let newbutton = document.createElement("button");
        newbutton.textContent = "Agregar";
        newbutton.className = "boton-agregar";
        newbutton.addEventListener('click', agregarProducto);
        li.appendChild(newbutton);
    } else {
        alert('No hay suficiente stock');
    }
}

function sumarAlTotal(cantidad){
    // Identifico el span "total" de mi HTML productos
    let inputTotal = document.getElementById("total");
    console.log(inputTotal);

    let cantidadActual = parseInt(inputTotal.textContent.split("$")[1]);
    console.log(cantidadActual);

    inputTotal.appendChild(document.createTextNode("Total: $"+ cantidadActual + cantidad));


}