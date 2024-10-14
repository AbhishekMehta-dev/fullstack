const isAdmin = (req, res, next) => {
  const user = req.user;

  // Check if the user is logged in and has the right role
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  if (user.role === "admin" || user.role === "agency") {
    next(); // User has the required role, proceed
  } else {
    return res.status(403).json({ message: 'Access denied. Admins or Agencies only.' });
  }
};

export { isAdmin };
