import Roles from '../../security/roles';

const userEnumerators = {
  status: ['active', 'invited', 'empty-permissions'],
  genre: ['male', 'female'],
  roles: Object.keys(Roles.values),
};

export default userEnumerators;
