import { DataTypes } from "sequelize"
import sequelize from "./db.js"

const Orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true, // чтобы SET NULL работал
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      // так оформить "контактные данные"?
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "новая заявка",
    },
    payment: {
      // это правильно?
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      //так это сделать "причина отказа"?
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
)

export default Orders
