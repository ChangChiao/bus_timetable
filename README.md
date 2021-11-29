# 🚌 F2E 2021 Week3-全台公車動態時刻查詢應用服務

## Demo

👉 [機智公車族](https://changchiao.github.io/bus_timetable/#/)


## 作品說明

以行動裝置的設計為優先，串接TDX運輸資料流通服務，實作以下功能:

- 輸入路線查詢公車資訊
- 根據使用者所在位置獲取鄰近的公車資訊
- 收藏常用站牌


## Designer

👏 [早餐](https://2021.thef2e.com/users/6296427084285739247?week=3&type=1)




## 系統說明

`Node版本: v12.10.0`

- 安裝： `yarn`
- 執行： `yarn serve`


本專案請求TDX和mapBox的token均存在.env，需自行設定

```
//.env

VUE_APP_ID = your TDX APP ID 
VUE_APP_KEY = your TDX APP KEY 
VUE_APP_MAP_TOKEN = your mapbox token
```


## 使用技術

- vue
- vuex
- axios
- tailwindcss
- Leaflet


## 專案架構

```

 src
    | --- components (共用元件、頁面子元件)
    | --- global     (常數變數)
    | --- views      (頁面元件)
    | --- style      (共用樣式）
    | --- store      (全域資料)
    | --- utils      (共用函式及api函式)

         
```


## 實作功能

-   依據使用者所在位置，顯示500公尺內與使用者最近的站牌(首頁)
-   自製搜尋鍵盤，方便使用者快速查找路線
-   每分鐘更新公車進站資訊
-   將使用者喜愛的路線資訊存在localStorage
-   根據api提供的圖資繪製出公車路線、公車所在位址、站牌位置等等
-   分段加載資料，避免一次渲染過多元素


## 第三方服務

- [TDX運輸資料流通服務](https://tdx.transportdata.tw/api-service/swagger)
- [MapBox](https://www.mapbox.com/)
