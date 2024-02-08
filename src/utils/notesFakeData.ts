import { subDays } from "date-fns";

import { INoteCardProps } from "../components/note-card";

export const notesFakeData: INoteCardProps[] = [
  {
    date: subDays(new Date(), 2),
    body: [
      "Ut commodo ad id anim. Commodo elit magna sunt culpa culpa dolore dolore commodo do qui nulla aute. Elit duis dolor ullamco culpa do occaecat fugiat ut exercitation tempor nostrud. Nulla pariatur incididunt nisi adipisicing.",
    ],
  },
  {
    date: subDays(new Date(), 4),
    body: [
      "Consequat consequat non sit non mollit ullamco dolore id occaecat pariatur reprehenderit deserunt.",
    ],
  },
  {
    date: subDays(new Date(), 7),
    body: [
      "Officia anim velit excepteur laborum anim occaecat ex eiusmod culpa.",
      "Sint est et laborum dolore qui cupidatat laboris voluptate non veniam cupidatat dolor.",
    ],
  },
];
