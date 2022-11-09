const dotenv = require("dotenv");
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));


console.log('Response from server');
app.listen(PORT, () => {
    console.log(`Server is running on the localhost: ${PORT}`);
})