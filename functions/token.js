const getToken = (req) => {
    const authHeader = req.headers.authorization || req.cookies.authorization;
  
    if (!authHeader) {
      return null;
    }
  
    const [bearer, token] = authHeader.split(" ");
  
    if (bearer !== "Bearer" || !token) {
      return null;
    }
  
    return decodeToken(token);
  };


  module.exports = getToken;