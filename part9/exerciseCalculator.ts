interface ResultObj {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (args: Array<number>, target: number): ResultObj => {
    const periodLength = args.length
    const trainingDays = args.filter(h => h > 0).length
    const average = args.reduce((accumulator, currentValue) => accumulator + currentValue) / periodLength
    const success = average > target || average === target
    const rating = average === target || average > target ? 3 : average > (target / 2) ? 2 : 1
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

const toNumbers = (arr: Array<string>) :  Array<number> => arr.map(Number);
const a : Array<number> = toNumbers(process.argv.slice(2, -1)) ;
const b : number = Number(process.argv.slice(-1))

console.log(calculateExercises(a, b))