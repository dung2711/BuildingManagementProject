import passport from "passport";

const authenticateJWT = passport.authenticate('jwt', { session: false });

const authorizeRoles = (...roles) =>
    (req, res, next) => {
        const user = req.user.dataValues;
        if(!roles.includes(user.authentication)) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
        }
        next();
    }


export {authenticateJWT, authorizeRoles};