import Swal from 'sweetalert2';
import SwalReactContent from 'sweetalert2-react-content';
import axios from 'axios';

import loginSchema from '../schemas/LoginSchema';
import global from '../global';
import login from '../helpers/login';
import homeImg from "../assets/images/home.jpg";
import '../assets/css/Home.css';

async function showLogin() {
    SwalReactContent(Swal).fire({
        title: "Limbic Therapist Login",
        html: `
            <form>
                <input type="text" id="swal-input1" class="swal2-input" placeholder="Username" autocomplete="on" required>
                <input type="password" id="swal-input2" class="swal2-input" placeholder="Password" autocomplete="on" required>
            </form>
        `,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEnterKey: true,
        focusConfirm: true,
        confirmButtonText: "Login",
        preConfirm: async() => {
            const username = (document.getElementById("swal-input1") as HTMLInputElement)?.value;
            const password = (document.getElementById("swal-input2") as HTMLInputElement)?.value;

            const { error } = loginSchema.validate({ username, password });
            if(error) {
                console.error({ error });
                
                global.showError(error.details[0].message);
                showLogin();
                return false;
            }

            try {
                const response = await axios.post(global.backendUrl + '/api/login', { username, password });
  
                if(!response?.data?.success || !login.loggingIn(response?.data?.data?.token)) {
                    global.showError("Login failed!");
                    showLogin();
                    return false;
                }

                if(global.debug) console.log({ data: response?.data?.data });

                global.showMsg("Login successful!");
                return true;
            } 
            catch(error) {
                console.error({ error });

                global.showError("Login failed!");
                showLogin();
                return false;
            }
        }
    });
}

const Login = () => {
    login.isLoggedIn() ? global.redirectTo("/home") : showLogin();
    
    return (
        <div className="home-container">
            <img src={homeImg} alt="Limbic Therapist" />
        </div>
    );
};

export default Login;
