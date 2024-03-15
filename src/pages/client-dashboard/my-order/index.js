import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import ClientMyOrder from "@/components/pageComponents/ClientDashboard/ClientMyOrder/ClientMyOrder";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
  const [totalOrder, setTotalOrder] = useState([]);
  const getOrder = async (user) => {
    try {
      const response = await axios.get(`${baseUrl}/allOrderForUser/${user.id}`,{headers:headers});
      setTotalOrder(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      getOrder(user);
    }
  }, []);

  return (
    <>
      <ClientMyOrder totalOrder={totalOrder}/>
    </>
  );
};

export default Index;
