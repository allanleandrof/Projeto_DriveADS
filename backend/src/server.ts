import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('serviceMetridoorsKey.json'),
});

admin.firestore().collection('metrics').get()
    .then(response => {
        const datas = response.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id,
        }));

        console.log(datas);
    })
    .catch(error => console.error(error));
