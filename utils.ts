import {cleanEnv, port, str} from "envalid";
import {ConnectionOptions} from "typeorm";


export const getYTVideoID = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}


export const validateEnv = () => {
  console.log(process.env.POSTGRES_PORT, 'process.env')
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    PORT: port(),
  });
}

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "**/**/*.entity{.ts,.js}"],
  migrations: ["migrations/*.ts"],
  // cli: {
  //     migrationsDir: "migrations",
  // },
  synchronize: true,
  // logging: ["query"],
}

export const ormconfig2: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "tutorial",
  // entities: [__dirname + "**/**/*.entity{.ts,.js}"],
  // migrations: ["migrations/*.ts"],
  // cli: {
  //     migrationsDir: "migrations",
  // },
  synchronize: true,
  // logging: ["query"],
}
