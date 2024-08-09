import jwt from 'jsonwebtoken';

const generateToken = (admin) => {
  const payload = {
    adminId: admin._id,
    adminname: admin.username,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};


export default generateToken;
