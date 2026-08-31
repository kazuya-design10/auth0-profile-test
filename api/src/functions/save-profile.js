const { app } = require("@azure/functions");


app.http("save-profile", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",

  handler: async (request, context) => {
    let body = null;

    if (request.method === "POST") {
      try {
        body = await request.json();

const jwt = require("jsonwebtoken");
        const responseToken =　jwt.sign({
          state: body.state,
          other: {
            first_name: body.first_name,
            last_name: body.last_name,
            age: body.age,
            city: body.city
          }
        },
        process.env.SESSION_TOKEN_SECRET,
        {
          expiresIn: "5m"
        });
        
      } catch (error) {
        context.log("JSON parse failed:", error.message);
      }
    

    return {
      status: 200,
      jsonBody: {
          continueUrl:
          `https://${process.env.AUTH0_DOMAIN}/continue?state=${body.state}`,
          sessionToken:responseToken
        }
      };
    }
  }
});



