import jwt from "jsonwebtoken";

export function authCheck(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}