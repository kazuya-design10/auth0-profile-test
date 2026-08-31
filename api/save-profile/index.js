
module.exports = async function (context, req) {

  const {
    name,
    age,
    city,
    first_name,
    last_name,
    user_id
  } = req.body;

  // Auth0更新

  context.res = {
    status: 200,
    body: "ok"
  };
};
