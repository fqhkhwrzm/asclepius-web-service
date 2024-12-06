const { Firestore } = require('@google-cloud/firestore');

// menerima dua parameter, yakni id dan data (response API)
async function storeData(id, data) {
    const db = new Firestore();

    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
}

module.exports = storeData;