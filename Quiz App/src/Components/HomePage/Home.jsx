import {} from "react";
import "./Home.css";
import { BsQuestionOctagonFill } from "react-icons/bs";
const Home = () => {
  return (
    <>
      <div>
        <main className="home_page">
          <section className="section_home">
            <div className="content">
              <h1 className="heading">Anime Quizz</h1>
              <BsQuestionOctagonFill className="main_icon" />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
