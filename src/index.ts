import express from 'express';

const app = express();

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
