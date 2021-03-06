import api from "../utils/http";
import {
    API_ROUTE,
    API_BUS_STOP,
    API_BUS_SHAPE,
    API_BUS_POS,
    API_BUS_STOP_NEAR,
    API_BUS_ROUTE_NEAR,
    API_ESTIMATED_TIME,
    API_BUS_ESTIMATED_STATION,
    API_BUS_ESTIMATED_NEAR,
    API_BUS_REALTIME,
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
    const { city = "", routeName = "" } = data;
    delete data.city;
    delete data.routeName;
    return { cityPath: city, routeName, data };
};

export const getBusRoute = (sendData) => {
    const { cityPath, routeName = "", data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
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
    const { cityPath, routeName = "", data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_STOP + `/${cityPath}/${routeName}`, config);
};

export const getBusLine = (sendData) => {
    const { cityPath, routeName, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_SHAPE + `/${cityPath}/${routeName}`, config);
};

export const getBusPosition = (sendData) => {
    const { cityPath, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_POS + `/${cityPath}`, config);
};

export const getStopNear = (sendData) => {
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...sendData,
        },
    };
    return api.get(API_BUS_STOP_NEAR, config);
};

export const getRouteNear = (sendData) => {
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...sendData,
        },
    };
    return api.get(API_BUS_ROUTE_NEAR, config);
};

export const getNearEstimated = (sendData) => {
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...sendData,
        },
    };
    return api.get(API_BUS_ESTIMATED_NEAR, config);
};

export const getBusRealTime = (sendData) => {
    const { cityPath, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_REALTIME + `/${cityPath}`, config);
};

export const getBusArrival = (sendData) => {
    const { cityPath, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_ESTIMATED_STATION + `/${cityPath}`, config);
};
