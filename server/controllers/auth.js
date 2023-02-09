const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const supabase = require("../utils/config").supabase;
const validateForm = require("../utils/validateForm");

authRouter.post("/register", async (req, res) => {
  try {
    await validateForm(req);
  } catch (err) {
    throw err;
  }

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await supabase.from("users").select().match({ username });
  if (userExists.data && userExists.data.length > 0) {
    return res
      .status(400)
      .json({ loggedIn: false, error: "Username already registered" });
  }

  const { data, error } = await supabase
    .from("users")
    .insert({ username, password: hashedPassword })
    .select();

  if (error) {
    return res.status(400).json({ loggedIn: false, error: error.message });
  }

  req.session.user = { username, userId: data[0].id };
  return res.status(200).json({
    loggedIn: true,
    statusText: "ok",
    user: req.session.user,
  });
});

authRouter
  .get("/login", (req, res) => {
    console.log("req.session", req.session);
    console.log("login route");
    if (req.session.user) {
      return res.json({ loggedIn: true, user: req.session.user });
    } else {
      return res.json({ loggedIn: false });
    }
  })
  .post("/login", async (req, res) => {
    try {
      await validateForm(req);
    } catch (err) {
      throw err;
    }

    const { username, password } = req.body;
    const { data, error } = await supabase
      .from("users")
      .select()
      .match({ username });
    if (error) {
      return res.status(400).json({ loggedIn: false, error: error.message });
    }

    if (data && data.length > 0) {
      const isSamePassword = await bcrypt.compare(password, data[0].password);
      if (!isSamePassword) {
        return res
          .status(400)
          .json({ loggedIn: false, error: "Invalid credentials" });
      }
    }

    req.session.user = { username, userId: data[0].id };
    console.log(req.session);
    return res
      .status(200)
      .json({ loggedIn: true, statusText: "ok", user: req.session.user });
  });

module.exports = authRouter;
