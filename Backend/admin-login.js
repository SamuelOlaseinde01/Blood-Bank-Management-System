async function adminLogin(req, res) {
    const { username, password } = req.body;
  
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: true });
    }
  
    res.status(404).json({ success: false, message: 'Invalid credentials' });
};

module.exports = {adminLogin: adminLogin}
  