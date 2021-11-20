import Vue from "vue";
export const showToast = (msg, type = "success") => {
    if (msg) {
        Vue.$toast.open({
            message: msg,
            type,
            // all of other options may go here
        });
    }
};

export const transDate = (string) => {
    let date = new Date(string);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}/${month}/${day}`;
};

export const transTime = (time) => {
    let date = new Date(time);
    return date.toString("Zh_tw");
};
