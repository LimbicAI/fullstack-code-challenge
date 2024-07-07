import homeImg from "../assets/images/home.jpg";
import '../assets/css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img src={homeImg} alt="Limbic Therapist" />
    </div>
  );
};

export default Home;