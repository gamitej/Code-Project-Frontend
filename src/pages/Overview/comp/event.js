export const calcDoneQueCount = (data) => {
  let easy, medium, hard;
  const newData = data?.map((item) => {
    if (item.cardType === "easy") {
      easy = cardCalcCount(item);
    }
    if (item.cardType === "medium") {
      medium = cardCalcCount(item);
    }
    if (item.cardType === "hard") {
      hard = cardCalcCount(item);
    }

    return { easy, medium, hard };
  });
  return newData;
};

function cardCalcCount(item) {
  let count = 0;
  let total = 0;

  item.body.map(({ completed }) => {
    if (completed === true) {
      count++;
    }
    total++;
  });

  return { total, done: count };
}
