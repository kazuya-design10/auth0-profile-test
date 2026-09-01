
const { app } = require("@azure/functions");
const jwt = require("jsonwebtoken");

app.http("save-marketing", {
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

        const responseToken = jwt.sign({
          iss:incomingToken.iss,
          sub:incomingToken.sub,
          ip:incomingToken.ip,
          subject:incomingToken.subject,
          audience:incomingToken.audience,
          expiresIn:incomingToken.expiresIn,
          state: body.state,
          other: {
            email_contact: body.email_contact,
            custom_marketing_content: body.custom_marketing_content,
            subscribed: body.subscribed
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


