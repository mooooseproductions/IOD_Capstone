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
import { fetchFavourites, removeFavourite } from "../features/favouriteSlice";
import BrewSection from "../components/brewList";

const completedStatuses = new Set(["complete", "completed"]);

const formatDate = (date) => {
  if (!date) return "Not recorded";

  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

function ProfilePage() {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserProfile());
      dispatch(fetchFavourites());
    }
  }, [dispatch, accessToken]);


  const { user, brews, status, error } = useSelector((state) => state.profile);
  const { items:favourites, status:favouritesStatus, changingFavouriteId, error: favouriteError } = useSelector((state) => state.favourites);

  useEffect(() => {
    if (status === "idle") dispatch(fetchUserProfile());
  }, [dispatch, status]);

  useEffect(() => {
    if (favouritesStatus === "idle") dispatch(fetchFavourites());
  }, [dispatch, favouritesStatus]);

  if (status === "idle" || status === "loading") {
    return (
      <Container className="app-page text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Loading your profile...</p>
      </Container>
    );
  }

  if (status === "failed") {
    return <Container className="app-page"><Alert variant="danger">{error}</Alert></Container>;
  }

  const activeBrews = brews.filter(
    (brew) => !completedStatuses.has(brew.status?.toLowerCase())
  );
  const completedBrews = brews.filter(
    (brew) => completedStatuses.has(brew.status?.toLowerCase())
  );

  return (
    <main className="app-page">
      <Container className="profile-page">
        <span className="page-kicker">Your brewhouse</span>
        <Card className="profile-hero mb-5 text-start">
          <Card.Body>
            <Card.Title as="h1" className="mb-3">{user.name}</Card.Title>
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

        <section className="brew-list-section mb-5 text-start">
          <div className="section-heading d-flex align-items-center gap-2 mb-3">
            <h2 className="mb-0">Favourites</h2>
            <Badge bg="secondary" pill>{favourites.length}</Badge>
          </div>

          {favouriteError && <Alert variant="danger">{favouriteError}</Alert>}

          {favouritesStatus === "loading" ? (
            <Card body className="empty-state">Loading favourites...</Card>
          ) : favourites.length === 0 ? (
            <Card body className="empty-state">
              Brews saved from Search will appear here.
            </Card>
          ) : (
            <Row className="g-3">
              {favourites.map((favourite) => (
                <Col xs={12} md={6} xl={4} key={favourite.id}>
                  <Card className="brew-card-ui h-100 text-start">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{favourite.brew.name}</Card.Title>
                      <Card.Subtitle className="mb-3 text-muted">
                        {favourite.brew.style?.name ?? "No style"} · @{favourite.brew.user?.handle ?? "Unknown brewer"}
                      </Card.Subtitle>
                      <p className="mb-3">
                        {favourite.brew.batchSize} {favourite.brew.batchUnit}
                      </p>
                      <div className="d-flex gap-2 mt-auto">
                        <Button as={Link} to={`/brewing?source=${favourite.brewId}`}>
                          Brew This
                        </Button>
                        <Button
                          variant="outline-danger"
                          disabled={changingFavouriteId === favourite.brewId}
                          onClick={() => dispatch(removeFavourite(favourite.brewId))}
                        >
                          {changingFavouriteId === favourite.brewId ? "Removing..." : "Remove"}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </section>
      </Container>
    </main>
  );
}

export default ProfilePage;
