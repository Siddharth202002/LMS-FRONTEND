import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const allowedRole = "ADMIN";
  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  async function handleLogout(e) {
    e.preventDefault();
    await dispatch(logout());
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }
  return (
    <div className=" min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input type="checkbox" className="drawer-toggle " id="my-drawer" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className=" cursor-pointer relative">
            <FiMenu
              size={"32px"}
              className="font-bold text-white m-4"
              onClick={changeWidth}
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-[100%]">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={"25px"} />
              </button>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn &&
              role.trim().toLowerCase() ===
                allowedRole.trim().toLowerCase() && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )}
            {isLoggedIn &&
              role.trim().toLowerCase() ===
                allowedRole.trim().toLowerCase() && (
                <li>
                  <Link to="/course/create">Create Course</Link>
                </li>
              )}
            <li>
              <Link to="/courses"> All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%]   ">
                <div className="w-full flex items-center justify-center  ">
                  <button className="btn btn-primary  px-4 py-1 w-1/2 font-semibold rounded-md">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className=" btn btn-secondary px-4 py-1 w-1/2 ont-semibold rounded-md ">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%] ">
                <div className="w-full flex items-center justify-center">
                  <button className="btn btn-primary  px-4 py-1 w-1/2 font-semibold rounded-md">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className=" btn btn-secondary px-4 py-1 w-1/2 ont-semibold rounded-md ">
                    <Link to="/logout" onClick={handleLogout}>
                      Logout
                    </Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
