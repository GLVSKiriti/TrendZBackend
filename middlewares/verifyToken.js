const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          error: "Token is not valid",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "You are not authenticated",
    });
  }
};

const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that ");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that ");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin };
