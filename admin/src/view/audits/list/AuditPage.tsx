import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import AuditFilter from 'src/view/audits/list/AuditFilter';
import AuditTable from 'src/view/audits/list/AuditTable';
import { Col, Container, Row } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';

function UserPage() {
  const match = useRouteMatch();
  const id = match.params.id;

  console.log(id);
  
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('user.menu')],
        ]}
      />

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>{i18n('user.history')}</PageTitle>
            </Col>
            <Col md="auto">{/* <UserToolbar /> */}</Col>
          </Row>
        </Container>
        <AuditFilter id={id} />
        <AuditTable />
      </ContentWrapper>
    </>
  );
}

export default UserPage;
