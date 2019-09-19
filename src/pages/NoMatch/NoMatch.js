import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";

const NoMatch = () => (
  <Container fluid>
    <Link to={"/"}><button id="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back</button></Link>
    <Row>
      <Col size="md-12">
          <h4>404 Page Not Found <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h4>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
