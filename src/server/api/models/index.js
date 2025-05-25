import sequelize from "./db.js"
import Users from "./user.js"
import Orders from "./order.js"

// Связи:
Users.hasMany(Orders, { foreignKey: "userId", onDelete: "CASCADE" })
Orders.belongsTo(Users, { foreignKey: "userId" })

export { sequelize, Users, Orders }
