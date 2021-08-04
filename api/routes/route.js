let express = require("express");
let router = express.Router();

let auth = require("./route/auth.route");
let user = require("./route/users.route");
let project = require("./route/projects.route");
let category = require("./route/categories.route");
let account = require("./route/accounts.route")

router.use("/auth", auth);
router.use("/projects", project);
router.use("/categories", category);
router.use("/users",user);
router.use("/accounts",account);

module.exports = router;
