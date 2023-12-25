import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import config from 'src/config';

const permissions = Permissions.values;

export default [
  {
    id: '0',
    path: 'user',
    exact: true,
    icon: 'fas fa-users',
    label: i18n('dashboard.menu'),
    className: 'menu-li side-menue',
    permissionRequired: null,
  },

  {
    id: '0',
    path: 'numbers',
    exact: true,
    icon: 'fas fa-upload',
    label: i18n('dashboard.phone'),
    className: 'menu-li side-menue',
    permissionRequired: null,
  },
  {
    id: '0',
    path: 'check',
    exact: true,
    icon: 'fas fa-search',
    label: i18n('dashboard.check'),
    className: 'menu-li side-menue',
    permissionRequired: null,
  },
].filter(Boolean);
