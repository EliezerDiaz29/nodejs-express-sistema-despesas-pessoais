import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

export default function authMiddleware(req, res, next) {
    
    const authHeader = req.header.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Token not reported'});
    }

    const [scheme, token] = authHeader.split(' ');

    if(scheme !== 'Bearer' || !token) {
        return res.status(401).json({error: 'Malformatted token'})
    }

    try { 
        const decoded = jwt.verify( token, authConfig.jwt.secret);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
            
        };

        const method = req.method;
        const path = req.path;

        console.log(`Authentication Middleware: ${method} ${path} User: ${req.user.email} (Role: ${req.user.role})`);

        if(path.startWith('/user') && req.user.role !== 'admin') {
            return res.status(403).json({error: 'Access denied: only administrators can access this route'})
        }


    } catch (e) {
        return res.status(401).json({error: 'Invalid or expired token'})
    }

}