export const allEvents = [
  {
    id: 1,
    title: "NPO event",
    description: "NPO event.",
    goal: 900,
    image: "http://lorempixel.com/400/403/nightlife/",
    is_open: true,
    date_created: "2020-03-20T14:28:23.382748Z",
    slug: "npo-event",
    owner: 2,
    category: "Charity",
    region: "World",
  },
  {
    id: 2,
    title: "Event 1",
    description: "Super NFP Event",
    goal: 5000,
    image: "http://lorempixel.com/400/400/nightlife/",
    is_open: true,
    date_created: "2020-09-09T20:31:00Z",
    slug: "event-1",
    owner: 1,
    category: "Charity",
    region: "World",
  },
  {
    id: 3,
    title: "Best event",
    description: "The best event.",
    goal: 900,
    image: "http://lorempixel.com/400/401/nightlife/",
    is_open: true,
    date_created: "2020-03-20T14:28:23.382748Z",
    slug: "best-event",
    owner: 1,
    category: "Charity",
    region: "World",
  },
];

export const oneEvent = {
  id: 3,
  title: "Best event",
  description: "The best event.",
  goal: 900,
  image: "http://lorempixel.com/400/400/nightlife/",
  is_open: true,
  date_created: "2020-03-20T14:28:23.382748Z",
  slug: "best-event",
  owner: 1,
  category: "Charity",
  region: "World",
  pledges: [
    {
      id: 2,
      amount: 350,
      comment: "I really want to participate",
      anonymous: false,
      supporter: 1,
      event: 3,
    },
    {
      id: 5,
      amount: 3150,
      comment: "Let's rock it",
      anonymous: false,
      supporter: 2,
      event: 3,
    },
  ],
};
