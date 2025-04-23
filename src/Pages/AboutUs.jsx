import albertEinstein from "../assets/Images/albertEinstein.jpg";
import apj from "../assets/Images/apj.jpg";
import billGates from "../assets/Images/BillGates.png";
import knowledgetree from "../assets/Images/knowledgetree.png";
import nelsonMandela from "../assets/Images/NelsonMandela.jpg";
import steveJobs from "../assets/Images/steveJobs.png";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className=" about-us pl-20 pt-20 flex flex-col text-white  ">
        <div className=" upper-section flex items-center gap-30 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className=" text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their slills,creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>

          <div className=" image w-1/2">
            <img
              src={knowledgetree}
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              className=" drop-shadow-2xl"
              alt="about main image"
            />
          </div>
        </div>

        <div className="carousel w-1/2 m-auto my-16">
          <div id="slide1" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-0 px-[15%]">
              <img
                src={apj}
                className="w-40 h-40  rounded-full border-2  border-gray-400"
              />

              <p className="text-xl text-gray-200">
                {"If you want to shine like a sun, first burn like a sun."}
              </p>
              <h3 className="text-2xl font-semibold">A. P. J. Abdul Kalam</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-0 px-[15%]">
              <img
                src={albertEinstein}
                className="w-40 h-40  rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                {
                  "If you can't explain it simply, you don't understand it well enough."
                }
              </p>
              <h3 className="text-2xl font-semibold">Albert Einstein</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-0 px-[15%]">
              <img
                src={steveJobs}
                className="w-40 h-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                {"Innovation distinguishes between a leader and a follower."}
              </p>
              <h3 className="text-2xl font-semibold">Steve Jobs</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-0 px-[15%]">
              <img
                src={nelsonMandela}
                className="w-40 h-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                {
                  "Education is the most powerful weapon which you can use to change the world."
                }
              </p>
              <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-0 px-[15%]">
              <img
                src={billGates}
                className="w-40 h-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                {
                  "It's fine to celebrate success, but it is more important to heed the lessons of failure."
                }
              </p>
              <h3 className="text-2xl font-semibold">Bill Gates</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
