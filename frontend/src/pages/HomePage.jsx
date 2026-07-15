import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import logo from "../assets/barely-brewing-logo.webp";

const features = [
  {
    number: "01",
    title: "Record every batch",
    text: "Keep recipes, ingredients, gravity readings, temperatures and tasting notes together.",
  },
  {
    number: "02",
    title: "Discover what works",
    text: "Search community brews by name, style or ingredient and save the recipes worth revisiting.",
  },
  {
    number: "03",
    title: "Brew it your way",
    text: "Start from a favourite recipe or brew a successful batch again without changing the original.",
  },
];

function HomePage() {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.accessToken));

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} className="landing-copy text-start">
              <span className="landing-kicker">Homebrew, remembered properly</span>
              <h1>Better notes.<br />Better beer.</h1>
              <p className="landing-lead">
                Barely Brewing is a straightforward brew journal for extract brewers—built to track each batch, learn from it, and make the next one better.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to={isLoggedIn ? "/brewing" : "/register"}
                  className="landing-primary"
                  size="lg"
                >
                  {isLoggedIn ? "Add a Brew" : "Start Your Brew Log"}
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
                <span>Discover</span><i />
                <span>Brew Again</span>
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

      <section className="landing-features">
        <Container>
          <div className="landing-section-heading text-start">
            <span className="landing-kicker">From first pour to favourite recipe</span>
            <h2>Your brewing history should be useful.</h2>
          </div>

          <Row className="g-4">
            {features.map((feature) => (
              <Col md={4} key={feature.number}>
                <Card className="landing-feature-card h-100">
                  <Card.Body>
                    <span className="feature-number">{feature.number}</span>
                    <Card.Title as="h3">{feature.title}</Card.Title>
                    <Card.Text>{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="landing-cta">
        <Container>
          <div className="landing-cta-panel text-start">
            <div>
              <span className="landing-kicker">EST. 2026 · Built for homebrewers</span>
              <h2>Every good brew deserves another round.</h2>
            </div>
            <Button
              as={Link}
              to={isLoggedIn ? "/profile" : "/register"}
              className="landing-cta-button"
              size="lg"
            >
              {isLoggedIn ? "View My Brews" : "Create an Account"}
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default HomePage;
