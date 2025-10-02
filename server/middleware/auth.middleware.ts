import { verifyToken } from "../utils/auth.utils";
import { prisma } from './../db/index';

export const requireAuth = async (req: any, res: any, next: any) => {
  const header = req.headers.authorization;
  if (!header) return res.status(403).json({ message: "Fobidden Access" })
  const token = header.split(" ")[1];
  // console.log(header,token)
  try {
    const payload = verifyToken(token)
    if (!payload?.id) res.status(403).json({ message: "Fobidden Access" });
    const user = await prisma.user.findUnique({ where: { id: payload?.id }, select:{
      id:true,
      email:true,
      name:true
    }})
    if (!user) res.status(403).json({ message: "Fobidden Access" });
    req.user = user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Fobidden Access" });
  }
};
