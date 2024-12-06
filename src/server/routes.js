// File ini bertanggung jawab menangani alur permintaan API
const postPredictHandler = require('../server/handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        // menambahkan options payload untuk membuat routes ini bisa menerima data berupa gambar
        options: {
            payload: {
                // Mengizinkan data berupa gambar
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    }
]

module.exports = routes;