const createUser = {
    tags: ["User"],
    description: "Registers a new user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "String",
                            description: "Name of the user",
                            example: "James",                            
                        },
                        email: {
                            type: "String",
                            description: "The user's email",
                            example: "James@cathup.com",                            
                        },
                        password: {
                            type: "String",
                            description: "User's password",
                            example: "catchup123",                            
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "status of the operation",
                            token: "user_id token",
                            message: "error or success message",
                            data: "user object"
                        },
                    },
                },
            },
        },
    },
}

const userRouteDoc = {
    "/users/signup": {
        post: createUser,
    },
};

module.exports = userRouteDoc;