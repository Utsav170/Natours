const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Hello from the server side!' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});
