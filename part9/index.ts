import express from 'express'
const app = express();

import {calculateBmi} from './bmiCalculator'

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  if(!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight)
    const result = {
    weight,
    height,
    bmi
  }
  res.send(result)
  } else res.status(400).send({
    error: "malformatted parameters"
  })
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});