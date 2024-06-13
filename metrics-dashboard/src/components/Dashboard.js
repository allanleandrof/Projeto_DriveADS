// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "metrics"));
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(dataList);
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dados do Firestore</h1>
      <ul>
        {data.length > 0 ? (
          data.map(item => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))
        ) : (
          <p>Carregando dados...</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
