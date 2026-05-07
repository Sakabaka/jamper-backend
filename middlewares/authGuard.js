const { verify } = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.protectorMW = async (req, res, next) => {
  try {
    let token;
    // 1) thabat si el user 3andou token walé
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        message: "You are not logged in !!!",
      });
    }
    // 2) thabat fel validité mta3 el token
    const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3) thabat si el user moula el token mizel mawjoud wala me3edech
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({
        message: "This user no longer exists !!!!",
      });
    }
    // 4) thabat si el token tsan3et 9bal wala ba3d e5er pass update !
    // console.log(parseInt(user.password_changed_at.getTime() / 1000));
    // console.log(decoded.iat);
    if (parseInt(user.password_changed_at.getTime() / 1000) > decoded.iat) {
      res.status(401).json({
        message: "You must re-loggin !!!!",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.checkRoleMW = (...roles) => {
  return async (req, res, next) => {
    try {
      // /dfghfdfbgdfgsdgkhsdbfkhsdbfskd
      next();
    } catch (error) {
      res.status(400).json({
        message: "Fail !!",
        error: error,
      });
    }
  };
};
