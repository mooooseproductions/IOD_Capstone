import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import BrewCard from "./BrewCard";

function BrewSection({ title, brews, emptyMessage }) {
  return (
    <section className="brew-list-section mb-5 text-start">
      <div className="section-heading d-flex align-items-center gap-2 mb-3">
        <h2 className="mb-0">{title}</h2>
        <Badge bg="secondary" pill>{brews.length}</Badge>
      </div>

      {brews.length === 0 ? (
        <Card body className="empty-state">{emptyMessage}</Card>
      ) : (
        <Row className="g-3">
          {brews.map((brew) => <BrewCard key={brew.id} brew={brew} />)}
        </Row>
      )}
    </section>
  );
}

export default BrewSection;