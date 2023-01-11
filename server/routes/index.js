module.exports = [
  {
    method: 'POST',
    path: '/generate-text',
    handler: 'aiController.generate',
    config: {
      policies: [],
    },
  },
];
