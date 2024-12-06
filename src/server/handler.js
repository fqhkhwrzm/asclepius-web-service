// File ini bertanggung jawab menangani seluruh request dan response yang masuk, seluruh fungsi atau logika aplikasi akan disimpan pada folder services
/* 
     extension onPreResponse, extension adalah fitur untuk menambahkan fungsionalitas tertentu. Pada konteks 
     kali ini, kita akan menambahkan fungsionalitas onPreResponse. Extension onPreResponse pada Hapi bertujuan 
     untuk melakukan manipulasi atau tindakan tertentu sebelum respons dikirimkan kembali ke klien.
     extension ini untuk menangani jika terjadi response error. 
*/
async function postPredictHandler(request, h) {
    validateNotePayload(request.payload);
    const { title = 'untitiled', tags, body } = request.payload;
    const noteId = await addNote({ title, tags, body });
    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
            noteId,
        }
    });
    response.code(201);
    return response;
};

module.exports = postPredictHandler;