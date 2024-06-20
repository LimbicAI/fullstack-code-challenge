import app from "./app";
import sequelize from "./database/database";

const PORT = process.env.PORT || 3001;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
