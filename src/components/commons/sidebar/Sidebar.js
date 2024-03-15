import SWImages from "@/components/reuseComponents/SWImages";
import Link from "next/link";

import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

import { baseUrl, imageUrl } from "@/api/apiConfig";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SidebarMenu = () => {
  const router = useRouter();
  const language = router.locale;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getCategories`);
      if (response) {
        setCategories(response?.data?.data);
      }
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <>
      <div className="sw__sidebar">
        <Sidebar>
          <Menu>
            {categories?.map((data, i) => (
              <SubMenu
                key={i}
                className={router.pathname == data?.slug ? "active" : ""}
                label={language === "bn" ? data.name_bn : data.name}
                icon={
                  <SWImages
                    image={`${imageUrl}/uploads/${data.icon}`}
                    width="30"
                    height="30"
                    alt="img"
                  />
                }
              >
                {data.child?.map((item, i) => (
                  <>
                    <MenuItem
                      key={i}
                      className={router.pathname == data?.slug ? "active" : ""}
                      component={
                        <Link
                          href={`/category/sub-category/product?sub=${item.slug}`}
                        />
                      }
                    >
                      {language === "bn" ? item.name_bn : item.name}
                    </MenuItem>
                  </>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarMenu;
