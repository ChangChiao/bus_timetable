import api from "../utils/http";
import {
    API_ROUTE,
    API_ESTIMATED_TIME,
    API_BUS_STOP,
    API_BUS_SHAPE,
    API_BUS_POS,
    API_BUS_STOP_NEAR,
    API_BUS_ROUTE_NEAR,
    API_BUS_ESTIMATED_NEAR,
    API_BUS_STATION_ROUTE,
    API_BUS_SCHEDULE,
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
    const { cityPath, routeName, data } = setPath(sendData);
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
    const { cityPath, routeName, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_POS + `/${cityPath}/${routeName}`, config);
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

export const getStationRoute = (sendData) => {
    const { cityPath, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(
        API_BUS_STATION_ROUTE +
            `/${cityPath}/PassThrough/Station/${data.stationId}`,
        config
    );
};

export const getStationEstimated = (sendData) => {
    const { cityPath, routeName, data } = setPath(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data,
        },
    };
    return api.get(API_BUS_SCHEDULE + `/${cityPath}/${routeName}`, config);
};
