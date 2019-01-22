
export default class Cache {
  static config: ConfigType;
}

export interface ConfigType {
  port: number,
  jwtSecret: string,
  elastic: {
    enable: boolean,
    host: string,
    port: number,
    log: string
  },
  eureka: {
    enable: boolean,
    auth: {
      user: string,
      password: string
    },
    parameter: any
  },
  sampleData: {
    enable: boolean
  }
};
