
module.exports = async function (context, req) {

  const {
    name,
    age,
    city,
    user_id
  } = req.body;

  // Auth0更新

  context.res = {
    status: 200,
    body: "ok"
  };
};
