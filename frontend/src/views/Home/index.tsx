import * as React from 'react';
import * as style from "./style.scss";
import bg from "./bg.svg"
import Header from 'src/Components/Header';
import { Map, Markers } from 'react-amap';
import ActionButton from 'src/Components/ActionButton';
import NewsList from './NewsList';
import { FireDataContext } from 'src/context/fire';

declare var window: any;

export default function Home() {
  const [locationing, setLocationing] = React.useState<boolean>(false);
  const geolocationObj = React.useRef<any>(null);
  const amapObj = React.useRef<any>(null);
  const fire = React.useContext(FireDataContext);
  const handleGetLocationSuccess = (e) => {
    setLocationing(false);
    fire && fire.functions.getFires(`${e.position.lng},${e.position.lat}`)
  }
  const amapEvents = {
    created: (mapObj) => {
      mapObj.plugin('AMap.Geolocation', () => {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true,// 是否使用高精度定位，默认:true
          timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
          convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: false,        // 显示定位按钮，默认：true
          buttonOffset: new window.AMap.Pixel(10, 20),// 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        amapObj.current = mapObj;
        geolocationObj.current = geolocation;
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        window.AMap.event.addListener(geolocation, 'complete', handleGetLocationSuccess);
        window.AMap.event.addListener(geolocation, 'error', () => setLocationing(false));
      });
    }
  };

  const handleLocationClick = () => {
    setLocationing(true);
    geolocationObj.current && geolocationObj.current.getCurrentPosition();
  }
  const setToCenter = (position: string) => {
    const [lng, lat] = position.split(",");
    amapObj && amapObj.current.setZoomAndCenter(17, window.AMap.LngLat(lng, lat, true));
  }
  const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
      position: {
        longitude: 100 + Math.random() * 30,
        latitude: 30 + Math.random() * 20,
      },
      myIndex: idx + 1,
    }))
  );
  const markers = randomMarker(10);
  const renderMarkerLayout = (extData) => {
    return <div style={style}>{extData.myLabel}</div>
  }
  return (
    <div className={style.homePage} style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      <Map events={amapEvents} amapkey="e76013e4323783278bd149370dfa3eb7" >
        <Markers
          markers={markers}
        />
      </Map>
      <NewsList setToCenter={setToCenter} />
      <ActionButton
        handleLocationClick={handleLocationClick}
        locationing={locationing}
      />
    </div>
  )
}