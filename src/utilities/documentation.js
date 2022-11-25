const swaggerDocumentation = {
  "openapi": "3.0.0",
  "info": {
    "title": "Catchup",
    "contact": {},
    "version": "1.0"
  },
  "servers": [
    {
      "url": "http://api.catchup.hng.tech/api/v1",
      "description": "Production Server",
      "variables": {}
    },
    {
      "url": "http://localhost:8800/api/v1",
      "description": "Local Server",
      "variables": {}
    }
  ],
  "paths": {
    "/event/{id}": {
      "get": {
        "tags": [
          "Event"
        ],
        "summary": "Get One Event",
        "description": "This returns a single event.",
        "operationId": "GetOneEvent",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Single event id",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "example": "null"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/GetOneEvent"
                    },
                    {
                      "example": {
                        "status": "status of the operation",
                        "token": "data_id token",
                        "message": "error or success message",
                        "data": "single event"
                      }
                    }
                  ]
                },
                "example": {
                  "status": "status of the operation",
                  "token": "data_id token",
                  "message": "error or success message",
                  "data": "single event"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "patch": {
        "tags": [
          "Event"
        ],
        "summary": "Update Event",
        "description": "Update a single event.",
        "operationId": "UpdateEvent",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Single event id",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "example": "null"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/UpdateEvent"
                    },
                    {
                      "example": {
                        "status": "status of the operation",
                        "token": "data_id token",
                        "message": "success message",
                        "data": "updated event object"
                      }
                    }
                  ]
                },
                "example": {
                  "status": "status of the operation",
                  "token": "data_id token",
                  "message": "success message",
                  "data": "updated event object"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "delete": {
        "tags": [
          "Event"
        ],
        "summary": "Delete Event",
        "description": "An endpoint to delete an event.",
        "operationId": "DeleteEvent",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Single event id",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "example": "null"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/DeleteEvent"
                    },
                    {
                      "example": {
                        "status": "status of the operation",
                        "message": "success message",
                        "data": "deleted event"
                      }
                    }
                  ]
                },
                "example": {
                  "status": "status of the operation",
                  "message": "success message",
                  "data": "deleted event"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/event": {
      "get": {
        "tags": [
          "Event"
        ],
        "summary": "Get all events",
        "description": "Returns all the users events.",
        "operationId": "Getallevents",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/Getallevents"
                    },
                    {
                      "example": {
                        "status": "status of the operation",
                        "token": "data_id token",
                        "message": "error or success message",
                        "data": "events object"
                      }
                    }
                  ]
                },
                "example": {
                  "status": "status of the operation",
                  "token": "data_id token",
                  "message": "error or success message",
                  "data": "events object"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "post": {
        "tags": [
          "Event"
        ],
        "summary": "Create event",
        "description": "Creates a new event",
        "operationId": "Createevent",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/CreateeventRequest"
                  },
                  {
                    "example": {
                      "event_title": "Time out with friends",
                      "event_description": "A date to have dinner with family and friends",
                      "location": "Sheraton Hotels",
                      "event_type": "Dinner",
                      "participant_number": "5",
                      "start_date": "25/12/22",
                      "end_date": "25/12/22",
                      "host_prefered_time": "7pm"
                    }
                  }
                ]
              },
              "example": {
                "event_title": "Time out with friends",
                "event_description": "A date to have dinner with family and friends",
                "location": "Sheraton Hotels",
                "event_type": "Dinner",
                "participant_number": "5",
                "start_date": "25/12/22",
                "end_date": "25/12/22",
                "host_prefered_time": "7pm"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/Createevent"
                    },
                    {
                      "example": {
                        "event_description": "A date to have dinner with family and friends",
                        "location": "Sheraton Hotels",
                        "event_type": "Dinner",
                        "participant_number": "5",
                        "start_date": "25/12/22",
                        "end_date": "25/12/22",
                        "host_prefered_time": "7pm",
                        "event_title": "Time out with friends"
                      }
                    }
                  ]
                },
                "example": {
                  "event_description": "A date to have dinner with family and friends",
                  "location": "Sheraton Hotels",
                  "event_type": "Dinner",
                  "participant_number": "5",
                  "start_date": "25/12/22",
                  "end_date": "25/12/22",
                  "host_prefered_time": "7pm",
                  "event_title": "Time out with friends"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/event/token/{id}": {
      "get": {
        "tags": [
          "Event"
        ],
        "summary": "Get single Event by Token",
        "description": "This endpoint returns a single event by token",
        "operationId": "GetsingleEventbyToken",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Event token id",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "example": "null"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/GetsingleEventbyToen"
                    },
                    {
                      "example": {
                        "status": "status of the operation",
                        "token": "data_id token",
                        "message": "success message",
                        "data": "single event object"
                      }
                    }
                  ]
                },
                "example": {
                  "status": "status of the operation",
                  "token": "data_id token",
                  "message": "success message",
                  "data": "single event object"
                }
              }
            }
          }
        },
        "deprecated": false
      }
    },
    "/participant/delete/{id}": {
      "delete": {
        "tags": [
          "Participant"
        ],
        "summary": "delete Participant",
        "description": "Delete a single participant from an event.",
        "operationId": "deleteParticipant",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "example": "null"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/example"
                    },
                    {}
                  ]
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/participant/update/{id}": {
      "post": {
        "tags": [
          "Participant"
        ],
        "summary": "Update a Participant",
        "description": "Update an event's participant.",
        "operationId": "UpdateaParticipant",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "",
            "required": true,
            "style": "simple",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/example"
                },
                {}
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/example"
                    },
                    {}
                  ]
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/participant/addpart": {
      "post": {
        "tags": [
          "Participant"
        ],
        "summary": "Create Participant",
        "description": "Create a new participant for an event.",
        "operationId": "CreateParticipant",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/CreateParticipantRequest"
                  },
                  {}
                ]
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/CreateParticipant"
                    },
                    {
                      "example": {
                        "fullname": "James Ochapa",
                        "email": "ocee@catchup.com",
                        "prefered_date_time": "25/12/2022 4:00"
                      }
                    }
                  ]
                },
                "example": {
                  "fullname": "James Ochapa",
                  "email": "ocee@catchup.com",
                  "prefered_date_time": "25/12/2022 4:00"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/invitation/": {
      "post": {
        "tags": [
          "Invite"
        ],
        "summary": "Create Invite",
        "description": "Create a new invite for an event.",
        "operationId": "CreateInvite",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "text/plain": {
              "schema": {
                "type": "object",
                "example": {
                  "email_list": [
                    "invitee1@catchup.com",
                    "invitee2@catchup.com"
                  ],
                  "event_id": "input the event's id"
                }
              },
              "example": {
                "email_list": [
                  "invitee1@catchup.com",
                  "invitee2@catchup.com"
                ],
                "event_id": "input the event's id"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/CreateParticipant"
                    },
                    {
                      "example": {
                        "fullname": "James Ochapa",
                        "email": "ocee@catchup.com",
                        "prefered_date_time": "25/12/2022 4:00"
                      }
                    }
                  ]
                },
                "example": {
                  "fullname": "James Ochapa",
                  "email": "ocee@catchup.com",
                  "prefered_date_time": "25/12/2022 4:00"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/invitation/{id}": {
      "patch": {
        "tags": [
          "Invite"
        ],
        "summary": "Update Invitee",
        "description": "This updates a single invite",
        "operationId": "UpdateInvitee",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "",
          "content": {
            "text/plain": {
              "schema": {
                "type": "object",
                "example": {
                  "email_list": [
                    "invitee1@catchup.com",
                    "invitee2@catchup.com"
                  ],
                  "event_id": "input the event's id"
                }
              },
              "example": {
                "email_list": [
                  "invitee1@catchup.com",
                  "invitee2@catchup.com"
                ],
                "event_id": "input the event's id"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/example"
                    },
                    {}
                  ]
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "delete": {
        "tags": [
          "Invite"
        ],
        "summary": "Delete invite",
        "description": "This endpoint removes an invite.",
        "operationId": "Deleteinvite",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/example"
                    },
                    {}
                  ]
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": [
          {
            "bearer": []
          }          
        ]
      }
    },
    "/auth/signin": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "signin",
        "description": "Signs in a user",
        "operationId": "signin",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/signinrequest"
                  },
                  {
                    "example": {
                      "email": "ocjay24@gmail.com",
                      "password": "catchup123"
                    }
                  }
                ]
              },
              "example": {
                "email": "ocjay24@gmail.com",
                "password": "catchup123"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/signin"
                    },
                    {
                      "example": {
                        "success": true,
                        "message": "Logged in successfully",
                        "user": {
                          "name": "user name",
                          "id": "user_id",
                          "email": "user email"
                        },
                        "accessToken": "token"
                      }
                    }
                  ]
                },
                "example": {
                  "success": true,
                  "message": "Logged in successfully",
                  "user": {
                    "name": "user name",
                    "id": "user_id",
                    "email": "user email"
                  },
                  "accessToken": "token"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/auth/signup": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "signup",
        "description": "Registers a new user",
        "operationId": "signup",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/signuprequest"
                  },
                  {
                    "example": {
                      "name": "James Ocee",
                      "email": "ocjay24@gmail.com",
                      "password": "catchup123"
                    }
                  }
                ]
              },
              "example": {
                "name": "James Ocee",
                "email": "ocjay24@gmail.com",
                "password": "catchup123"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {
              "Access-Control-Allow-Origin": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "*"
                  }
                }
              },
              "Content-Security-Policy": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
                  }
                }
              },
              "Cross-Origin-Embedder-Policy": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "require-corp"
                  }
                }
              },
              "Cross-Origin-Opener-Policy": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "same-origin"
                  }
                }
              },
              "Cross-Origin-Resource-Policy": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "same-origin"
                  }
                }
              },
              "X-DNS-Prefetch-Control": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "off"
                  }
                }
              },
              "Expect-CT": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "max-age=0"
                  }
                }
              },
              "X-Frame-Options": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "SAMEORIGIN"
                  }
                }
              },
              "Strict-Transport-Security": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "max-age=15552000; includeSubDomains"
                  }
                }
              },
              "X-Download-Options": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "noopen"
                  }
                }
              },
              "X-Content-Type-Options": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "nosniff"
                  }
                }
              },
              "Origin-Agent-Cluster": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "?1"
                  }
                }
              },
              "X-Permitted-Cross-Domain-Policies": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "none"
                  }
                }
              },
              "Referrer-Policy": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "no-referrer"
                  }
                }
              },
              "X-XSS-Protection": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "0"
                  }
                }
              },
              "X-Powered-By": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "Express"
                  }
                }
              },
              "Content-Length": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "82"
                  }
                }
              },
              "ETag": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "W/\"52-+hh2O2j0j5m0Fyx/K+T6LyG5CEU\""
                  }
                }
              },
              "Date": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "Sat, 19 Nov 2022 15:35:25 GMT"
                  }
                }
              },
              "Connection": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "keep-alive"
                  }
                }
              },
              "Keep-Alive": {
                "content": {
                  "text/plain": {
                    "schema": {
                      "type": "string"
                    },
                    "example": "timeout=5"
                  }
                }
              }
            },
            "content": {
              "application/json; charset=utf-8": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/example"
                    },
                    {
                      "example": {
                        "status": "success",
                        "token": "",
                        "message": "Account created successfully",
                        "data": {}
                      }
                    }
                  ]
                },
                "example": {
                  "status": "success",
                  "token": "",
                  "message": "Account created successfully",
                  "data": {}
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/auth/recover/confirm": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "recover account",
        "description": "This recovers user account",
        "operationId": "recoveraccount",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/recoveraccountrequest"
                  },
                  {
                    "example": {
                      "token": "access token",
                      "email": "ocjay24@gmail.com",
                      "password": "user password"
                    }
                  }
                ]
              },
              "example": {
                "token": "access token",
                "email": "ocjay24@gmail.com",
                "password": "user password"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/recoveraccount"
                    },
                    {
                      "example": {
                        "status": "success",
                        "message": "account recovered"
                      }
                    }
                  ]
                },
                "example": {
                  "status": "success",
                  "message": "account recovered"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/auth/recover/generate": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "generate recover token",
        "description": "generates a recover token",
        "operationId": "generaterecovertoken",
        "parameters": [],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/generaterecovertokenrequest"
                  },
                  {
                    "example": {
                      "email": "ocjay@gmail.com"
                    }
                  }
                ]
              },
              "example": {
                "email": "ocjay@gmail.com"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/generaterecovertoken"
                    },
                    {
                      "example": {
                        "status": "success",
                        "message": "account recovery token has been sent to your email",
                        "data": {
                          "account_recovery_token": "account Recovery Token token"
                        }
                      }
                    }
                  ]
                },
                "example": {
                  "status": "success",
                  "message": "account recovery token has been sent to your email",
                  "data": {
                    "account_recovery_token": "account Recovery Token token"
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/auth/refresh": {
      "get": {
        "tags": [
          "Auth"
        ],
        "summary": "Refresh token",
        "description": "This generates a refresh token",
        "operationId": "Refreshtoken",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "headers": {},
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/Refreshtoken"
                    },
                    {
                      "example": {
                        "accessToken": "token"
                      }
                    }
                  ]
                },
                "example": {
                  "accessToken": "token"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/auth/google/url": {
      "get": {
        "tags": [
          "Auth"
        ],
        "summary": "Get google login url",
        "description": "This loads the google auth interface where the user selects his account",
        "operationId": "Getgoogleloginurl",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "headers": {},
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "example": "Returns google authentication url"
                },
                "example": "Returns google authentication url"
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    },
    "/auth/google": {
      "get": {
        "tags": [
          "Auth"
        ],
        "summary": "Get user google auth",
        "description": "Authenticate a user from google",
        "operationId": "Getusergoogleauth",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "headers": {},
            "content": {
              "text/plain": {
                "schema": {
                  "type": "object",
                  "example": {
                    "status": "request status",
                    "token": "signed token",
                    "message": "message",
                    "data": "access_token"
                  }
                },
                "example": {
                  "status": "request status",
                  "token": "signed token",
                  "message": "message",
                  "data": "access_token"
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    }
  },
  "components": {
    "schemas": {
      "generaterecovertoken": {
        "title": "generaterecovertoken",
        "required": [
          "status",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "allOf": [
              {
                "$ref": "#/components/schemas/Data"
              },
              {}
            ]
          }
        },
        "example": {
          "status": "success",
          "message": "account recovery token has been sent to your email",
          "data": {
            "account_recovery_token": "account Recovery Token token"
          }
        }
      },
      "example": {
        "title": "example",
        "required": [
          "status",
          "token",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "token": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "object"
          }
        },
        "example": {
          "status": "success",
          "token": "",
          "message": "Account created successfully",
          "data": {}
        }
      },
      "recoveraccount": {
        "title": "recoveraccount",
        "required": [
          "status",
          "message"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        },
        "example": {
          "status": "success",
          "message": "account recovered"
        }
      },
      "Createevent": {
        "title": "Createevent",
        "required": [
          "event_description",
          "location",
          "event_type",
          "participant_number",
          "start_date",
          "end_date",
          "host_prefered_time",
          "event_title"
        ],
        "type": "object",
        "properties": {
          "event_description": {
            "type": "string"
          },
          "location": {
            "type": "string"
          },
          "event_type": {
            "type": "string"
          },
          "participant_number": {
            "type": "string"
          },
          "start_date": {
            "type": "string"
          },
          "end_date": {
            "type": "string"
          },
          "host_prefered_time": {
            "type": "string"
          },
          "event_title": {
            "type": "string"
          }
        },
        "example": {
          "event_description": "A date to have dinner with family and friends",
          "location": "Sheraton Hotels",
          "event_type": "Dinner",
          "participant_number": "5",
          "start_date": "25/12/22",
          "end_date": "25/12/22",
          "host_prefered_time": "7pm",
          "event_title": "Time out with friends"
        }
      },
      "DeleteEvent": {
        "title": "DeleteEvent",
        "required": [
          "status",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "string"
          }
        },
        "example": {
          "status": "status of the operation",
          "message": "success message",
          "data": "deleted event"
        }
      },
      "signinrequest": {
        "title": "signinrequest",
        "required": [
          "email",
          "password"
        ],
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "example": {
          "email": "ocjay24@gmail.com",
          "password": "catchup123"
        }
      },
      "Getallevents": {
        "title": "Getallevents",
        "required": [
          "status",
          "token",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "token": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "string"
          }
        },
        "example": {
          "status": "status of the operation",
          "token": "data_id token",
          "message": "error or success message",
          "data": "events object"
        }
      },
      "UpdateEvent": {
        "title": "UpdateEvent",
        "required": [
          "status",
          "token",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "token": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "string"
          }
        },
        "example": {
          "status": "status of the operation",
          "token": "data_id token",
          "message": "success message",
          "data": "updated event object"
        }
      },
      "signuprequest": {
        "title": "signuprequest",
        "required": [
          "name",
          "email",
          "password"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "example": {
          "name": "James Ocee",
          "email": "ocjay24@gmail.com",
          "password": "catchup123"
        }
      },
      "signin": {
        "title": "signin",
        "required": [
          "success",
          "message",
          "user",
          "accessToken"
        ],
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string"
          },
          "user": {
            "allOf": [
              {
                "$ref": "#/components/schemas/User"
              },
              {}
            ]
          },
          "accessToken": {
            "type": "string"
          }
        },
        "example": {
          "success": true,
          "message": "Logged in successfully",
          "user": {
            "name": "user name",
            "id": "user_id",
            "email": "user email"
          },
          "accessToken": "token"
        }
      },
      "User": {
        "title": "User",
        "required": [
          "name",
          "id",
          "email"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        },
        "example": {
          "name": "user name",
          "id": "user_id",
          "email": "user email"
        }
      },
      "Refreshtoken": {
        "title": "Refreshtoken",
        "required": [
          "accessToken"
        ],
        "type": "object",
        "properties": {
          "accessToken": {
            "type": "string"
          }
        },
        "example": {
          "accessToken": "token"
        }
      },
      "CreateeventRequest": {
        "title": "CreateeventRequest",
        "required": [
          "event_title",
          "event_description",
          "location",
          "event_type",
          "participant_number",
          "start_date",
          "end_date",
          "host_prefered_time"
        ],
        "type": "object",
        "properties": {
          "event_title": {
            "type": "string"
          },
          "event_description": {
            "type": "string"
          },
          "location": {
            "type": "string"
          },
          "event_type": {
            "type": "string"
          },
          "participant_number": {
            "type": "string"
          },
          "start_date": {
            "type": "string"
          },
          "end_date": {
            "type": "string"
          },
          "host_prefered_time": {
            "type": "string"
          }
        },
        "example": {
          "event_title": "Time out with friends",
          "event_description": "A date to have dinner with family and friends",
          "location": "Sheraton Hotels",
          "event_type": "Dinner",
          "participant_number": "5",
          "start_date": "25/12/22",
          "end_date": "25/12/22",
          "host_prefered_time": "7pm"
        }
      },
      "GetOneEvent": {
        "title": "GetOneEvent",
        "required": [
          "status",
          "token",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "token": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "string"
          }
        },
        "example": {
          "status": "status of the operation",
          "token": "data_id token",
          "message": "error or success message",
          "data": "single event"
        }
      },
      "GetsingleEventbyToen": {
        "title": "GetsingleEventbyToen",
        "required": [
          "status",
          "token",
          "message",
          "data"
        ],
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "token": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "string"
          }
        },
        "example": {
          "status": "status of the operation",
          "token": "data_id token",
          "message": "success message",
          "data": "single event object"
        }
      },
      "CreateParticipantRequest": {
        "title": "CreateParticipantRequest",
        "required": [
          "fullname",
          "email",
          "prefered_date_time"
        ],
        "type": "object",
        "properties": {
          "fullname": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "prefered_date_time": {
            "type": "string"
          }
        },
        "example": {
          "fullname": "James Ochapa",
          "email": "ocee@catchup.com",
          "prefered_date_time": "25/12/2022 4:00"
        }
      },
      "generaterecovertokenrequest": {
        "title": "generaterecovertokenrequest",
        "required": [
          "email"
        ],
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          }
        },
        "example": {
          "email": "ocjay@gmail.com"
        }
      },
      "Data": {
        "title": "Data",
        "required": [
          "account_recovery_token"
        ],
        "type": "object",
        "properties": {
          "account_recovery_token": {
            "type": "string"
          }
        },
        "example": {
          "account_recovery_token": "account Recovery Token token"
        }
      },
      "recoveraccountrequest": {
        "title": "recoveraccountrequest",
        "required": [
          "token",
          "email",
          "password"
        ],
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "example": {
          "token": "access token",
          "email": "ocjay24@gmail.com",
          "password": "user password"
        }
      },
      "CreateParticipant": {
        "title": "CreateParticipant",
        "required": [
          "fullname",
          "email",
          "prefered_date_time"
        ],
        "type": "object",
        "properties": {
          "fullname": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "prefered_date_time": {
            "type": "string"
          }
        },
        "example": {
          "fullname": "James Ochapa",
          "email": "ocee@catchup.com",
          "prefered_date_time": "25/12/2022 4:00"
        }
      }
    },
    "securitySchemes": {
      "bearer": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  },
  "security": [],
  "tags": [
    {
      "name": "Auth"
    },
    {
      "name": "Event"
    },
    {
      "name": "Participant"
    },
    {
      "name": "Invite",
      "description": ""
    }
  ]
}




module.exports = swaggerDocumentation;