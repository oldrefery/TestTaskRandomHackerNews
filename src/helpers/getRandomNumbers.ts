interface getRandomNumbersProps {
  start: number;
  end: number;
  amount: number;
}

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min + 1;
};

export const getRandomNumbers = ({
  start,
  end,
  amount,
}: getRandomNumbersProps): number[] => {
  const result: number[] = [];

  if (amount <= 0) {
    return result;
  }

  while (result.length < amount) {
    const newRandomNumber = generateRandomNumber(start, end);

    if (!result.includes(newRandomNumber)) {
      result.push(newRandomNumber);
    }
  }

  return result;
};
