const options = [
  {
    id: "1",
    message: "Hey! Welcome to SAKTHI VELAVANN PACKAGES!",
    trigger: "2",
  },
  {
    id: "2",
    message: "I am a chatbot. I can help you with your orders.",
    trigger: "3",
  },
  {
    id: "3",
    message: "What would you like to do?",
    trigger: "4",
  },
  {
    id: "4",
    options: [
      { value: 1, label: "Order An Package", trigger: "5" },
      { value: 2, label: "Best Offers", trigger: "6" },
      { value: 3, label: "Contact Customer Service", trigger: "7" },
    ],
  },
  {
    id: "5",
    message: "Use Our Website to do it! Please 🤫😅",
    trigger: "4",
  },
  {
    id: "6",
    message: "Use Our Website! There you can find best offers😢🔥",
    trigger: "4",
  },
  {
    id: "7",
    message: "In the Footer Section You'll Find the Contact Links 🤫😅",
    trigger: "4",
  },
];

export default options;
