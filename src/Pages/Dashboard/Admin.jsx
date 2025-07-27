import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/razorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,

  Legend,
  LinearScale,
  Title,
  Tooltip
);

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserCount, subscribedUser } = useSelector(
    (state) => state.statsOfUser
  );

  const { allPayments, finalMonths, monthlySalesRecored } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["registered User", "Enrolled User"],
    datasets: [
      {
        font: "white",
        label: "User Detailes",
        data: [allUserCount, subscribedUser],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        font: "white",
        label: "Sales / Month",
        data: monthlySalesRecored,
        backgroundColor: ["rgb(255,99,132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  const myCourses = useSelector((state) => state?.courses?.courseData);
  console.log(myCourses);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  return (
    <HomeLayout>
      <div className="m-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          {/* left side */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5 ">
              <div className="flex  justify-between p-5 gap-5 rounded-md shadow-md ">
                <div className="flexc flex-col items-center">
                  <p className="font-semibold ">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUserCount}</h3>
                </div>
                <FaUsers className="text-5xl text-yellow-500" />
              </div>

              <div className="flex justify-between p-5 gap-5 rounded-md shadow-md ">
                <div className="flexc flex-col items-center">
                  <p className="font-semibold ">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedUser}</h3>
                </div>

                <FaUsers className="text-5xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="h-80 w-full relative">
              <Bar className="absolute bottom-0 h-80 w-ful" data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5 ">
              <div className="flex  justify-between p-5 gap-5 rounded-md shadow-md ">
                <div className="flexc flex-col items-center">
                  <p className="font-semibold ">Subscription Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-5xl text-yellow-500" />
              </div>

              <div className="flex justify-between p-5 gap-5 rounded-md shadow-md ">
                <div className="flexc flex-col items-center">
                  <p className="font-semibold ">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>

                <GiMoneyStack className="text-5xl text-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses overview
            </h1>

            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300
              cursor-pointer py-2 px-2 font-semibold text-lg rounded-sm "
            >
              Create new course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>S NO</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th> Instructor</th>
                <th>Total Lectrues</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCourses?.map((course, idx) => {
                return (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>

                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>
                    <td className="w-80">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="h-24 w-full bg-transparent resize-none overflow-y-auto "
                      ></textarea>
                    </td>
                    <td className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 cursor-pointer rounded-md py-2 px-4 font-semibold"
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        onClick={() => onCourseDelete(course?._id)}
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 cursor-pointer rounded-md py-2 px-4 font-semibold"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Admin;
