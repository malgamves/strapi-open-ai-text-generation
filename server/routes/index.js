module.exports = [
  {
    method: 'POST',
    path: '/generate',
    handler: 'myController.generate',
    config: {
      policies: [],
    },
  },
];
