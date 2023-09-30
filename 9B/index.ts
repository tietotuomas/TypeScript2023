import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {

    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    console.log(req.query);

    if ((!req.query.weight || !req.query.height)) {
        return res.status(400).json({ error: 'missing parameters' });
    }

    const weight = req.query.weight;
    const height = req.query.height;

    if (isNaN(Number(weight)) || isNaN(Number(height))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const feedback = calculateBMI(Number(weight), Number(height));

    return res.json({
        weight: req.query.weight,
        height: req.query.height,
        bmi: feedback
    });

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});