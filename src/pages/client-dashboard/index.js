import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import ClientHome from "@/components/pageComponents/ClientDashboard/ClientHome/ClientHome";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Index = () => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter()

  const getTotalOrder = async (user) => {
    try {
      const response = await axios.get(`${baseUrl}/totalOrderForUser/${user.id}`,{headers:headers});
      setTotalOrder(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  const getTotalPrice = async (user) => {
    try {
      const response = await axios.get(`${baseUrl}/totalPriceForUser/${user.id}`,{headers:headers});
      setTotalPrice(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      getTotalOrder(user);
      getTotalPrice(user);
      checkLogin(user);
    }
  }, []);
  const checkLogin=(user)=>{
    if(user === null || Object.keys(user).length ===0){
      router.push('/login')
    }
  }
  return (
    <>
      <ClientHome totalOrder={totalOrder} totalPrice={totalPrice}/>
    </>
  );
};

export default Index;
