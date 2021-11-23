export const API_URL = "https://ptx.transportdata.tw/MOTC/v2/Bus";
export const API_ROUTE = API_URL + "/Route/City"; //取得所有公車路線 +routeName可取得路線資訊（車牌號碼 票價）
export const API_ESTIMATED_TIME = API_URL + "/EstimatedTimeOfArrival/City"; //預估到站時間
export const API_SCHEDULE = API_URL + "/Schedule/City"; //取得公車路線班表
export const API_BUS_SHAPE = API_URL + "/Shape/City"; //取得公車路線
export const API_BUS_POS = API_URL + "/RealTimeByFrequency/City"; //取得公車移動位置
export const API_BUS_STATION = API_URL + "/Station/City"; //
//批次(60秒更新) 逐筆（較快更新不過比較會掉資料）
export const API_BUS_STOP = API_URL + "/StopOfRoute/City"; //取得公車所有站點(座標)
//取得鄰近資訊
export const API_BUS_STOP_NEAR = API_URL + "/Station/NearBy"; //取得附近公車站牌
export const API_BUS_ROUTE_NEAR = API_URL + "/Route/NearBy"; //取得附近公車路線
//取得指定站牌
export const API_BUS_ESTIMATED_STATION =
    API_URL + "/EstimatedTimeOfArrival/City"; //取得指定站牌到站預估
export const API_BUS_STATION_ROUTE = API_URL + "/Route/City"; //取得指定站牌到站預估
//not use
export const API_BUS_ESTIMATED_NEAR =
    API_URL + "/EstimatedTimeOfArrival/NearBy"; //取得附近公車到站時間(僅桃園 台中有提供...) (n/a)
export const CITY_LIST = [
    { ISO: "TPE", label: "臺北市", value: "Taipei" },
    { ISO: "NWT", label: "新北市", value: "NewTaipei" },
    { ISO: "TAO", label: "桃園市", value: "Taoyuan" },
    { ISO: "TXG", label: "臺中市", value: "Taichung" },
    { ISO: "TNN", label: "臺南市", value: "Tainan" },
    { ISO: "KHH", label: "高雄市", value: "Kaohsiung" },
    { ISO: "KEE", label: "基隆市", value: "Keelung" },
    { ISO: "HSZ", label: "新竹市", value: "Hsinchu" },
    { ISO: "HSQ", label: "新竹縣", value: "HsinchuCounty" },
    { ISO: "MIA", label: "苗栗縣", value: "MiaoliCounty" },
    { ISO: "CHA", label: "彰化縣", value: "ChanghuaCounty" },
    { ISO: "NAN", label: "南投縣", value: "NantouCounty" },
    { ISO: "YUN", label: "雲林縣", value: "YunlinCounty" },
    { ISO: "CYQ", label: "嘉義縣", value: "ChiayiCounty" },
    { ISO: "CYI", label: "嘉義市", value: "Chiayi" },
    { ISO: "PIF", label: "屏東縣", value: "PingtungCounty" },
    { ISO: "ILA", label: "宜蘭縣", value: "YilanCounty" },
    { ISO: "HUA", label: "花蓮縣", value: "HualienCounty" },
    { ISO: "TTT", label: "臺東縣", value: "TaitungCounty" },
    { ISO: "KIN", label: "金門縣", value: "KinmenCounty" },
    { ISO: "PEN", label: "澎湖縣", value: "PenghuCounty" },
    { ISO: "LIE", label: "連江縣", value: "LienchiangCounty" },
];
