import moment from 'moment'
import L from 'leaflet'
export const showToast = (msg, type = 'success') => {
  if (msg) {
    console.log('msg', msg, type)
  }
}

export const transDate = (string) => {
  const date = new Date(string)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}/${month}/${day}`
}

export const transTime = (string) => {
  const date = new Date(string)
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export const getDistance = (lat1, lon1, lat2, lon2, unit = 'K') => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180
    let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === 'K') {
      dist = dist * 1.609344
    }
    if (unit === 'N') {
      dist = dist * 0.8684
    }
    return dist
  }
}

export const transMinute = (sec) => {
  return Math.floor(sec / 60)
}

export const transBusStatus = (obj) => {
  const { EstimateTime, StopStatus } = obj
  const time = transMinute(EstimateTime)
  const statusObj = {
    1: '尚未發車',
    2: '交管不停靠',
    3: '末班車已過',
    4: '今日未營運'
  }
  if (StopStatus !== 0) {
    return `<span class='bg-gray-500 text-white text-sm p-2 mr-2 rounded-md'>${statusObj[StopStatus]}</span>`
  }
  let text = ''
  switch (true) {
    case time === 0:
      text = "<span class='red'>進站中</span>"
      break
    case time <= 1 && time > 0:
      text = "<span class='red'>即將到站</span>"
      break
    default:
      text = `<span class="font-bold text-lg px-2">${time}</span><span class="font-normal">分</span>`
      break
  }
  return text
}

export const createMarkerCluster = () => {
  // eslint-disable-next-line new-cap
  return new L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    zoomToBoundsOnClick: true,
    argumentsspiderfyOnMaxZoom: false,
    maxClusterRadius: 120,
    iconCreateFunction: function (cluster) {
      const markers = cluster.getAllChildMarkers()
      let c = ' marker-cluster-'
      if (markers < 10) {
        c += 'small'
      } else if (markers < 100) {
        c += 'medium'
      } else {
        c += 'large'
      }

      const html = `
                    <div class="group">
                        <span>
                            ${markers.length}
                        </span>
                    </div>
                    `

      return new L.DivIcon({
        html,
        className: 'marker-cluster' + c,
        iconSize: new L.Point(40, 40)
      })
    }
  })
}
