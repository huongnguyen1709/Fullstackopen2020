interface BMIValues {
    height: number;
    weight: number;
  }
  
  const parseArgumentsBMI = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

export const calculateBmi = (height: number,mass: number): string => {
    const heightM = height / 100
    const result =  mass / Math.pow(heightM, 2)
    
    if(result < 16) return 'Underweight (Severe thinness)'
    else if(result >= 16 && result < 17) return 'Underweight (Moderate thinness)'
    else if (result >= 17 && result < 18.5) return 'Underweight (Mild thinness)'
    else if (result >= 18.5 && result < 25) return 'Normal (healthy weight)'
    else if (result >= 25 && result < 30) return 'Overweight (Pre-obese)'
    else if (result >= 30 && result < 35) return 'Obese (Class I)'
    else if (result >= 35 && result < 40) return 'Obese (Class II)'
    else return 'Obese (Class III)'
}

try {
    const { height, weight } = parseArgumentsBMI(process.argv);
    console.log(calculateBmi(height, weight))
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}