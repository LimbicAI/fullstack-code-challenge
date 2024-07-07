import Swal from 'sweetalert2';

import global from '../global';
import config from '../config';

const login = {
    isLoggedIn(){
        if(localStorage.getItem("token") && localStorage.getItem("tokenExpiresAt")){
            const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
            if(!isNaN(Number(tokenExpiresAt)) && Number(tokenExpiresAt) >= Date.now()){
                return true;
            }
            localStorage.clear();
            return false;
        }
        else {
            return false;
        }
    },

    loggingIn(token: string, route = "/home"){
        if(!token || token.length !== 36){
            global.showError("Invalid token!");
            return false;
        }

        const tokenExpiresAt = Date.now() + ((config.loginTokenExpiresIn - 15) * 1000) + ""; // minus 15 seconds to expire frontend before backend

        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiresAt", tokenExpiresAt);

        global.redirectTo(route);

        return true;
    },

    getLoggedInToken(){
        if(this.isLoggedIn()){
            return localStorage.getItem("token");
        }
        return undefined;
    },

    logout(to = "/login"){
        Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            allowEnterKey: true,
            focusConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();

                Swal.fire({
                    title: "Logout!",
                    text: "You have been logged out.",
                    icon: "success"
                }).then(() => {
                    global.redirectTo(to);    
                });
            }
        });
    },
}

export default login;