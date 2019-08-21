require('dotenv').config()

export const config = {
  isDev : process.env.NODE_ENV !== 'production',
  SECRET_KEY : process.env.SECRET_KEY,
  dev : {
    DB_NAME : process.env.DB_NAME_DEV,
    DB_USER : process.env.DB_USER_DEV,
    DB_PASSWORD : process.env.DB_PASSWORD_DEV,
    DB_HOST : process.env.DB_HOST_DEV,
    DB_PORT : process.env.DB_PORT_DEV,
  },
  pro :{
    DB_NAME : process.env.DB_NAME,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
  }
}