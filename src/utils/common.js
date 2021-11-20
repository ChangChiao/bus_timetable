import moment from "moment";
export const showToast = (msg, type = "success") => {
    if (msg) {
        console.log("msg", msg, type);
    }
};

export const transDate = (string) => {
    let date = new Date(string);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}/${month}/${day}`;
};

export const transTime = (string) => {
    let date = new Date(string);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};
