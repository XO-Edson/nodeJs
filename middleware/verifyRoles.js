const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];
    console.log("Allowed Roles:", rolesArray); // returns [5051]
    console.log("User roles:", req.roles); //returns [2001,1984,5150]

    const result = req.roles
      .map((role) => rolesArray.includes(role)) //returns [false,false,false]
      .find((val) => val === true);
    console.log(result); // returns "undefined"
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
