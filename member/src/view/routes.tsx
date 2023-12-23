const privateRoutes = [
  {
    path: "/",
    loader: () => import("@view/dahboard/ChekNumber"),
    permissionRequired: null,
    exact: true,
  },
].filter(Boolean);


const publicRoutes = [
  {
    path: "/auth/signin",
    loader: () => import("@view/Auth/SigninPage"),
  },
  {
    path: "/auth/signup",
    loader: () => import("@view/Auth/SignupPage"),
  },
];

const simpleRoutes = [
  {
    path: "/403",
    loader: () => import("@view/shared/errors/Error403Page"),
  },
  {
    path: "/500",
    loader: () => import("@view/shared/errors/Error500Page"),
  },
  {
    path: "**",
    loader: () => import("@view/shared/errors/Error404Page"),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('@view/Auth/EmptyPermissionsPage'),
  },
].filter(Boolean);


export default {
  publicRoutes,
  emptyPermissionsRoutes,
  privateRoutes,
  simpleRoutes,
};
