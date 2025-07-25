import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  delteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  const { role } = useSelector((state) => state?.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }

    dispatch(getCourseLectures(state?._id));
  }, []);

  function onLectureDelete(courseId, lectureId) {
    dispatch(delteCourseLectures({ courseId, lectureId }));
    dispatch(getCourseLectures(courseId));
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] py-10 px-20 flex flex-col gap-10 items-center justify-center text-white">
        <div className="text-center text-2xl font-semibold text-yellow-500 underline">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 && (
          <div className=" flex justify-center gap-10 w-full">
            {/* {left part for plaring video and displaying course details to admin} */}
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rouned-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>

              <div>
                <h1>
                  <span className="text-yellow-500 ">Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* {right for displaying list of lectures} */}

            <ul className="w-[28rem] p-2 shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures list</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>

              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer "
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span> Lecture{idx + 1}</span>
                      </p>

                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="btn btn-accent px-2 py-1 rounded-md font-semibold"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {lectures.length === 0 && role === "ADMIN" ? (
          <button
            onClick={() =>
              navigate("/course/addlecture", { state: { ...state } })
            }
            className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
          >
            Add new lecture
          </button>
        ) : (
          <div className=" ">
            <h1 className="text-yellow-500  font-semibold text-xl">
              No Lecture Found{" "}
            </h1>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
