export const API_URL = "https://ptx.transportdata.tw/MOTC/v2/Bus";
// export const API_STOP = API_URL + "/RealTimeNearStop/Streaming/City"; //定點資料
export const API_ROUTE = API_URL + "/Route/City"; //取得所有公車路線
export const API_ESTIMATED_TIME =
    API_URL + "/v2/Bus/EstimatedTimeOfArrival/Streaming/City/"; //預估到站時間
//批次? 逐筆?
export const API_BUS_STOP = API_URL + "/StopOfRoute/City"; //取得公車站點

export const CITY_LIST = [
    { label: "臺北市", value: "Taipei" },
    { label: "新北市", value: "NewTaipei" },
    { label: "桃園市", value: "Taoyuan" },
    { label: "臺中市", value: "Taichung" },
    { label: "臺南市", value: "Tainan" },
    { label: "高雄市", value: "Kaohsiung" },
    { label: "基隆市", value: "Keelung" },
    { label: "新竹市", value: "Hsinchu" },
    { label: "新竹縣", value: "HsinchuCounty" },
    { label: "苗栗縣", value: "MiaoliCounty" },
    { label: "彰化縣", value: "ChanghuaCounty" },
    { label: "南投縣", value: "NantouCounty" },
    { label: "雲林縣", value: "YunlinCounty" },
    { label: "嘉義縣", value: "ChiayiCounty" },
    { label: "嘉義市", value: "Chiayi" },
    { label: "屏東縣", value: "PingtungCounty" },
    { label: "宜蘭縣", value: "YilanCounty" },
    { label: "花蓮縣", value: "HualienCounty" },
    { label: "臺東縣", value: "TaitungCounty" },
    { label: "金門縣", value: "KinmenCounty" },
    { label: "澎湖縣", value: "PenghuCounty" },
    { label: "連江縣", value: "LienchiangCounty" },
];
