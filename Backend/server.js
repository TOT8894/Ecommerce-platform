import app from "./app.js";
const PORT = process.env.PORT || PORT;
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});