module.exports = async function (context, req) {

  context.res = {
    status: 200,
    body: {
      message: "hello",
      body: req.body
    }
  };

};
/*  
module.exports = async function (context, req) {
try {





  context.res = {
    status: 200,
    body: req.body
  };

};

  const {
    first_name,
    last_name,
    age,
    city,
    state,
    session_token
  } = req.body || {};


    if (
      !first_name ||
      !last_name ||
      !age ||
      !city ||
      !state ||
      !session_token
    ) {
      context.res = {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          error: "Required parameters are missing."
        }
      };
      return;
    }

    const secret = process.env.SESSION_TOKEN_SECRET;
    const auth0Domain = process.env.AUTH0_DOMAIN;

    if (!secret || !auth0Domain) {
      context.log.error(
        "SESSION_TOKEN_SECRET or AUTH0_DOMAIN is not configured."
      );

      context.res = {
        status: 500,
        body: {
          error: "Server configuration is missing."
        }
      };
      return;
    }


    const incomingToken = jwt.verify(
      session_token,
      secret,
      {
        algorithms: ["HS256"]
      }
    );

    if (!incomingToken.sub) {
      context.res = {
        status: 400,
        body: {
          error: "The incoming token does not contain sub."
        }
      };
      return;
    }

    const responseToken = jwt.sign(
      {
        sub: incomingToken.sub,
        state: state,
        other: {
          first_name: String(first_name).trim(),
          last_name: String(last_name).trim(),
          age: String(age).trim(),
          city: String(city).trim()
        }
      },
      secret,
      {
        algorithm: "HS256",
        expiresIn: "5m"
      }
    );

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: {
        continueUrl:
          `https://${auth0Domain}/continue?state=` +
          encodeURIComponent(state),

        sessionToken: responseToken
      }
    };
  } catch (error) {
    context.log.error(
      "save-profile failed:",
      error.message
    );

    context.res = {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: {
        error: "Invalid or expired session token."
      }
    };
  }
};
*/
