// test/api.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
    it('should return all items', (done) => {
    request(app)
    .get('/api/items')
    .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
    });
});

    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
        .post('/api/items')
        .send(newItem)
        .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name', 'Item 3');
            done();
        });
});

describe('Pengujian API untuk DELETE dan UPDATE', () => {
    // Skenario DELETE
    describe('Pengujian DELETE /api/items/:id', () => {
        let itemId; // Menyimpan ID item untuk digunakan dalam pengujian

        before((done) => {
            // Buat item sebelum pengujian
            request(app)
                .post('/api/items')
                .send({ name: 'Item 4' })
                .end((err, res) => {
                    itemId = res.body.id; // Simpan ID item yang baru dibuat
                    done();
                });
        });

        it('seharusnya menghapus item yang ada', (done) => {
            request(app)
                .delete(`/api/items/${itemId}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('message', 'Item deleted successfully');
                     done();
                });
        });

        it('seharusnya tidak menghapus item yang tidak ada', (done) => {
            request(app)
                .delete('/api/items/999')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('message', 'Item not found');
                    done();
                });
        });

        it('seharusnya tidak menghapus item dengan ID negatif', (done) => {
            request(app)
                .delete('/api/items/-1')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('message', 'Item not found');
                    done();
                });
        });
    });


    // Skenario UPDATE
    describe('Pengujian UPDATE /api/items/:id', () => {
        it('seharusnya memperbarui item yang ada', (done) => {
            const newItem = { name: 'Item 4' };
            request(app)
                .post('/api/items')
                .send(newItem)
                .end((err, res) => {
                    const itemId = res.body.id;
                    const updatedData = { name: 'Updated Item 4' };
                    request(app)
                        .put(`/api/items/${itemId}`)
                        .send(updatedData)
                        .end((err, res) => {
                            expect(res.status).to.equal(200);
                            expect(res.body).to.have.property('name', 'Updated Item 4');
                            done();
                        });
                });
        });

        it('seharusnya tidak memperbarui item yang tidak ada', (done) => {
            const updatedData = { name: 'New Name' };
            request(app)
                .put('/api/items/999')
                .send(updatedData)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('message', 'Item not found');
                    done();
                });
        });

        it('seharusnya tidak memperbarui item dengan ID negatif', (done) => {
            const updatedData = { name: 'New Name' };
            request(app)
                .put('/api/items/-1')
                .send(updatedData)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('message', 'Item not found');
                    done();
                });
        });
    });
});


});