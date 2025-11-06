 // Variables globales
      let productos = JSON.parse(localStorage.getItem("productos")) || [];
      let tasaCambiaria =
        parseFloat(localStorage.getItem("tasaCambiaria")) || 8.5;
      let modoEdicion = false;
      let editarId = null;

      // Elementos DOM
      const form = document.getElementById("form-productos");
      const nombreInput = document.getElementById("nombre");
      const precioUSDInput = document.getElementById("precio-dolares");
      const btnAgregar = document.getElementById("btn-agregar");
      const btnCancelar = document.getElementById("btn-cancelar");
      const tasaInput = document.getElementById("tasa-cambiaria");
      const tablaProductos = document.getElementById("tabla-productos");
      const buscarInput = document.getElementById("buscar");

      // Guardar productos y tasa en localStorage
      function guardarStorage() {
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("tasaCambiaria", tasaCambiaria.toString());
      }

      // Renderizar tabla según productos y filtro de búsqueda
      function renderTabla(filtro = "") {
        const filtroMinus = filtro.toLowerCase();
        tablaProductos.innerHTML = productos
          .filter((p) => p.nombre.toLowerCase().includes(filtroMinus))
          .map((p) => {
            const precioBs = (p.precioUSD * tasaCambiaria).toFixed(2);
            return `
          <tr data-id="${p.id}">
            <td>${p.nombre}</td>
            <td>$${p.precioUSD.toFixed(2)}</td>
            <td>Bs. ${precioBs}</td>
            <td>
              <button class="edit" data-id="${p.id}">Editar</button>
              <button class="delete" data-id="${p.id}">Eliminar</button>
            </td>
          </tr>
        `;
          })
          .join("");
        agregarEventosBotones();
      }

      // Añadir eventos a botones de editar y eliminar
      function agregarEventosBotones() {
        document.querySelectorAll("button.edit").forEach((btn) => {
          btn.onclick = () => {
            const id = btn.dataset.id;
            modoEdicion = true;
            editarId = id;
            const p = productos.find((prod) => prod.id === id);
            nombreInput.value = p.nombre;
            precioUSDInput.value = p.precioUSD;
            btnAgregar.textContent = "Guardar";
            btnCancelar.style.display = "inline-block";
          };
        });
        document.querySelectorAll("button.delete").forEach((btn) => {
          btn.onclick = () => {
            const id = btn.dataset.id;
            productos = productos.filter((p) => p.id !== id);
            guardarStorage();
            renderTabla(buscarInput.value);
          };
        });
      }

      // Limpiar formulario y resetear modo edición
      function limpiarFormulario() {
        form.reset();
        modoEdicion = false;
        editarId = null;
        btnAgregar.textContent = "Agregar";
        btnCancelar.style.display = "none";
      }

      // Form submit - agregar o editar producto
      form.onsubmit = (e) => {
        e.preventDefault();
        const nombre = nombreInput.value.trim().toUpperCase();
        const precioUSD = parseFloat(precioUSDInput.value);

        if (!nombre || isNaN(precioUSD) || precioUSD < 0) {
          alert("Por favor, ingrese datos válidos");
          return;
        }

        if (modoEdicion) {
          // Editar
          const prodIndex = productos.findIndex((p) => p.id === editarId);
          if (prodIndex !== -1) {
            productos[prodIndex].nombre = nombre;
            productos[prodIndex].precioUSD = precioUSD;
          }
        } else {
          // Agregar
          const nuevoProducto = {
            id: Date.now().toString(),
            nombre,
            precioUSD,
          };
          productos.push(nuevoProducto);
        }
        guardarStorage();
        limpiarFormulario();
        renderTabla(buscarInput.value);
      };

      btnCancelar.onclick = () => {
        limpiarFormulario();
      };

      // Actualizar tasa cambiaria y recalcular precios
      tasaInput.oninput = () => {
        const val = parseFloat(tasaInput.value);
        if (!isNaN(val) && val > 0) {
          tasaCambiaria = val;
          guardarStorage();
          renderTabla(buscarInput.value);
        }
      };

      // Buscar productos
      buscarInput.oninput = () => {
        renderTabla(buscarInput.value);
      };

      // Inicialización
      tasaInput.value = tasaCambiaria;
      renderTabla();
   