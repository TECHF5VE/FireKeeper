import * as React from 'react';
import * as style from "./style.scss";
import { Button, Icon, Modal, Input, message } from 'antd';
import { FireDataContext } from 'src/context/fire';
import * as classNames from 'classnames';

export default function ActionButton({ handleLocationClick, locationing }: {
  handleLocationClick: () => void,
  locationing: boolean
}) {
  const fire = React.useContext(FireDataContext);
  const [visible, setVisible] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleAddOk = () => {
    if (content) {
      setLoading(true);
      fire && fire.functions.addFires({
        image: "http://lalala",
        content,
        position: `${114 + Math.random() * 8},${30 + Math.random() * 5}`
      }, () => {
        setVisible(false);
        setLoading(false);
      }, () => setLoading(false))
    } else {
      message.error("你还没有填写信息哦！");
    }
  }
  return (<>
    <Button shape="circle" icon="environment" className={classNames(style.locationButton, { [style.open]: fire && fire.data.listOpen })}
      onClick={handleLocationClick} loading={locationing}
    />
    <Button type="primary" shape="circle"
      className={classNames(style.addButton, { [style.open]: fire && fire.data.listOpen })}
      onClick={() => setVisible(true)}
    >
      <Icon component={addIcon} />
    </Button>
    <Modal
      title="Add Your Fire to Keep"
      visible={visible}
      onOk={handleAddOk}
      okText="生火"
      confirmLoading={loading}
      onCancel={() => setVisible(false)}
    >
      <div className={style.addModal}>
        <Icon component={cattonIcon} />
        <Input size="large" placeholder="在这输入你正所想的小火花" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
    </Modal>
  </>)
}
const addIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="m834.1,469.2c-19.5,-43.8 -47.4,-82.6 -82.9,-115.2l-29.1,-26.7c-4.3,-3.8 -11.1,-2.1 -13,3.3l-13,37.3c-8.1,23.4 -23,47.3 -44.1,70.8c-1.4,1.5 -3,1.9 -4.1,2c-1.1,0.1 -2.8,-0.1 -4.3,-1.5c-1.4,-1.2 -2.1,-3 -2,-4.8c3.7,-60.2 -14.3,-128.1 -53.7,-202c-32.6,-61.4 -77.9,-109.3 -134.5,-142.7l-41.3,-24.3c-5.4,-3.2 -12.3,1 -12,7.3l2.2,48c1.5,32.8 -2.3,61.8 -11.3,85.9c-11,29.5 -26.8,56.9 -47,81.5c-14.2,17.2 -30.1,32.7 -47.5,46.1c-42.1,32.3 -76.8,74.4 -100.3,121.5c-23.7,47.6 -36.2,100.9 -36.2,154.3c0,47.2 9.3,92.9 27.7,136c17.8,41.5 43.2,78.9 75.5,110.9c32.4,32 70,57.2 111.9,74.7c43.4,18.2 89.4,27.4 136.9,27.4s93.5,-9.2 136.9,-27.3c41.9,-17.5 79.6,-42.6 111.9,-74.7c32.4,-32 57.8,-69.4 75.5,-110.9c18.4,-43.1 27.7,-88.8 27.7,-136c0,-48.8 -10,-96.2 -29.9,-140.9zm-121.1,339.3c-53.7,53.2 -125,82.4 -201,82.4s-147.3,-29.2 -201,-82.4c-53.5,-53.1 -83,-123.5 -83,-198.4c0,-43.5 9.8,-85.2 29.1,-124c18.8,-37.9 46.8,-71.8 80.8,-97.9c21.5,-16.4 41.2,-35.5 58.6,-56.8c25,-30.5 44.6,-64.5 58.2,-101c5.4,-14.5 9.5,-30 12.1,-46.5c24.1,22.2 44.3,49 61.2,80.4c33.4,62.6 48.8,118.3 45.8,165.7c-1.4,22.8 7.5,44.5 24.4,59.8c14.7,13.2 33.7,19.9 53.4,18.8c19.7,-1 37.8,-9.7 51,-24.4c13.3,-14.9 24.8,-30.1 34.4,-45.6c14,17.9 25.7,37.4 35,58.4c15.9,35.8 24,73.9 24,113.1c0,74.9 -29.5,145.4 -83,198.4z" fill="#ffffff" />
    <path d="m354.285724,570.599972l98.202748,0l0,-96.314234l100.737378,0l0,96.314234l98.202758,0l0,98.800121l-98.202758,0l0,96.314224l-100.737378,0l0,-96.314224l-98.202748,0l0,-98.800121z" fill="#ffffff" />
  </svg>
)

const cattonIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path id="svg_1" d="m834.1,469.2a347.49,347.49 0 0 0 -82.9,-115.2l-29.1,-26.7a8.09,8.09 0 0 0 -13,3.3l-13,37.3c-8.1,23.4 -23,47.3 -44.1,70.8c-1.4,1.5 -3,1.9 -4.1,2c-1.1,0.1 -2.8,-0.1 -4.3,-1.5c-1.4,-1.2 -2.1,-3 -2,-4.8c3.7,-60.2 -14.3,-128.1 -53.7,-202c-32.6,-61.4 -77.9,-109.3 -134.5,-142.7l-41.3,-24.3c-5.4,-3.2 -12.3,1 -12,7.3l2.2,48c1.5,32.8 -2.3,61.8 -11.3,85.9c-11,29.5 -26.8,56.9 -47,81.5a295.64,295.64 0 0 1 -47.5,46.1a352.6,352.6 0 0 0 -100.3,121.5a347.75,347.75 0 0 0 -36.2,154.3c0,47.2 9.3,92.9 27.7,136a349.4,349.4 0 0 0 75.5,110.9c32.4,32 70,57.2 111.9,74.7c43.4,18.2 89.4,27.4 136.9,27.4s93.5,-9.2 136.9,-27.3a348.6,348.6 0 0 0 111.9,-74.7c32.4,-32 57.8,-69.4 75.5,-110.9a344.2,344.2 0 0 0 27.7,-136c0,-48.8 -10,-96.2 -29.9,-140.9zm-121.1,339.3c-53.7,53.2 -125,82.4 -201,82.4s-147.3,-29.2 -201,-82.4c-53.5,-53.1 -83,-123.5 -83,-198.4c0,-43.5 9.8,-85.2 29.1,-124c18.8,-37.9 46.8,-71.8 80.8,-97.9a349.6,349.6 0 0 0 58.6,-56.8c25,-30.5 44.6,-64.5 58.2,-101a240,240 0 0 0 12.1,-46.5c24.1,22.2 44.3,49 61.2,80.4c33.4,62.6 48.8,118.3 45.8,165.7a74.01,74.01 0 0 0 24.4,59.8a73.36,73.36 0 0 0 53.4,18.8c19.7,-1 37.8,-9.7 51,-24.4c13.3,-14.9 24.8,-30.1 34.4,-45.6c14,17.9 25.7,37.4 35,58.4c15.9,35.8 24,73.9 24,113.1c0,74.9 -29.5,145.4 -83,198.4z" fill="#f01414" />
    <ellipse ry="61.668717" rx="60.001994" id="svg_2" cy="611.794934" cx="390.32934" stroke-width="1.5" stroke="#000" fill="#f01414" />
    <ellipse ry="61.668717" rx="60.001994" id="svg_3" cy="608.46149" cx="637.004212" stroke-width="1.5" stroke="#000" fill="#f01414" />
  </svg>
)