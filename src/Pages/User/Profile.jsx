import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function Profile() {
  const userDetailes = useSelector((state) => state?.auth?.data);
  return (
    <HomeLayout>
      <div className="h-[90vh] flex items-center justify-center">
        <div
          className="flex flex-col gap-2 items-center justify-center my-10
        rounded-lg p-4  text-white w-96 shadow-[0_0_10px_black] "
        >
          <img
            src={userDetailes?.avatar?.secure_url}
            alt="user image"
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userDetailes?.fullname}
          </h3>

          <div className="grid grid-col-2 gap-1 ">
            <p>
              {" "}
              Email:<span className="ml-2">{userDetailes?.email}</span>{" "}
            </p>
            <p>
              {" "}
              Role: <span className="ml-2">{userDetailes?.role}</span>{" "}
            </p>
            <p>
              Subscription:{" "}
              {userDetailes?.subscription?.status === "active" ? (
                <span className="ml-2">{"Active"}</span>
              ) : (
                <span className="ml-2">{"Inactive"}</span>
              )}
            </p>
          </div>

          <div
            className="flex items-center 
          justify-between
          gap-2 w-full
          mt-2
        "
          >
            <Link
              to="/changepassword"
              className="
              w-1/2
              rounded-sm
              bg-yellow-600
              hover:bg-yellow-500 transition-all ease-in-out duration-300 font-semibold
              cursor-pointer
              text-center
              py-2
              "
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/user/editprofile"
              className=" w-1/2
              rounded-sm
              bg-yellow-600
              hover:bg-yellow-500 transition-all ease-in-out duration-300 font-semibold
              cursor-pointer
              text-center
              py-2
              
              "
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userDetailes?.subscription?.status === "active" && (
            <button
              className=" w-full
              rounded-sm
              bg-red-600
              hover:bg-red-500 transition-all ease-in-out duration-300 font-semibold
              cursor-pointer
              text-center
              py-2
              
              "
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
