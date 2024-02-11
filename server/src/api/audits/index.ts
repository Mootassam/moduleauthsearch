export default (app) => {
  app.get(
    `/tenant/:tenantId/audits`,
    require('./auditList').default,
  );
};
