import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Chart from "chart.js";

const Dashboard = () => {
  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "metrics"));
        const newDataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDataList(newDataList);
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dataList) {
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: dataList.map(item => item.metricName), 
          datasets: [{
            label: "Valor",
            data: dataList.map(item => item.value),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }, [dataList]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="chart-container">
        {dataList ? (
          <canvas id="myChart" className="chart"></canvas>
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
