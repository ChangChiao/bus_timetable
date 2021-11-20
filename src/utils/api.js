import api from "../utils/http";
import {
    API_ROUTE,
    API_ESTIMATED_TIME,
    API_BUS_STOP,
} from "../global/constant";
import jsSHA from "jssha";

const getAuthorizationHeader = () => {
    let AppID = process.env.VUE_APP_ID;
    let AppKey = process.env.VUE_APP_KEY;

    const GMTString = new Date().toGMTString();
    const ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return {
        Authorization: Authorization,
        "X-Date": GMTString,
        "Content-Type": "application/x-www-form-urlencoded",
    };
};

const setPath = (data) => {
    console.log("data", data);
    const { city, routeName } = data;
    delete data.city;
    delete data.routeName;
    return { cityPath: city, routeName, data };
};

export const getBusRoute = (sendData) => {
    const { cityPath, routeName, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    console.log("routeName", routeName);
    return api.get(API_ROUTE + `/${cityPath}/${routeName}`, config);
};

export const getEstimatedTime = (sendData) => {
    const { cityPath, routeName, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_ESTIMATED_TIME + `/${cityPath}/${routeName}`, config);
};

export const getBusStop = (sendData) => {
    const { cityPath, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_STOP + `/${cityPath}`, config);
};
