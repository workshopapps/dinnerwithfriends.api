const { signupRouteDoc, loginRouteDoc } = require('../routes/v1/index');

const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'Catch-up API',
    contact: {},
    version: '1.0',
  },
  servers: [
    {
      url: 'http://example.com/api/v1',
      description: 'production server',
      variables: {},
    },
    {
      url: 'http://localhost:8800/api/v1',
      description: '',
      variables: {},
    },
  ],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'signup',
        description: 'This endpoint registers a new user.',
        operationId: 'signup',
        parameters: [],
        requestBody: {
          description: '',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  {
                    $ref: '#/components/schemas/signuprequest',
                  },
                  {
                    example: {
                      name: 'James Ocee',
                      email: 'ocjay24@gmail.com',
                      password: 'catchup123',
                    },
                  },
                ],
              },
              example: {
                name: 'James Ocee',
                email: 'ocjay24@gmail.com',
                password: 'catchup123',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                      status: 'status of the operation',                      
                      message: 'error or success message',
                      data: '{}',
                    },
                  },
                },
              },
          },
        },
        deprecated: false,
        security: [],
      },
    },
    '/auth/signin': {
      post: {
        tags: ['Auth'],
        summary: 'login',
        description: 'This signs an existing user in.',
        operationId: 'login',
        parameters: [],
        requestBody: {
          description: '',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  {
                    $ref: '#/components/schemas/loginrequest',
                  },
                  {
                    example: {
                      email: 'ocjay24@gmail.com',
                      password: 'catchup123',
                    },
                  },
                ],
              },
              example: {
                email: 'ocjay24@gmail.com',
                password: 'catchup123',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'OK',
            headers: {},
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    success: true,
                    message: 'Logged in successfully',
                    user: {
                    name: 'user\'s name',
                    id: 'user_id',
                    email: 'user email',
                    },
                    accessToken: 'token',
                  },
                },
              },
            },
          },
        },
        deprecated: false,
        security: [],
      },
    },
    '/auth/refresh': {
        get: {
          tags: ['Auth'],
          summary: 'refresh',
          description: 'This handles refresh token.',
          operationId: 'refresh',
          parameters: [],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {                      
                      accessToken: 'token',
                    },
                  },
                },
              },
            },
          },
          deprecated: false,
          security: [],
        },
    },
    '/auth/recover/generate': {
        post: {
          tags: ['Auth'],
          summary: 'Recover account token',
          description: 'This generates a recover account token.',
          operationId: 'Recover account',
          parameters: [],
          requestBody: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    {
                      $ref: '#/components/schemas/loginrequest',
                    },
                    {
                      example: {
                        email: 'ocjay24@gmail.com',
                      },
                    },
                  ],
                },
                example: {
                  email: 'ocjay24@gmail.com',
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              headers: {},
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                        status: 'success',
                        message: 'account recovery token has been sent to your email',
                        data: {
                          account_recovery_token: 'account Recovery Token token',
                        },
                    },
                  },
                },
              },
            },
          },
          deprecated: false,
          security: [],
        },
    },
    '/auth/recover/confirm': {
        post: {
          tags: ['Auth'],
          summary: 'Recover account',
          description: 'This recovers a user\'s account.',
          operationId: 'Recover account',
          parameters: [],
          requestBody: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    {
                      $ref: '#/components/schemas/loginrequest',
                    },
                    {
                      example: {
                        token: 'access token',
                        email: 'ocjay24@gmail.com',
                        password: 'user password'
                      },
                    },
                  ],
                },
                example: {
                  email: 'ocjay24@gmail.com',
                  email: 'ocjay24@gmail.com',
                  password: 'user password'
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              headers: {},
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                        status: 'success',
                        message: 'account recovered',
                    },
                  },
                },
              },
            },
          },
          deprecated: false,
          security: [],
        },
    },
    '/event': {
      post: {
        tags: ['Events'],
        summary: 'Create event',
        description: 'This enables a signed in user to create an event.',
        operationId: 'Createevent',
        parameters: [],
        requestBody: {
          description: '',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  {
                    $ref: '#/components/schemas/CreateeventRequest',
                  },
                  {
                    example: {
                      event_title: 'Time out with friends',
                      event_description:
                        'A date to have dinner with family and friends',
                      location: 'Sheraton Hotels',
                      event_type: 'Dinner',
                      participant_number: '5',
                      start_date: '25/12/22',
                      end_date: '25/12/22',
                      host_prefered_time: '7pm',
                    },
                  },
                ],
              },
              example: {
                event_title: 'Time out with friends',
                event_description:
                  'A date to have dinner with family and friends',
                location: 'Sheraton Hotels',
                event_type: 'Dinner',
                participant_number: '5',
                start_date: '25/12/22',
                end_date: '25/12/22',
                host_prefered_time: '7pm',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    status: 'status of the operation',
                    token: 'data_id token',
                    message: 'error or success message',
                    data: 'event object',
                  },
                },
              },
            },
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
      get: {
        tags: ['Events'],
        summary: 'Get all events',
        description: 'This end point returns a collection of a users events.',
        operationId: 'Getallevents',
        parameters: [],
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                      status: 'status of the operation',
                      token: 'data_id token',
                      message: 'error or success message',
                      data: 'events object',
                    },
                  },
                },
              },
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
    },
    '/event/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Get One Event',
        description: 'This endpoint returns a single event.',
        operationId: 'GetOneEvent',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Single event id',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
              example: 'null',
            },
          },
        ],
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                      status: 'status of the operation',
                      token: 'data_id token',
                      message: 'error or success message',
                      data: 'single event ',
                    },
                  },
                },
              },
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
      delete: {
        tags: ['Events'],
        summary: 'Delete Event',
        description: 'This deletes a single event by id',
        operationId: 'DeleteEvent',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Single event id',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
              example: 'null',
            },
          },
        ],
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                      status: 'status of the operation',
                      token: 'data_id token',
                      message: 'error or success message',
                      data: 'deleted event',
                    },
                  },
                },
              },
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
      patch: {
        tags: ['Events'],
        summary: 'Update Event',
        description: 'This endpoint updates an existing event.',
        operationId: 'UpdateEvent',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Single event id',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
              example: 'null',
            },
          },
        ],
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                      status: 'status of the operation',
                      token: 'data_id token',
                      message: 'success message',
                      data: 'updated event object',
                    },
                  },
                },
              },
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
    },
    '/event/token/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Get single Event by Token',
        description: 'This gets a single event by token id',
        operationId: 'GetsingleEventbyToken',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Event token id',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
              example: 'null',
            },
          },
        ],
        responses: {
          200: {
            description: '',
            headers: {},
            content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: {
                      status: 'status of the operation',
                      token: 'data_id token',
                      message: 'success message',
                      data: 'single event object',
                    },
                  },
                },
              },
          },
        },
        deprecated: false,
      },
    },
    '/participant/addpart': {
      post: {
        tags: ['Participant'],
        summary: 'Create Participant',
        description: 'To create a participant, access this endpoint.',
        operationId: 'CreateParticipant',
        parameters: [],
        requestBody: {
          description: '',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  {
                    $ref: '#/components/schemas/CreateParticipantRequest',
                  },
                  {
                    example: {
                      fullname: 'James Ochapa',
                      email: 'ocee@catchup.com',
                      prefered_date_time: '25/12/2022 4:00',
                    },
                  },
                ],
              },
              example: {
                fullname: 'James Ochapa',
                email: 'ocee@catchup.com',
                prefered_date_time: '25/12/2022 4:00',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: '',
            headers: {},
          },
        },
        deprecated: false,
      },
    },
    '/participant/delete/{id}': {
      delete: {
        tags: ['Participant'],
        summary: 'Delete One Participant',
        description: 'This deletes a single participant',
        operationId: 'DeleteParticipant',
        parameters: [],
        responses: {
          200: {
            description: '',
            headers: {},
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
    },
    '/participant/update/{id}': {
      patch: {
        tags: ['Participant'],
        summary: 'Updates One Participant',
        description: 'This updates a single participant',
        operationId: 'UpdateParticipant',
        parameters: [],
        responses: {
          200: {
            description: '',
            headers: {},
          },
        },
        deprecated: false,
        security: [
          {
            bearer: [],
          },
        ],
      },
    },
    components: {
      schemas: {
        signuprequest: {
          title: 'signuprequest',
          required: ['name', 'email', 'password'],
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          example: {
            name: 'James Ocee',
            email: 'ocjay24@gmail.com',
            password: 'catchup123',
          },
        },
        loginrequest: {
          title: 'loginrequest',
          required: ['email', 'password'],
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          example: {
            email: 'ocjay24@gmail.com',
            password: 'catchup123',
          },
        },
        CreateeventRequest: {
          title: 'CreateeventRequest',
          required: [
            'event_title',
            'event_description',
            'location',
            'event_type',
            'participant_number',
            'start_date',
            'end_date',
            'host_prefered_time',
          ],
          type: 'object',
          properties: {
            event_title: {
              type: 'string',
            },
            event_description: {
              type: 'string',
            },
            location: {
              type: 'string',
            },
            event_type: {
              type: 'string',
            },
            participant_number: {
              type: 'string',
            },
            start_date: {
              type: 'string',
            },
            end_date: {
              type: 'string',
            },
            host_prefered_time: {
              type: 'string',
            },
          },
          example: {
            event_title: 'Time out with friends',
            event_description: 'A date to have dinner with family and friends',
            location: 'Sheraton Hotels',
            event_type: 'Dinner',
            participant_number: '5',
            start_date: '25/12/22',
            end_date: '25/12/22',
            host_prefered_time: '7pm',
          },
        },
        CreateParticipantRequest: {
          title: 'CreateParticipantRequest',
          required: ['fullname', 'email', 'prefered_date_time'],
          type: 'object',
          properties: {
            fullname: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            prefered_date_time: {
              type: 'string',
            },
          },
          example: {
            fullname: 'James Ochapa',
            email: 'ocee@catchup.com',
            prefered_date_time: '25/12/2022 4:00',
          },
        },
      },
      securitySchemes: {
        bearer: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [],
    tags: [
      {
        name: 'Auth',
        description: '',
      },
      {
        name: 'Events',
        description: '',
      },
      {
        name: 'Participant',
        description: '',
      },
    ],
  },
};
module.exports = swaggerDocumentation;