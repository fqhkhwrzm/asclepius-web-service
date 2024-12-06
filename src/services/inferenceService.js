const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

/*
    membuat fungsi predictClassification yang akan menerima dua parameter. Pertama adalah model yang akan digunakan, 
    kedua adalah image sebagai input data baru dari pengguna ketika mengirimkan request ke server
*/
 
async function predictClassification(model, image) {
    try {
        // membangun kode untuk mengonversi data gambar (image) menjadi tensor.
        const tensor = tf.node // .node untuk menangani proses inferensi data.
            .decodeJpeg(image) // untuk melakukan decode terhadap input data baru
            .resizeNearestNeighbor([224, 224]) // untuk melakukan resize gambar menggunakan algoritma Nearest Neighbor
            .expandDims() // untuk menambah dimensi gambar
            .toFloat() // untuk mengubah seluruh data yang diproses menjadi float
        // Setelah tensor didapat, gunakan tensor untuk mendapatkan prediksi, score, dan confidenceScore
 
        //  urutan kelas ini tidak boleh tertukar, diakses dengan indeks
        const classes = ['Melanocytic nevus', 'Squamous cell carcinoma', 'Vascular lesion'];
 
        const prediction = model.predict(tensor); // menampung hasil prediksi berdasarkan data baru berupa tensor (gambar yang sudah diproses sebelumnya)
        const score = await prediction.data(); // untuk mendapatkan seluruh skor yang didapatkan
        /*
            Maksudnya seperti ini, dengan menjalankan perintah prediction.data() akan menghasilkan score
            berdasarkan kelas yang ada ('Melanocytic nevus', 'Squamous cell carcinoma', 'Vascular lesion').  
            Skor yang dihasilkan akan bervariasi dan dimulai dari 0 hingga 1. Contohnya, kode tersebut akan 
            menghasilkan [0.2, 0.7, 0.1] yang menandakan bahwa prediksi tersebut menghasilkan skor yang tinggi 
            pada kelas kedua atau Squamous cell carcinoma
        */
        const confidenceScore = Math.max(...score) * 100; // untuk mendapatkan skor tertinggi dari prediksi sebelumnya
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        // tf.argMax(prediction, 1) untuk menghitung indeks dengan nilai maksimum untuk setiap baris dari tensor
        // .dataSync() untuk mengambil data dari tensor, output dari metode ini adalah array yang berurutan dari terbesar hingga terkecil.
        // [0] untuk mengambil elemen pertama dari array tersebut (nilai terbesar)
        const label = classes[classResult];
 
        let explanation, suggestion;
 
        if(label === 'Melanocytic nevus') {
            explanation = "Melanocytic nevus adalah kondisi di mana permukaan kulit memiliki bercak warna yang berasal dari sel-sel melanosit, yakni pembentukan warna kulit dan rambut."
            suggestion = "Segera konsultasi dengan dokter terdekat jika ukuran semakin membesar dengan cepat, mudah luka atau berdarah."
        }
 
        if(label === 'Squamous cell carcinoma') {
            explanation = "Squamous cell carcinoma adalah jenis kanker kulit yang umum dijumpai. Penyakit ini sering tumbuh pada bagian-bagian tubuh yang sering terkena sinar UV."
            suggestion = "Segera konsultasi dengan dokter terdekat untuk meminimalisasi penyebaran kanker."
        }
 
        if(label === 'Vascular lesion') {
            explanation = "Vascular lesion adalah penyakit yang dikategorikan sebagai kanker atau tumor di mana penyakit ini sering muncul pada bagian kepala dan leher."
            suggestion = "Segera konsultasi dengan dokter terdekat untuk mengetahui detail terkait tingkat bahaya penyakit."
        
        }
 
        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        // memberikan pesan `Terjadi kesalahan input: ${error.message}` jika program menangkap terjadinya kesalahan.
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;