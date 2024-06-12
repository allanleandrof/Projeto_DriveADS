import admin from 'firebase-admin';
import schedule from 'node-schedule';

enum MetricType {
  OPEN_QR = 'NumOpenQR', //Total de vezes que o qrcode foi aberto
  NUM_PASSED = 'NumPassed', //Pessoas que passaram pelo autdoor
  CHECK_QR = 'SingleCheckQr', //Numero de usuarios individuais que acessaram o qrcode
  PASSED_LOCKED = 'PassedLocked' //Pessoas que passaram pelo autdoor e o olharam
};

admin.initializeApp({
  credential: admin.credential.cert('serviceMetridoorsKey.json'),
});

/**
 * Tarefa agendada que executa a cada 10 segundos
 * 
 * A cada 10 segundos as métricas OPEN_QR e NUM_PASSED são atualizadas aleatoriamente,
 * assim simulando a captura do sistema de monitoramento do Outdoor.
 */
schedule.scheduleJob('*/10 * * * * *', function() {
  admin.firestore().collection('metrics').get()
    .then(response => {
      const updatePromises = response.docs.map(doc => {
        const data = doc.data();
        let newValue;

        if (data.metricName === MetricType.OPEN_QR) {
          const previousValue = data.value || 0;
          const randomIncrement = Math.floor(Math.random() * 4) + 1; // Incremento aleatório entre 1 e 4

          newValue = previousValue + randomIncrement;
        } else if (data.metricName === MetricType.NUM_PASSED) {
          const previousValue = data.value || 0;
          const randomIncrement = Math.floor(Math.random() * 9) + 1; // Incremento aleatório entre 1 e 9

          newValue = previousValue + randomIncrement;
        } else if (data.metricName === MetricType.CHECK_QR) {
          const previousValue = data.value || 0;
          const randomIncrement = Math.floor(Math.random() * 2) + 1; // Incremento aleatório entre 1 e 2

          newValue = previousValue + randomIncrement;
        } else if (data.metricName === MetricType.PASSED_LOCKED) {
          const previousValue = data.value || 0;
          const randomIncrement = Math.floor(Math.random() * 6) + 1; // Incremento aleatório entre 1 e 6

          newValue = previousValue + randomIncrement;
        } else {
          // Se a métrica não for "NumOpenQR", "NumPassed", "SingleCheckQr" nem "PassedLocked", mantém o valor atual
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
});
