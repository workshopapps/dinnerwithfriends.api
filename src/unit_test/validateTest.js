const validateUser = require('../validators/createUser');

// Testing the user validator
test('checking the user validation', () => {
  validateUser = mockRequest({
    name: "prince",
    email: "string",
    password: "string"
});

expect(validateUser).toMatch(mockRequest);
})