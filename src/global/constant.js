export const API_URL = "https://tdx.transportdata.tw/api/basic/v2/Bus";
export const API_TDX = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
export const API_ROUTE = API_URL + "/Route/City"; //取得所有公車路線 +routeName可取得路線資訊（車牌號碼 票價）
export const API_ESTIMATED_TIME = API_URL + "/EstimatedTimeOfArrival/City"; //預估到站時間
export const API_SCHEDULE = API_URL + "/Schedule/City"; //取得公車路線班表
export const API_BUS_SHAPE = API_URL + "/Shape/City"; //取得公車路線
export const API_BUS_POS = API_URL + "/RealTimeByFrequency/City"; //取得公車移動位置
export const API_BUS_STATION = API_URL + "/Station/City"; //
export const API_BUS_REALTIME = API_URL + "/RealTimeNearStop/City"; //取得公車動態定點資料
//批次(60秒更新) 逐筆（較快更新不過比較會掉資料）
export const API_BUS_STOP = API_URL + "/StopOfRoute/City"; //取得公車所有站點(座標)
//取得鄰近資訊
export const API_BUS_STOP_NEAR = API_URL + "/Station/NearBy"; //取得附近公車站牌
export const API_BUS_ROUTE_NEAR = API_URL + "/Route/NearBy"; //取得附近公車路線
//取得指定站牌
export const API_BUS_ESTIMATED_STATION =
    API_URL + "/EstimatedTimeOfArrival/City"; //取得指定站牌到站預估
//公車資訊
export const API_BUS_SCHAPI_BUS_ESTIMATED_STATIONEDULE =
    API_URL + "/Schedule/City";
//not use
export const API_BUS_ESTIMATED_NEAR =
    API_URL + "/EstimatedTimeOfArrival/NearBy"; //取得附近公車到站時間(僅桃園 台中有提供...) (n/a)
export const CITY_LIST = [
    {
        ISO: "TPE",
        label: "臺北市",
        value: "Taipei",
        pos: { lat: 25.03387664152844, lon: 121.56456344001262 },
    },
    {
        ISO: "NWT",
        label: "新北市",
        value: "NewTaipei",
        pos: { lat: 25.014174781858774, lon: 121.4643227956334 },
    },
    {
        ISO: "TAO",
        label: "桃園市",
        value: "Taoyuan",
        pos: { lat: 24.989124198332156, lon: 121.31437562494263 },
    },
    {
        ISO: "TXG",
        label: "臺中市",
        value: "Taichung",
        pos: { lat: 24.140781058069635, lon: 120.68812172254115 },
    },
    { ISO: "TNN", label: "臺南市", value: "Tainan", pos: { lat: "", lon: "" } },
    {
        ISO: "KHH",
        label: "高雄市",
        value: "Kaohsiung",
        pos: { lat: 22.639670623239073, lon: 120.3025722690854 },
    },
    {
        ISO: "KEE",
        label: "基隆市",
        value: "Keelung",
        pos: { lat: 25.133215692889234, lon: 121.73933982864644 },
    },
    {
        ISO: "HSZ",
        label: "新竹市",
        value: "Hsinchu",
        pos: { lat: 24.801743512239355, lon: 120.97163121329774 },
    },
    {
        ISO: "HSQ",
        label: "新竹縣",
        value: "HsinchuCounty",
        pos: { lat: 24.827112878570077, lon: 121.01288224028333 },
    },
    {
        ISO: "MIA",
        label: "苗栗縣",
        value: "MiaoliCounty",
        pos: { lat: 24.565011108542414, lon: 120.82076045562239 },
    },
    {
        ISO: "CHA",
        label: "彰化縣",
        value: "ChanghuaCounty",
        pos: { lat: 24.081710829901592, lon: 120.5385152286296 },
    },
    {
        ISO: "NAN",
        label: "南投縣",
        value: "NantouCounty",
        pos: { lat: 23.830413252257117, lon: 120.78477508413482 },
    },
    {
        ISO: "YUN",
        label: "雲林縣",
        value: "YunlinCounty",
        pos: { lat: "", lon: "" },
    },
    {
        ISO: "CYQ",
        label: "嘉義縣",
        value: "ChiayiCounty",
        pos: { lat: "", lon: "" },
    },
    {
        ISO: "CYI",
        label: "嘉義市",
        value: "Chiayi",
        pos: { lat: 23.54424978420921, lon: 120.43208978444218 },
    },
    {
        ISO: "PIF",
        label: "屏東縣",
        value: "PingtungCounty",
        pos: { lat: 23.47933335484157, lon: 120.4411223114263 },
    },
    {
        ISO: "ILA",
        label: "宜蘭縣",
        value: "YilanCounty",
        pos: { lat: 24.754605871450718, lon: 121.75814781144638 },
    },
    {
        ISO: "HUA",
        label: "花蓮縣",
        value: "HualienCounty",
        pos: { lat: 24.039062872284244, lon: 121.59699137334108 },
    },
    {
        ISO: "TTT",
        label: "臺東縣",
        value: "TaitungCounty",
        pos: { lat: 22.79389716809124, lon: 121.12339618813223 },
    },
    {
        ISO: "KIN",
        label: "金門縣",
        value: "KinmenCounty",
        pos: { lat: 24.448677292829426, lon: 118.32266374397871 },
    },
    {
        ISO: "PEN",
        label: "澎湖縣",
        value: "PenghuCounty",
        pos: { lat: 23.571795417402495, lon: 119.57745233271699 },
    },
    {
        ISO: "LIE",
        label: "連江縣",
        value: "LienchiangCounty",
        pos: { lat: 26.15799750356264, lon: 119.95197324215599 },
    },
];
