import express from 'express';

const main = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
};

main().catch((err) => console.log('Uncaught Error:', err));
