interface ResultObj {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number
    ratingDescription: string,
    target: number,
    average: number
}

interface ExercisesValues {
    target: number;
    array: Array<number>;
  }

const parseArguments = (args: Array<string>): ExercisesValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 12) throw new Error('Too many arguments');
    console.log('hello')

    const toNumbers = (arr: Array<string>) :  Array<number> => arr.map(Number);

    const numberCheck = toNumbers(process.argv.slice(2))
    const isNumber = numberCheck.every(num => !isNaN(num))
  
    if (isNumber) {
      return {
        target: Number(args[2]),
        array: toNumbers(process.argv.slice(3))
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateExercises = (target: number, args: Array<number>): ResultObj => {
    const periodLength = args.length
    const trainingDays = args.filter(h => h > 0).length
    const average = args.reduce((accumulator, currentValue) => accumulator + currentValue) / periodLength
    const success = average > target || average === target
    const rating = average === target || average > target ? 3 : (average > (target / 2) || average === (target / 2)) ? 2 : 1
    const ratingDescription = rating === 3 ? 'you meet the target, well done' : rating === 2 ? 'not too bad but could be better' : 'very bad, you need to work harder'
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { target, array } = parseArguments(process.argv);
    console.log(calculateExercises(target, array))
} catch (error) {
    console.log('Error, something bad happened, message: ', error.message);
}
