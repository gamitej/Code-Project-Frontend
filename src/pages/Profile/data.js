export const inputData = [
  {
    placeholder: "Enter question name...",
    name: "question",
    label: "Question",
  },
  {
    placeholder: "Enter url...",
    name: "url",
    label: "Url",
  },
];

export const columns = [
  {
    id: "topic",
    header: "Topic",
    accessorFn: (row) => row.topic,
    size: 40,
  },
  {
    id: "question",
    header: "Question",
    accessorFn: (row) => row.question,
    size: 220,
  },
  {
    id: "url",
    header: "Url",
    accessorFn: (row) => row.url,
    size: 120,
  },
  {
    id: "level",
    header: "Level",
    accessorFn: (row) => row.level,
    size: 40,
  },
  {
    id: "platform",
    header: "Platform",
    accessorFn: (row) => row.platform,
    size: 40,
  },
  {
    id: "done",
    header: "Done",
    accessorFn: (row) => row.done,
    size: 40,
  },
];
