export const calcDoneQueCount = (data) => {
  let easy, medium, hard;
  let easyComp = 0;
  let easyTotal = 0;
  let mediumComp = 0;
  let mediumTotal = 0;
  let hardComp = 0;
  let hardTotal = 0;
  const newData = data?.map((item) => {
    if (item.cardType === "easy") {
      easy = item.body.map(({ completed }) => {
        if (completed === true) {
          easyComp++;
        }
        easyTotal++;
      });
    }
    if (item.cardType === "medium") {
      medium = item.body.map(({ completed }) => {
        if (completed === true) {
          mediumComp++;
        }
        mediumTotal++;
      });
    }
    if (item.cardType === "hard") {
      hard = item.body.map(({ completed }) => {
        if (completed === true) {
          hardComp++;
        }
        hardTotal++;
      });
    }

    easy = { done: easyComp, total: easyTotal };
    medium = { done: mediumComp, total: mediumTotal };
    hard = { done: hardComp, total: hardTotal };
    return { easy, medium, hard };
  });
  return newData;
};
