interface returnValues { periodLength: number, trainingDays: number, success: boolean, rating: number, ratingDescription: string, target: number, average: number; }

interface commandLineArgs {
    hours: number[], target: number;

}

const parseArguments = (args: string[]): commandLineArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const argsAsNumbers = args.slice(2).map(a => {
        if (!isNaN(Number(a))) {
            return Number(a);

        } else {
            throw new Error(`Provided value ${a} is not a number!`);
        }
    });

    return { hours: argsAsNumbers.slice(1), target: argsAsNumbers[0] };

};

export const calculateExercises = (hours: number[], target: number): returnValues => {

    const numberOfTraingingDays = hours.filter(h => h > 0).length;

    const average = (hours.reduce((accumulator, currentHours) => {
        return accumulator + currentHours;
    }, 0)) / hours.length;

    const feedbackAsNumber = average >= target ? 3 : average * 2 > target ? 2 : 1;
    const feedbackAsString = average >= target ? "Excellent, keep up the awesome work!" : average * 2 > target ? "Not great, not terrible." : "Come on, you need to work harder!";

    return { periodLength: hours.length, trainingDays: numberOfTraingingDays, success: average >= target, rating: feedbackAsNumber, ratingDescription: feedbackAsString, target: target, average: average };
};

if (require.main === module) {
    try {
        const { hours, target } = parseArguments(process.argv);
        console.log(calculateExercises(hours, target));
    } catch (error: unknown) {
        let errorMessage = 'An error occured.\n';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        console.log(errorMessage);
    }

}


