const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const shoppingListRoutes = require("./src/routes/shoppingListRoutes");

const app = express();

// Middleware
app.use(cors()); // Для разрешения запросов с другого домена
app.use(bodyParser.json());

// Подключение маршрутов
app.use("/api/shopping-lists", shoppingListRoutes);

// Запуск сервера
const PORT = 3000; // Убедитесь, что фронтенд знает этот порт
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});