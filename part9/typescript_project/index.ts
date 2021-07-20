import express from 'express';
var bodyParser = require('body-parser')
const app = express();

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

import { calculateBmi } from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    const result = {
    weight,
    height,
    bmi
  };
  res.send(result);
  } else res.status(400).send({
    error: "malformatted parameters"
  });
});

app.post('/exercises', (req, res) => {
  const requestForm = req.body
  console.log(req.body)
  if(!requestForm || !requestForm.target || !requestForm.daily_exercises ) res.status(400).send({
    error: "parameters missing"
  }); else if(Object.keys(requestForm).length > 2) res.status(400).send({
    error: "too many parameters"})

  console.log(requestForm.target)
  const response = calculateExercises(requestForm.target, requestForm.daily_exercises)
  res.send(response)
});

const PORT = 3002;





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});