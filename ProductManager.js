const fs = require("fs").promises;

class Tecnologia {
  static id = 0;

  constructor() {
    this.path = "./Tecnologia.json";
    this.tecnologia = [];
  }

  async addProduct(tecnologia) {
    // Validación de campos obligatorios
    if (!tecnologia.title || !tecnologia.description || !tecnologia.price || !tecnologia.thumbnail || !tecnologia.code || !tecnologia.stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    // Validación de código no repetido
    if (this.tecnologia.some(t => t.code === tecnologia.code)) {
      console.error("El código del producto ya existe");
      return;
    }

    // Si pasa las validaciones, agregamos el nuevo producto
    this.tecnologia.push({ id: ++Tecnologia.id, ...tecnologia });
    
    try {
      await fs.writeFile(this.path, JSON.stringify(this.tecnologia, null, 2));
      console.log("Producto de tecnología agregado con éxito", tecnologia);
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  async readTecnologia() {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Manejar el caso en el que el archivo está vacío o no es un JSON válido
      console.error("Error al leer el archivo JSON:", error.message);
      return [];
    }
  }

  async updateTecnologia({ id, ...tecnologia }) {
    await this.upadateTecnologiaInfo(id);
    let tecnologiaOld = await this.readTecnologia();
    let updateData = [{ id, ...tecnologia }, ...tecnologiaOld];
    
    try {
      await fs.writeFile(this.path, JSON.stringify(updateData));
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  async deleteTecnologia(id) {
    let dropData = await this.readTecnologia();
    let tecnologiaFilter = dropData.filter(tecnologia => tecnologia.id !== id);
    
    try {
      await fs.writeFile(this.path, JSON.stringify(tecnologiaFilter));
      console.log("El producto Tecnológico con el Id #", id, " ha sido eliminado");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  async upadateTecnologiaInfo(id) {
    let dropData = await this.readTecnologia();
    let tecnologiaFilter = dropData.filter(tecnologia => tecnologia.id !== id);
    
    try {
      await fs.writeFile(this.path, JSON.stringify(tecnologiaFilter, null, 2));
      console.log("El producto Tecnológico con el id #", id, " ha sido actualizado");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  async getTecnologia() {
    let getData = await this.readTecnologia();
    console.log("\nTodos nuestros productos Tecnológicos disponibles: ", getData);
  }

  async getTecnologiaById(id) {
    let getId = await this.readTecnologia();
    if (!getId.find(tecnologia => tecnologia.id === id)) {
      console.warn("El producto Tecnológico no existe!");
    } else {
      console.log("\nEl producto Tecnológico con el id #", id, " es:", getId.find(tecnologia => tecnologia.id === id));
    }
  }
}

// Instanciado
const producto = new Tecnologia();

// Definición de los productos
const producto1 = {
  title: "Monitor Philips",
  description: "Monitor Philips 221v8/77 21,5'' Full Hd 75 Hz Lcd 4 Ms Color Negro",
  price: 142.799,
  thumbnail: "./public/img/MonitorPhilips.png",
  code: "pro1",
  stock: 10
};

const producto2 = {
  title: "Monitor Gamer Aoc",
  description: "Monitor Gamer Aoc 24 Fhd G2490vx 144hz 1ms Amd Freesync Color Negro",
  price: 289919,
  thumbnail: "./public/img/MonitorGamer Aoc.png",
  code: "pro2",
  stock: 15
};

const producto3 = {
  title: "Notebook Hp",
  description: "Notebook Hp 14-em0007la Ryzen 3 8gb Ram 512gb Windows 11 Color Dorado",
  price: 765999,
  thumbnail: "./public/img/NotebookHp.png",
  code: "pro3",
  stock: 30
};

const producto4 = {
  title: "Notebook Dell",
  description: "Notebook Dell Inspiron 3525 plata 15.5 AMD Ryzen 5 5500U 8GB de RAM 512GB SSD, AMD Radeon RX Vega 7 120 Hz 1920x1080px Windows 11 Home",
  price: 699999,
  thumbnail: "./public/img/NotebookDell.png",
  code: "pro4",
  stock: 23
};

// Agregar productos usando el método addProduct (Se debe ejecutar 1 sola vez y despues comentar los 4 addProduct para ver el correcto funcionamiento de los metodos)
/* producto.addProduct(producto1);
producto.addProduct(producto2);
producto.addProduct(producto3);
producto.addProduct(producto4); */

// Descomentar los métodos para usarlos
// producto.getTecnologia();
// producto.getTecnologiaById(3);
// producto.deleteTecnologia(2);
// producto.updateTecnologia({ id: 3, title: 'Notebook Asus', description: 'Notebook Asus Vivobook Go 14 Windows 11 128gb Ssd 4gb Ram Color Dreamy white', price: 419999, thumbnail: './public/img/NotebookAsus.png', code: 'pro3', stock: 55 });
