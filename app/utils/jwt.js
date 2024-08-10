import jwt from 'jsonwebtoken';

export const generateToken = (admin) => {
  const payload = {
    adminId: admin._id,
    adminname: admin.username,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.status(401).json({ success: false, message: 'No token provided' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ success: false, message: 'Invalid token' });

      req.user = user; 
      next(); 
  });
};



