import * as React from 'react';
import * as style from "./style.scss";
import { Map } from 'react-amap';
import { Button } from 'antd';

declare var window: any;

export default function NewsMap() {
  const [locationing, setLocationing] = React.useState<boolean>(false);
  const geolocationObj = React.useRef<any>(null);
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
        geolocationObj.current = geolocation;
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        window.AMap.event.addListener(geolocation, 'complete', () => setLocationing(false));
        window.AMap.event.addListener(geolocation, 'complete', () => setLocationing(false));
      });
    }
  };

  const handleGeoLocation = () => {
    setLocationing(true);
    geolocationObj.current && geolocationObj.current.getCurrentPosition();
  }

  return (
    <div className={style.newsMap}>
      <Map events={amapEvents} amapkey="e76013e4323783278bd149370dfa3eb7" />
      <Button shape="circle" icon="environment" className={style.locationButton} onClick={handleGeoLocation} loading={locationing} />
    </div>
  )
}