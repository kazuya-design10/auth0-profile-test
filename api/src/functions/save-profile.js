const { app } = require("@azure/functions");

app.http("save-profile", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",

  handler: async (request, context) => {
    let body = null;

    if (request.method === "POST") {
      try {
        body = await request.json();
      } catch (error) {
        context.log("JSON parse failed:", error.message);
      }
    }

    return {
      status: 200,
      jsonBody: {
        message: "hello",
        body: body
      }
    };
  }
});
