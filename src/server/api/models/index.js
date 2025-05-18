import sequelize from "./db.js"
import Users from "./user.js"
import Orders from "./order.js"
import Services from "./services.js"

// Связи:
Users.hasMany(Orders, { foreignKey: "userId", onDelete: "CASCADE" })
Orders.belongsTo(Users, { foreignKey: "userId" })

Services.hasMany(Orders, { foreignKey: "serviceId", onDelete: "SET NULL" })
Orders.belongsTo(Services, { foreignKey: "serviceId" })

export { sequelize, Users, Orders, Services }
