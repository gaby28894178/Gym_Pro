const API = {
  async getData(endpoint) {
    const response = await fetch(`/mock/db.json`);
    const data = await response.json();
    return data[endpoint] || [];
  },

  async addData(endpoint, newItem) {
    const response = await fetch(`/mock/db.json`);
    const data = await response.json();
    const updatedData = [...(data[endpoint] || []), newItem];
    
    // En una aplicación real, aquí haríamos una petición POST al servidor
    console.log('Datos actualizados:', { ...data, [endpoint]: updatedData });
    return newItem;
  }
};

export default API;