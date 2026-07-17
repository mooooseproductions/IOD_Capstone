import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { searchBrews, setSearchQuery, setSearchType } from "../features/searchSlice";
import { fetchFavourites } from "../features/favouriteSlice";
import SearchResultCard from "../components/SearchResultCard";

function SearchPage() {
  const dispatch = useDispatch();
  const { items: favourites, status: favouritesStatus, changingFavouriteId } = useSelector((state) => state.favourites);
  const { searchType, query, results, searchStatus, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (favouritesStatus === "idle") dispatch(fetchFavourites());
  }, [dispatch, favouritesStatus]);

  const favouriteIds = new Set(favourites.map((item) => item.brewId));

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    dispatch(searchBrews({ type: searchType, query }));
  };

  return (
    <main className="app-page">
    <Container className="search-page">
      <div className="text-start mb-4">
        <span className="page-kicker">Community recipes</span>
        <h1 className="mb-2">Search Brews</h1>
        <p className="text-muted">
          Find community brews, save favourites, or use one as the starting point for your own batch.
        </p>
      </div>

      <Card className="search-panel mb-4 text-start">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-2 align-items-end">
              <Col xs={12} md={3}>
                <Form.Group>
                  <Form.Label>Search by</Form.Label>
                  <Form.Select
                    value={searchType}
                    onChange={(event) => dispatch(setSearchType(event.target.value))}
                  >
                    <option value="name">Brew name</option>
                    <option value="style">Style</option>
                    <option value="ingredient">Ingredient</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={7}>
                <Form.Group>
                  <Form.Label>Search text</Form.Label>
                  <Form.Control
                    value={query}
                    onChange={(event) => dispatch(setSearchQuery(event.target.value))}
                    placeholder="Enter a brew, style, or ingredient"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={2}>
                <Button className="bb-primary w-100" type="submit" disabled={!query.trim() || searchStatus === "loading"}>
                  {searchStatus === "loading" ? "Searching..." : "Search"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {searchStatus === "loading" && (
        <div className="py-5"><Spinner animation="border" /> Searching...</div>
      )}

      {searchStatus === "succeeded" && results.length === 0 && (
        <Alert variant="secondary">No matching brews found.</Alert>
      )}

      {results.length > 0 && (
        <section className="text-start">
          <h2 className="mb-3">Results <Badge bg="secondary" pill>{results.length}</Badge></h2>
          <Row className="g-3">
            {results.map((brew) => (
              <SearchResultCard
                key={brew.id}
                brew={brew}
                favourite={favouriteIds.has(brew.id)}
                changing={changingFavouriteId === brew.id}
              />
            ))}
          </Row>
        </section>
      )}
    </Container>
    </main>
  );
}

export default SearchPage;
