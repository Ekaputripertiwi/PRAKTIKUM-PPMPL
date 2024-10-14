const sinon = require('sinon');
const { expect } = require('chai');
const Service = require('../src/service');
const PrimaryRepository = require('../src/repository');
const SecondaryRepository = require('../src/secondaryRepository');

describe('Service Integration Tests with Multiple Stubs', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        // Create stub instances for both repositories
        primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
        secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
        
        // Initialize the Service instance
        service = new Service();
        
        // Inject the stubbed repositories into the service
        service.primaryRepository = primaryRepositoryStub;
        service.secondaryRepository = secondaryRepositoryStub;
    });

    it('should return item from primary repository if found', () => {
        // Arrange: Define the item to be returned by the primary repository
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);
        
        // Act: Call getItemById with id 1
        const result = service.getItemById(1);
        
        // Assert: Verify the result and that only the primary repository was called
        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
    });

    it('should return item from secondary repository if not found in primary', () => {
        // Arrange: Primary repository returns null, secondary returns the item
        primaryRepositoryStub.getItemById.withArgs(3).returns(null);
        const item = { id: 3, name: 'Item 3' };
        secondaryRepositoryStub.getItemById.withArgs(3).returns(item);
        
        // Act: Call getItemById with id 3
        const result = service.getItemById(3);
        
        // Assert: Verify the result and that both repositories were called appropriately
        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    });

    it('should throw an error if item is not found in both repositories', () => {
        // Arrange: Both repositories return null for id 5
        primaryRepositoryStub.getItemById.withArgs(5).returns(null);
        secondaryRepositoryStub.getItemById.withArgs(5).returns(null);
        
        // Act & Assert: Expect an error to be thrown when item is not found
        expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
        expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;        
    });

    it('should delete item from primary repository if found', () => {
    // Arrange: Primary repository contains the item and delete is successful
    primaryRepositoryStub.deleteItemById.withArgs(3).returns(true);
    
    // Act: Call deleteItemById with id 3
    const result = service.deleteItemById(3);
    
    // Assert: Verify that the item was deleted from the primary repository
    expect(result).to.be.true; // Pastikan hasil penghapusan true
    expect(primaryRepositoryStub.deleteItemById.calledOnceWith(3)).to.be.true; // Pastikan stub deleteItemById dipanggil
    expect(secondaryRepositoryStub.deleteItemById.notCalled).to.be.true; // Pastikan repository kedua tidak dipanggil
});
});