import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  addFavourite,
  removeFavourite,
} from "../features/searchSlice";

function SearchResultCard({ brew, favourite, changing }) {
  const dispatch = useDispatch();

  return (
    <Col xs={12} md={6} xl={4}>
      <Card className="brew-card-ui search-result-card h-100 text-start">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <Card.Title>{brew.name}</Card.Title>
            <Badge bg="secondary">{brew.status}</Badge>
          </div>

          <Card.Subtitle className="mb-3 text-muted">
            {brew.style?.name ?? "No style"} · @{brew.user?.handle ?? "Unknown brewer"}
          </Card.Subtitle>

          <p className="mb-2">
            <strong>Batch:</strong> {brew.batchSize} {brew.batchUnit}
          </p>

          <div className="mb-3">
            <strong>Ingredients:</strong>
            <div className="d-flex flex-wrap gap-1 mt-1">
              {brew.ingredient.length > 0 ? (
                brew.ingredient.map((item) => (
                  <Badge key={`${brew.id}-${item.ingredient.id}`} bg="light" text="dark">
                    {item.ingredient.name}
                  </Badge>
                ))
              ) : (
                <span className="text-muted"> None recorded</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 mt-auto">
            <Button as={Link} to={`/brewing?source=${brew.id}`} variant="primary">
              Brew This
            </Button>

            <Button
              type="button"
              variant={favourite ? "outline-danger" : "outline-secondary"}
              disabled={changing}
              onClick={() => dispatch(
                favourite ? removeFavourite(brew.id) : addFavourite(brew.id)
              )}
            >
              {changing ? "Saving..." : favourite ? "Remove Favourite" : "Favourite"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SearchResultCard;
