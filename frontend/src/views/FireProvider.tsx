import * as React from "react";
import { FireDataContext, IFireData, IFire, IFirePut } from 'src/context/fire';
import { ajax } from 'src/config';
import { message } from 'antd';

export default function FireProvider({ children }: { children: React.ReactNode }) {
  const fires = useFires();
  return (
    <FireDataContext.Provider value={fires}>
      {children}
    </FireDataContext.Provider>
  );
}

function useFires(): IFireData {
  const [fires, setFires] = React.useState<IFire[]>([]);
  const [listOpen, setListOpen] = React.useState<boolean>(true);
  const [selectedId, setSelectedId] = React.useState<number>(-1);
  const addFires = (fire: IFirePut) => {
    ajax.put('/api/news', fire)
      .then((response) => {
        const { success, data } = response.data;
        if (success) {
          const newFires = [...fires];
          newFires.push(data);
          setFires(newFires);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        message.error("网络连接异常");
      });
  }
  const getFires = (position: string) => {
    ajax.get('/api/news/list')
      .then((response) => {
        const { success, data } = response.data;
        if (success) {
          setFires(data)
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        message.error("网络连接异常");
      });
  }
  const likeFire = (id: number) => {
    ajax.get(`/api/news/like/${id}`)
      .then((response) => {
        const { success, data } = response.data;
        if (success) {
          const newFires = [...fires];
          const fireIndex = newFires.findIndex((v) => v.id === id);
          fireIndex >= 0 && (newFires[fireIndex] = data);
          setFires(newFires)
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        message.error("网络连接异常");
      });
  }
  const dislikeFire = (id: number) => {
    ajax.get(`/api/news/dislike/${id}`)
      .then((response) => {
        const { success, data } = response.data;
        if (success) {
          const newFires = [...fires];
          const fireIndex = newFires.findIndex((v) => v.id === id);
          fireIndex >= 0 && (newFires[fireIndex] = data);
          setFires(newFires)
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        message.error("网络连接异常");
      });
  }
  return {
    data: { fires, listOpen, selectedId },
    functions: { addFires, getFires, likeFire, dislikeFire, setListOpen, setSelectedId }
  };
}