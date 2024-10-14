const Repository = require('./repository');

class Service {
    constructor() {
        this.primaryRepository = new Repository(); // Repository utama
        this.secondaryRepository = new Repository(); // Repository sekunder
    }

    getAllItems() {
        return this.primaryRepository.getAllItems();
    }

    getItemById(id) {
        let item = this.primaryRepository.getItemById(id);
        if (!item) {
            item = this.secondaryRepository.getItemById(id);
        }
        if (!item) {
            throw new Error('Item not found in both repositories');
        }
        return item;
    }

    addItem(name) {
        const newItem = { id: this.primaryRepository.data.length + 1, name }; 
        return this.primaryRepository.addItem(newItem);
    }

    deleteItemById(id) {
        const isDeletedFromPrimary = this.primaryRepository.deleteItemById(id);
        if (isDeletedFromPrimary) {
            return true;
        }
        return this.secondaryRepository.deleteItemById(id);
    }
}

module.exports = Service;