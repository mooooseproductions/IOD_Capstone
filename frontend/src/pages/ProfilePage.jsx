import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/profileSlice";
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

  return (
    <Col xs={12} md={6} xl={4}>
      <Card className="h-100 shadow-sm text-start">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <Card.Title className="mb-0">
              <Button
                as={Link}
                to={`/brewing/${brew.id}`}
                variant="link"
                className="p-0 text-start text-decoration-none"
              >
                {brew.name}
              </Button>
            </Card.Title>
            <Badge bg={completedStatuses.has(brew.status?.toLowerCase()) ? "success" : "primary"}>
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
        </Card.Body>
      </Card>
    </Col>
  );
}

function BrewSection({ title, brews, emptyMessage }) {
  return (
    <section className="mb-5 text-start">
      <div className="d-flex align-items-center gap-2 mb-3">
        <h2 className="mb-0">{title}</h2>
        <Badge bg="secondary" pill>{brews.length}</Badge>
      </div>

      {brews.length === 0 ? (
        <Card body className="text-muted">{emptyMessage}</Card>
      ) : (
        <Row className="g-3">
          {brews.map((brew) => <BrewCard key={brew.id} brew={brew} />)}
        </Row>
      )}
    </section>
  );
}

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, brews, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (status === "idle") dispatch(fetchUserProfile());
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Loading your profile...</p>
      </Container>
    );
  }

  if (status === "failed") {
    return <Container className="py-4"><Alert variant="danger">{error}</Alert></Container>;
  }

  const activeBrews = brews.filter(
    (brew) => !completedStatuses.has(brew.status?.toLowerCase())
  );
  const completedBrews = brews.filter(
    (brew) => completedStatuses.has(brew.status?.toLowerCase())
  );

  return (
    <Container className="py-4">
      <Card className="mb-5 shadow-sm text-start">
        <Card.Body>
          <Card.Title as="h1" className="fs-2 mb-3">{user.name}</Card.Title>
          <Row className="g-3">
            <Col xs={12} md={4}><strong>Handle</strong><div>@{user.handle}</div></Col>
            <Col xs={12} md={4}><strong>Email</strong><div>{user.email}</div></Col>
            <Col xs={12} md={4}><strong>Member since</strong><div>{formatDate(user.accountCreatedAt)}</div></Col>
          </Row>
        </Card.Body>
      </Card>

      <BrewSection
        title="Active Brews"
        brews={activeBrews}
        emptyMessage="You don't currently have any active brews."
      />

      <BrewSection
        title="Completed Brews"
        brews={completedBrews}
        emptyMessage="Completed brews will appear here."
      />

      <section className="mb-5 text-start">
        <h2 className="mb-3">Favourites</h2>
        <Card body className="text-muted">
          Favourite brews will appear here in a future update.
        </Card>
      </section>
    </Container>
  );
}

export default ProfilePage;
