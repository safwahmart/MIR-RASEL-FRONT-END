import SWImages from "@/components/reuseComponents/SWImages";
import SWList from "@/components/reuseComponents/SWList";
import { H4 } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuLink } from "./MenuLink";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { signOut } from 'next-auth/react'
import { imageUrl } from "@/api/apiConfig";

const ClientSidebar = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      setUserData(user);
    }
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    toast.success('Successfully logged out!')
    signOut();
    // router.push('/login');
    window.location.replace("/login");
    
  }
  return (
    <>
      <div className="sw__client__sidebar">
        {/* profile */}
        <div className="sw__profile__img">
          <SWImages
            image={userData?.photo?`${imageUrl}/uploads/${userData?.photo}`:"/images/review.png"}
            height="120"
            width="120"
            alt="profile"
          />
          <H4 h4={userData?.name} />
        </div>
        {/* menu */}
        <div className="menu__list">
          <SWList>
            {MenuLink?.map((data, i) => (
              <li key={i}>
                <Link
                  href={data.url}
                  className={router.pathname === data.url ? "active" : ""}
                  onClick={data.name === 'Logout'?handleLogout:''}
                >
                  {data.icon} {data.name}
                </Link>
              </li>
            ))}
          </SWList>
        </div>
      </div>
    </>
  );
};

export default ClientSidebar;
