class Repository {
    constructor() {
        this.data = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
        ];
    }

    getAllItems() {
        return this.data;
    }

    getItemById(id) {
        return this.data.find(item => item.id === id);
    }

    addItem(item) {
        this.data.push(item);
        return item;
    }

    deleteItemById(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true; // Item berhasil dihapus
        }
        return false; // Item tidak ditemukan
    }
}

module.exports = Repository;