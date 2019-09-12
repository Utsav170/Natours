const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error!',
      message: 'The id could not be found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(404).json({
      status: 'Error!',
      message: 'The id could not be found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update Tour Heere'
    }
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(404).json({
      status: 'Error!',
      message: 'The id could not be found'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});
