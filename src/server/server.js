// File ini bertanggung jawab untuk memuat kode, membuat konfigurasi, serta menjalankan HTTP server menggunakan Hapi
const Hapi = require('@hapi/hapi');
(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    })
})