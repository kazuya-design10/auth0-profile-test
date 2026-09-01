const { app } = require("@azure/functions");
const jwt = require("jsonwebtoken");

app.http("save-profile", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    if (request.method === "POST") {
      try {
        const body = await request.json();
        const incomingToken = jwt.verify(
        body.session_token,
        process.env.SESSION_TOKEN_SECRET
        );
        
        console.log(incomingToken);
        
        const responseToken = jwt.sign({
          state: body.state,
          other: {
            first_name: body.first_name,
            last_name: body.last_name,
            age: body.age,
            city: body.city
          }
        },
    process.env.SESSION_TOKEN_SECRET,{
      expiresIn: "5m"
    }
);
        return {
          status: 200,
          jsonBody: {
          continueUrl:
          `https://${process.env.AUTH0_DOMAIN}/continue?state=${body.state}`,
          sessionToken:responseToken
          }
        };
      } catch (error) {
        context.log("JSON parse failed:", error.message);
        return {
                status: 500,
                jsonBody: {
                error: error.message
                }
                };
        }
    }
  }
});



