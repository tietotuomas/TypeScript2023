interface BmiValues {
    weight: number,
    height: number
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const calculateBMI = (weight: number, height: number): string => {
    const bmi = weight / (height * height)

    console.log({ bmi });

    if (bmi > 30) {
        return 'Obese (Significant overweight, higher risk of various health conditions)'
    }

    if (bmi > 25) {
        return 'Overweight (Slightly overweight, might be unhealthy)'
    }

    if (bmi > 18.5)
        return 'Normal (Healthy weight)'

    else {
        return 'Underweight (Might cause health implications)'
    }
}

try {
    const { weight, height } = parseArguments(process.argv);
    console.log(calculateBMI(weight, height));
} catch (error: unknown) {
    let errorMessage = 'An error occured.\n'
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

// console.log(calculateBMI(117, 1.84));

