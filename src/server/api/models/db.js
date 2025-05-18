import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/server/database/dataBase.sqlite",
  logging: console.log,
})

export default sequelize
