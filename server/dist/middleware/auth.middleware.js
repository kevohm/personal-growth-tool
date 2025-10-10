"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const auth_utils_1 = require("../utils/auth.utils");
const index_1 = require("./../db/index");
const requireAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
        return res.status(403).json({ message: "Fobidden Access" });
    const token = header.split(" ")[1];
    // console.log(header,token)
    try {
        const payload = (0, auth_utils_1.verifyToken)(token);
        if (!payload?.id)
            res.status(403).json({ message: "Fobidden Access" });
        const user = await index_1.prisma.user.findUnique({ where: { id: payload?.id }, select: {
                id: true,
                email: true,
                name: true
            } });
        if (!user)
            res.status(403).json({ message: "Fobidden Access" });
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Fobidden Access" });
    }
};
exports.requireAuth = requireAuth;
