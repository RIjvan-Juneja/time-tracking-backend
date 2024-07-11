const { users, roles, permissions } = require('../../models/index');

const isPermission = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const userId = req.user; 
      const user = await users.findByPk(userId, {
        include: {
          model: roles,
          include: {
            model: permissions,
            through: { attributes: [] } 
          }
        }
      });

      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }

      const userPermissions = user.role.permissions.map(permission => permission.name);

      const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = isPermission;
