export const initialWinningCombinations = [
  // Horizontal rows
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  // Vertical columns
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [5, 10, 15, 20, 25],
  // Diagonals
  [1, 7, 13, 19, 25],
  [21, 17, 13, 9, 5], // Reversed because it looks better
];

export const phrases = [
  "(animal noises in the background)",
  "Is ____ on the call?",
  "We do have 5 minutes left",
  "Hello, hello?",
  "Could you please get closer to the mic?",
  "I was having connection issues",
  "Sorry, I had problems logging in",
  "Can you email that to everyone?",
  "Can you repeat, please?",
  "Sorry, something ___ with my calendar",
  "(child noises in the background)",
  "Could you share these slides afterwards?",
  "Sorry, I didn’t catch that",
  "You will send the minutes?",
  "I need to jump on another call",
  "Can everyone go on mute?",
  "Can we take this offline?",
  "Do you see my screen?",
  "Is everyone in the call?",
  "Can somebody grant presenter rights?",
  "Sorry, I was on mute.",
  "(load painful echo/feedback)",
  "Next slide, please.",
  "Who just joined?",
];
export const freeWord = "FREE";

export const animationConfig = {
  animationTimingBaseInSec: 0.25,
};
