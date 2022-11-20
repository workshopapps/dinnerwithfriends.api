const validateUser = require('../validators/createUser');
const loginUser = require('../validators/loginUser');



describe('First Group Of Tests', () => {
  // Testing the user validator
  it('checking the user validation', () => {
    validateUser = mockRequest({
      name: "string",
      email: "string",
      password: "string"
  });
  expect(validateUser).toMatch(mockRequest);
  })

  // Testing the login schema 
  it('checking login schema', () => {
    loginUser = mockRequest({
      email: 'string',
      password: 'string'
    })
    expected(loginUser).toMatch(mockRequest);
  })

  
})