
const addProductButton = document.getElementById("add-product");
const editForm = document.getElementById("edit-form");
const saveEditButton = document.getElementById("save-edit");
const cancelEditButton = document.getElementById("cancel-edit");
let productos = [];


function showEditForm(index) {
    currentlyEditingIndex = index;
    const editNameInput = document.getElementById("edit-name");
    const editValueInput = document.getElementById("edit-value");

    editNameInput.value = productos[index].nombre;
    editValueInput.value = productos[index].valor;

    editForm.style.display = "block";
}


cancelEditButton.addEventListener("click", () => {
    editForm.style.display = "none";
});


addProductButton.addEventListener("click", agregarProducto);


saveEditButton.addEventListener("click", () => {
    const nuevoNombre = document.getElementById("edit-name").value;
    const nuevoValor = parseFloat(document.getElementById("edit-value").value);

    if (nuevoNombre && !isNaN(nuevoValor)) {
        productos[currentlyEditingIndex].nombre = nuevoNombre;
        productos[currentlyEditingIndex].valor = nuevoValor;
        guardarProductosEnLocalStorage();
        actualizarListaProductos();
        editForm.style.display = "none";
    }
});


function agregarProducto() {
    const nombre = document.getElementById("product-name").value;
    const valor = parseFloat(document.getElementById("product-value").value);

    if (nombre && !isNaN(valor)) {
        productos.push({ nombre, valor });
        guardarProductosEnLocalStorage();
        actualizarListaProductos();
        document.getElementById("product-name").value = "";
        document.getElementById("product-value").value = "";
    }
}


function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarProductosEnLocalStorage();
    actualizarListaProductos();
}


function guardarProductosEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}


function actualizarListaProductos() {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    const listaProductos = document.getElementById("product-list");
    listaProductos.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const listItem = document.createElement("li");
        listItem.innerHTML = `${producto.nombre} - $${producto.valor.toFixed(2)} <button onclick="showEditForm(${i})">Editar</button> <button onclick="eliminarProducto(${i})">Eliminar</button>`;
        listaProductos.appendChild(listItem);
    }
}

actualizarListaProductos();