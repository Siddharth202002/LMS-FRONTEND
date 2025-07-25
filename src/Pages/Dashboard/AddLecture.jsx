import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    cid: state._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setUserInput({ ...userInput, [name]: value });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!userInput.lecture || !userInput.description || !userInput.title) {
      toast.error("All fields are required");
      return;
    }

    const response = await dispatch(addCourseLectures(userInput));

    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        ...userInput,
        courseId: state._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  // useEffect(() => {
  //   if (!courseDetailes?.state) {
  //     navigate("/courses");
  //   }
  // }, []);
  return (
    <>
      <HomeLayout>
        <div
          className="  flex flex-col items-center justify-center
        h-[90vh] gap-10 mx-16"
        >
          <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
            <header className="flex items-center justify-center relative">
              <button
                onClick={() => navigate(-1)}
                className="absolute left-2 text=xl text-green-500"
              >
                <AiOutlineArrowLeft />
              </button>
              <h1 className="text-xl text-yellow-500 font-bold">
                Add new lecture
              </h1>
            </header>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Enter the title of the lecture"
                className="bg-transparent px-3 py-1 border"
                value={userInput?.title}
                onChange={handleUserInput}
              />
              <textarea
                type="text"
                name="description"
                placeholder="Enter the description of the lecture"
                className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                value={userInput?.description}
                onChange={handleUserInput}
              />

              {userInput?.videoSrc ? (
                <video
                  muted
                  src={userInput?.videoSrc}
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                ></video>
              ) : (
                <div className="h-48 flex border items-center justify-center cursor-pointer ">
                  <label
                    htmlFor="lecture"
                    className="font-semibold text-xl cursor-pointer"
                  >
                    Choose your video
                  </label>
                  <input
                    type="file"
                    name="lecture"
                    className="hidden"
                    id="lecture"
                    onChange={handleVideo}
                    accept="video/mp4 video/x-mp4 video/*"
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary font-semibold py-1 text-xl"
              >
                Add new lecture
              </button>
            </form>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default AddLecture;
