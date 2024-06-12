import { Link } from "react-router-dom";
import { UserCog, Stamp, School, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "./Loading";

export default function SideNav() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });

    if (res.status === 200) {
      setLoading(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      toast.success("Logged out successfully");
    } else {
      setLoading(false);
      toast.error("An error occurred");
    }
  };

  const { pathname } = useLocation();
  const navItems = [
    {
      id: 1,
      name: "User Management",
      icon: <UserCog />,
      href: "/users",
    },
    {
      id: 2,
      name: "Permissions Management",
      icon: <Stamp />,
      href: "/permissions",
    },
    {
      id: 3,
      name: "Courses Management",
      icon: <School />,
      href: "/courses",
    },
  ];

  return (
    <div className="bg-white rounded-l-xl border-r justify-between flex flex-col z-50 text-[#5A6E80] w-[17vw] py-8 overflow-hidden">
      {loading && <Loading />}
      <div className="flex flex-col gap-32">
        <div className="px-8">
          <img src="/BUE_Logo.svg" alt="BUE Logo" className="w-40" />
        </div>
        <div className="flex flex-col pl-8 gap-4 font-medium">
          {navItems.map((item) => (
            <Link
              className={`flex items-center py-2 hover:border-r-4 hover:text-[#11664F] transition gap-4 ${pathname.includes(item.href) ? "border-r-4 border-[#11664F] text-[#11664F]" : ""}`}
              to={item.href}
              key={item.id}
            >
              <span>{item.icon}</span>
              <p className="text-sm">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center justify-between mx-8 px-4 rounded-lg py-3 text-blue-500 bg-[#f8f8f8] hover:bg-[#eeeeee] transition-all"
      >
        <p> Log out</p>
        <LogOut size={20} />
      </button>
    </div>
  );
}
