const LocalDB = {
  init() {
    if (!localStorage.getItem('gympro_db')) {
      localStorage.setItem('gympro_db', JSON.stringify({
        members: [],
        trainers: [],
        payments: [],
        membershipTypes: [
          { id: 1, name: 'Básica', description: 'Acceso a área de pesas', price: 50 },
          { id: 2, name: 'Premium', description: 'Acceso completo + clases grupales', price: 80 },
          { id: 3, name: 'VIP', description: 'Todo incluido + entrenador personal', price: 120 }
        ],
        specialties: [
          { id: 1, name: 'Personal Training', description: 'Entrenamiento personalizado' },
          { id: 2, name: 'Yoga', description: 'Clases de yoga y meditación' },
          { id: 3, name: 'CrossFit', description: 'Entrenamiento funcional intensivo' }
        ]
      }));
    }
  },

  getData() {
    return JSON.parse(localStorage.getItem('gympro_db'));
  },

  saveData(data) {
    localStorage.setItem('gympro_db', JSON.stringify(data));
  },

  async get(endpoint) {
    const db = this.getData();
    return db[endpoint] || [];
  },

  async post(endpoint, item) {
    const db = this.getData();
    const newItem = { ...item, id: Date.now() };
    db[endpoint] = [...db[endpoint], newItem];
    this.saveData(db);
    return newItem;
  },

  async put(endpoint, id, updates) {
    const db = this.getData();
    const index = db[endpoint].findIndex(item => item.id === id);
    if (index !== -1) {
      db[endpoint][index] = { ...db[endpoint][index], ...updates };
      this.saveData(db);
      return db[endpoint][index];
    }
    return null;
  }
};

LocalDB.init();

export default LocalDB;