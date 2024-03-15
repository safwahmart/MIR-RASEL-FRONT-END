import SWLink from "@/components/reuseComponents/SWLink";
import SWList from "@/components/reuseComponents/SWList";
import { H6 } from "@/components/reuseComponents/Tags";
import { useRouter } from "next/router";
import SidebarMenu from "../../sidebar/Sidebar";

const LastHeader = ({ offers }) => {
  const router = useRouter();

  return (
    <>
      <section className="sw__last__header d_flex d_justify">
        {/* sw__left */}
        <div className="sw__left">
          <button>
            <i className="flaticon-menu"></i> <H6 h6="Category" />
          </button>
          <SidebarMenu />
          <div className="Menu">
            <SWList>
              {offers?.map((data, i) => (
                <li
                  className={
                    router.pathname == `offer/${data?.slug}` ? "active" : ""
                  }
                  key={i}
                >
                  <SWLink url={`/offer/${data.slug}`} name={data.name} />
                </li>
              ))}
            </SWList>
          </div>
        </div>
      </section>
    </>
  );
};

export default LastHeader;
