export const stateObj = {
  easy: {
    unsolved: true,
    solved: true,
    leetcode: true,
    codechef: true,
  },
  medium: {
    unsolved: true,
    solved: true,
    leetcode: true,
    codechef: true,
  },
  hard: {
    unsolved: true,
    solved: true,
    leetcode: true,
    codechef: true,
  },
};

export const filterData = [
  { label: "Solved", name: "solved" },
  { label: "Unsolved", name: "unsolved" },
  { label: "Leetcode", name: "leetcode" },
  { label: "CodeChef", name: "codechef" },
];

const cardBodyData = [
  {
    id: 1,
    name: "name",
    solved: false,
    platform: "leetcode",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
  {
    id: 2,
    name: "name",
    solved: false,
    platform: "codechef",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
  {
    id: 3,
    name: "name",
    solved: false,
    platform: "codeforces",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
  {
    id: 4,
    name: "name",
    solved: false,
    platform: "leetcode",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
  {
    id: 5,
    name: "name",
    solved: false,
    platform: "leetcode",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
  {
    id: 6,
    name: "name",
    solved: false,
    platform: "leetcode",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
  {
    id: 7,
    name: "name",
    solved: false,
    platform: "leetcode",
    url: "https://leetcode.com/problems/shuffle-the-array/",
  },
];

export const cardDataObj = [
  { cardTitle: "Easy", cardType: "easy", body: cardBodyData },
  { cardTitle: "Medium", cardType: "medium", body: cardBodyData },
  { cardTitle: "Hard", cardType: "hard", body: cardBodyData },
];
