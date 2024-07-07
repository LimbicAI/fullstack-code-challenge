import iziToast from "izitoast";

export default {
    backendUrl: process.env.REACT_APP_BACKEND_URL ?? window.location.origin,
    debug: process.env.REACT_APP_DEBUG ?? false,

    showMsg(msg: string, title: string, color: string, bgColor: string, timeout: number){
        iziToast.show({
            message: msg ?? "",
            title: title ?? "",
            messageColor: color ?? "black",
            titleColor: color ?? "black",
            color: bgColor ?? "blue",
            position: 'bottomLeft', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            zindex: 999999999999999,
            timeout: timeout ?? 10000,
        });
    },

    showError(msg: string, title:string="Error", color:string ="black", bgColor:string="red", timeout:number=10000){
        this.showMsg(msg, title, color, bgColor, timeout);
    },

    redirectTo(url: string){
        window.location.href = url;
    },
} as any;
