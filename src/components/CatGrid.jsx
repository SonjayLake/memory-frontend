/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CatCard from "./CatCard";

function CatGrid({ catImages, shuffle }) {
  return (
    <>
      <Container className="catContainer">
        <Row>
          {catImages.slice(0, Math.round(catImages.length / 4)).map((obj) => {
            return (
              <Col key={obj.id} xs={12} md={4} lg={3}>
                <CatCard
                  image={obj.url}
                  key={obj.id}
                  shuffle={shuffle}
                  id={obj.id}
                ></CatCard>
              </Col>
            );
          })}
          {catImages
            .slice(
              Math.round(catImages.length / 4),
              Math.round(catImages.length / 4) * 2
            )
            .map((obj) => {
              return (
                <Col key={obj.id} xs={12} md={4} lg={3}>
                  <CatCard
                    image={obj.url}
                    key={obj.id}
                    shuffle={shuffle}
                    id={obj.id}
                  ></CatCard>
                </Col>
              );
            })}
          {catImages
            .slice(
              Math.round(catImages.length / 4) * 2,
              Math.round(catImages.length / 4) * 3
            )
            .map((obj) => {
              return (
                <Col key={obj.id} xs={12} md={4} lg={3}>
                  <CatCard
                    image={obj.url}
                    key={obj.id}
                    shuffle={shuffle}
                    id={obj.id}
                  ></CatCard>
                </Col>
              );
            })}
          {catImages
            .slice(
              Math.round(catImages.length / 4) * 3,
              Math.round(catImages.length / 4) * 4
            )
            .map((obj) => {
              return (
                <Col key={obj.id} xs={12} md={4} lg={3}>
                  <CatCard
                    image={obj.url}
                    key={obj.id}
                    shuffle={shuffle}
                    id={obj.id}
                  ></CatCard>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default CatGrid;
