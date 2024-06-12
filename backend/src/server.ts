import admin from 'firebase-admin';

enum MetricType {
  OPEN_QR = 'NumOpenQR',
  NUM_PASSED = 'NumPassed',
};

admin.initializeApp({
  credential: admin.credential.cert('serviceMetridoorsKey.json.json'),
});

admin.firestore().collection('metrics').get()
  .then(response => {
    const updatePromises = response.docs.map(doc => {
      const data = doc.data();
      let newValue;

      if (data.metricName === MetricType.OPEN_QR) {
        const previousValue = data.value || 0;
        const randomFactor = 0.9 + Math.random() * 0.2;

        newValue = Math.ceil(previousValue * randomFactor);
      } else if (data.metricName === MetricType.NUM_PASSED) {
        const previousValue = data.value || 0;
        const randomIncrement = Math.floor(Math.random() * 5) + 1; // Incremento aleatório entre 1 e 5

        newValue = previousValue + randomIncrement;
      } else {
        // Se a métrica não for "NumOpenQR" nem "NumPassed", mantém o valor atual
        return Promise.resolve();
      }

      return doc.ref.update({ value: newValue });
    });

    // Executa todas as atualizações em paralelo
    return Promise.all(updatePromises);
  })
  .then(() => {
    console.log('Valores das métricas "NumOpenQR" e "NumPassed" atualizados com sucesso');
  })
  .catch(error => console.error('Erro ao atualizar valores das métricas:', error));

admin.firestore().collection('metrics').get()
    .then(response => {
        const datas = response.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id,
        }));

        console.log(datas);
    })
    .catch(error => console.error(error));
