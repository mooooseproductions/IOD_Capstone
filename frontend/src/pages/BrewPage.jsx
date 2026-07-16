import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  fetchBrewReferenceData,
  removeIngredient,
  setBrewErrors,
  setBrewField,
  setIngredientDraftField,
  submitBrew,
  fetchBrewById,
  fetchBrewTemplate,
  resetBrewForm,
} from "../features/brewSlice";
import { useParams, useSearchParams } from "react-router";
import IngredientEntry from "../components/ingredientEntry";

const batchUnits = ["L", "gal"];
const statuses = ["planning", "brewing", "fermenting", "conditioning", "complete"];

function BrewPage() {
  const { brewId } = useParams();
  const [searchParams] = useSearchParams();
  const sourceBrewId = searchParams.get("source");
  const editing = Boolean(brewId);
  const copying = Boolean(sourceBrewId) && !editing;

  const dispatch = useDispatch();
  const {
    formData,
    ingredients,
    styles,
    referenceStatus,
    loadStatus,
    submitStatus,
    message,
    errors,
  } = useSelector((state) => state.brew);

  useEffect(() => {
    if (referenceStatus === "idle") {
      dispatch(fetchBrewReferenceData());
    }
  }, [dispatch, referenceStatus]);

  useEffect(() => {
    if (brewId) {
      dispatch(fetchBrewById(Number(brewId)));
    } else if (sourceBrewId) {
      dispatch(fetchBrewTemplate(Number(sourceBrewId)));
    } else {
      dispatch(resetBrewForm());
    }
  }, [brewId, sourceBrewId, dispatch]);

  const styleNames = styles
    .map((style) => typeof style === "string" ? style : style.name)
    .filter(Boolean)
    .sort();

  const handleChange = (event) => {
    dispatch(setBrewField({ field: event.target.name, value: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Brew name is required.";
    if (!formData.style.trim()) nextErrors.style = "Style is required.";
    if (!formData.batchSize || Number(formData.batchSize) <= 0) {
      nextErrors.batchSize = "Enter a valid batch size.";
    }

    if (Object.keys(nextErrors).length > 0) {
      dispatch(setBrewErrors(nextErrors));
      return;
    }

    dispatch(submitBrew({ brewId: brewId ? Number(brewId) : null, formData, ingredients, styles }));
  };

  const calculatedAbv =
    formData.originalGravity && formData.finalGravity
      ? (
        (Number(formData.originalGravity) -
          Number(formData.finalGravity)) *
        131.25
      ).toFixed(2)
      : "";

  return (
    <main className="app-page">
    <Container className="brew-page">
      <Card className="brew-card">
        <Card.Body>
          <span className="page-kicker">Batch workspace</span>
          <h1>
            {editing ? "Update Brew" : copying ? "Brew This Recipe" : "Add a Brew"}
          </h1>

          {message && (
            <Alert variant={submitStatus === "succeeded" ? "success" : loadStatus === "succeeded" ? "info" : "danger"}>
              {message}
            </Alert>
          )}
          {errors.user && <Alert variant="warning">{errors.user}</Alert>}

          {referenceStatus === "loading" ? (
            <div className="py-5"><Spinner animation="border" /> Loading brew options...</div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <section className="brew-section brew-summary">
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Brew name</Form.Label>
                      <Form.Control name="name" value={formData.name} onChange={handleChange} isInvalid={Boolean(errors.name)} />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Style</Form.Label>
                      <Form.Control name="style" list="brew-styles" value={formData.style} onChange={handleChange} placeholder="Select or enter a style" isInvalid={Boolean(errors.style)} />
                      <datalist id="brew-styles">{styleNames.map((name) => <option key={name} value={name} />)}</datalist>
                      <Form.Control.Feedback type="invalid">{errors.style}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={8} md={3}>
                    <Form.Group>
                      <Form.Label>Batch size</Form.Label>
                      <Form.Control type="number" min="0" step="any" name="batchSize" value={formData.batchSize} onChange={handleChange} isInvalid={Boolean(errors.batchSize)} />
                      <Form.Control.Feedback type="invalid">{errors.batchSize}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={2}>
                    <Form.Group>
                      <Form.Label>Unit</Form.Label>
                      <Form.Select name="batchUnit" value={formData.batchUnit} onChange={handleChange}>{batchUnits.map((unit) => <option key={unit}>{unit}</option>)}</Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" value={formData.status} onChange={handleChange}>{statuses.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Label>Original gravity</Form.Label>
                      <Form.Control type="number" step="0.001" name="originalGravity" value={formData.originalGravity} onChange={handleChange} placeholder="1.050" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group><Form.Label>Final gravity</Form.Label><Form.Control type="number" step="0.001" name="finalGravity" value={formData.finalGravity} onChange={handleChange} placeholder="1.010" /></Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Label>ABV %</Form.Label>

                      <Form.Control
                        type="text"
                        value={calculatedAbv}
                        placeholder="Calculated automatically"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={8} md={2}>
                    <Form.Group><Form.Label>Temperature</Form.Label><Form.Control type="number" step="1" name="temperature" value={formData.temperature} onChange={handleChange} /></Form.Group>
                  </Col>
                  <Col xs={4} md={1}>
                    <Form.Group><Form.Label>Unit</Form.Label><Form.Select name="temperatureUnit" value={formData.temperatureUnit} onChange={handleChange}><option value="C">°C</option><option value="F">°F</option></Form.Select></Form.Group>
                  </Col>
                </Row>
              </section>

              <IngredientEntry section="base" title="Base Ingredients" />
              <IngredientEntry section="postWort" title="Post-Wort Additions" />
              {errors.ingredients && <Alert variant="warning">{errors.ingredients}</Alert>}

              <section className="brew-section">
                <h2>Notes</h2>
                <Form.Control as="textarea" rows={5} name="notes" value={formData.notes} onChange={handleChange} />
              </section>

              <div className="d-flex justify-content-end">
                <Button className="bb-primary" type="submit">
                  {submitStatus === "loading"
                    ? "Saving..."
                    : editing
                      ? "Update Brew"
                      : "Save Brew"}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
    </main>
  );
}

export default BrewPage;
