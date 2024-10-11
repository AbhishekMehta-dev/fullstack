
const isAdmin = (req, res, next) => {
    const user = req.user;
  
    if (user && user.role === 'admin') {
      next(); // user is admin, proceed
    } else {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };

  export {isAdmin};

  
