import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router";

const completedStatuses = new Set(["complete", "completed"]);

const formatDate = (date) => {
  if (!date) return "Not recorded";

  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const calculateAbv = (originalGravity, finalGravity) => {
  if (originalGravity == null || finalGravity == null) return null;
  return ((Number(originalGravity) - Number(finalGravity)) * 131.25).toFixed(2);
};

function BrewCard({ brew }) {
  const abv = calculateAbv(brew.originalGravity, brew.finalGravity);
  const completed = completedStatuses.has(brew.status?.toLowerCase());

  return (
    <Col xs={12} md={6} xl={4}>
      <Card className="brew-card-ui h-100 text-start">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <Card.Title className="mb-0">
              <Button
                as={Link}
                to={`/brewing/${brew.id}`}
                variant="link"
                className="brew-title-link p-0 text-start text-decoration-none"
              >
                {brew.name}
              </Button>
            </Card.Title>

            <Badge bg={completed ? "success" : "primary"}>
              {brew.status}
            </Badge>
          </div>

          <Card.Subtitle className="mb-3 text-muted">
            {brew.style?.name ?? "No style recorded"}
          </Card.Subtitle>

          <dl className="row mb-0 small">
            <dt className="col-6">Batch</dt>
            <dd className="col-6">{brew.batchSize} {brew.batchUnit}</dd>

            <dt className="col-6">Started</dt>
            <dd className="col-6">{formatDate(brew.dateStarted)}</dd>

            <dt className="col-6">Temperature</dt>
            <dd className="col-6">
              {brew.temperature != null
                ? `${brew.temperature} °${brew.temperatureUnit ?? "C"}`
                : "Not recorded"}
            </dd>

            <dt className="col-6">ABV</dt>
            <dd className="col-6">{abv ? `${abv}%` : "Not available"}</dd>
          </dl>

          {completed && (
            <Button
              as={Link}
              to={`/brewing?source=${brew.id}`}
              variant="outline-success"
              className="mt-3"
            >
              Brew Again
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BrewCard;
