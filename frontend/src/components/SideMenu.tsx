import { Link } from 'react-router-dom';

import login from '../helpers/login';
import '../assets/css/SideMenu.css';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <h2 className="side-menu-title">Limbic Therapist</h2>
      
      <Link to="/" className="side-menu-item">Home</Link>
      <Link to="/users" className="side-menu-item">Users</Link>
      <Link to="/questions" className="side-menu-item">Questions</Link>
      { login.isLoggedIn() ? <Link to="/home" className="side-menu-item" onClick={(e) => {
        e.preventDefault(); // Prevents navigation
        login.logout();
      }}>Logout</Link> : "" }

      <div className="side-menu-footer">Developed By <a target="_blank" href="https://www.linkedin.com/in/tarikseyceri/" rel="noreferrer">Tarik Seyceri</a></div>
    </div>
  );
};

export default SideMenu;