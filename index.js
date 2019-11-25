const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;
//rota de redirecionamento para o index.
app.use(express.static(path.join(__dirname, "public")));

//porta da aplicação
app.listen(PORT, function () {
    console.log(`aplicação rodando na porta: ${PORT}!`);
});