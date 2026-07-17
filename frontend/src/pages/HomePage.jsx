import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import logo from "../assets/barely-brewing-logo.webp";

function HomePage() {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.accessToken));

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} className="landing-copy text-start">
              <span className="landing-kicker">Take your home brewing to the next level.</span>
              <h1>Find ideas.<br />Brew better.</h1>
              <p className="landing-lead">
                Barely Brewing is a homebrewing resource for extract brewers looking to create and share custom beers.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to={isLoggedIn ? "/brewing" : "/register"}
                  className="landing-primary"
                  size="lg"
                >
                  {isLoggedIn ? "Start Brewing" : "Sign Up"}
                </Button>

                <Button
                  as={Link}
                  to={isLoggedIn ? "/search" : "/login"}
                  variant="outline-dark"
                  size="lg"
                >
                  {isLoggedIn ? "Explore Recipes" : "Sign In"}
                </Button>
              </div>

              <div className="landing-proof">
                <span>Track</span><i />
                <span>Experiment</span><i />
                <span>Share</span>
              </div>
            </Col>

            <Col lg={6}>
              <div className="landing-logo-wrap">
                <div className="landing-logo-halo" />
                <img
                  src={logo}
                  alt="Barely Brewing crest with barley, hops and a beer mug"
                  className="landing-logo"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default HomePage;
