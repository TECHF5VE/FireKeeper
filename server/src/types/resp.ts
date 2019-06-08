export interface Resp<T> {
  success: boolean;
  data: T;
  msg: string;
}

export const success = <T>(data: T): Resp<T> => {
  return {
    data,
    msg: 'success',
    success: true,
  };
};

export const error = <T>(data: T, msg: string = 'error'): Resp<T> => {
  return {
    data,
    msg,
    success: false,
  };
};
