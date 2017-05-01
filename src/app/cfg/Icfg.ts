export interface Icfg {
  env: string // nombre del entorno
  port: string
  hostname: string
  domain: string
  mongodb: {
    hostname: string
    name: string
    port: string
  },
  facebook: {
    key: string
    secret: string
  }
  jwtSecret: string
  logger: string
}
