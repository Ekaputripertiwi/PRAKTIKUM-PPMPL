class SecondaryRepository {
  constructor() {
      this.data = [
          { id: 5, name: 'Item 5' },
          { id: 6, name: 'Item 6' },
      ];
  }

  getItemById(id) {
      return this.data.find(item => item.id === id);
  }

  deleteItemById(id) {
      const index = this.data.findIndex(item => item.id === id);
      if (index !== -1) {
          this.data.splice(index, 1);
          return true;
      }
      return false;
  }
}

module.exports = SecondaryRepository;