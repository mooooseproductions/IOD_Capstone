import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import logo from "../assets/barely-brewing-logo.webp";

function AboutUsPage() {
    const isLoggedIn = useSelector((state) => Boolean(state.auth.accessToken));

    return (
        <>
            <Container>
                <Row className="align-items-center g-5">
                    <Col lg={8} className="landing-copy text-start">
                        <span className="landing-kicker">The brewing resource for extract brewers</span>
                        <h1>Welcome to Barely Brewing</h1>
                        <p className="landing-lead mb-2">
                            Barely Brewing is a homebrewing resource for extract brewers who want to create, track, and share their own
                            custom beers. </p>
                        <p className="landing-lead mb-2"> If you enjoy experimenting with flavours but don’t have the time, space, or equipment for all-grain brewing,
                            Barely Brewing is for you. </p>
                        <p className="landing-lead mb-2">Brewing from scratch involves additional stages and a world of complex terminology that doesn’t always apply
                            to extract brewers. Our vision is to create a welcoming community where kit brewers can record their brews,
                            find inspiration from others, and discover beer styles and ingredients they may not have considered before. </p>
                        <p className="landing-lead mb-2">Barely Brewing makes it easy to track each brew from recipe to completion, share your results, and learn from
                            the experiences of other homebrewers. Whether a batch becomes a new favourite or a useful lesson, sharing it
                            can help another brewer with their next creation.
                        </p>

                        <div className="landing-proof">
                            <span>Track</span><i />
                            <span>Experiment</span><i />
                            <span>Share</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutUsPage;