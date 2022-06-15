import dotenv from 'dotenv';

type PortType = {
  PORT: number;
};

export const getPORT = () => {
  const env = dotenv.config().parsed as unknown as PortType;
  return env ? env.PORT : 4000;
}