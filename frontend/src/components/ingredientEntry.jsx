import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
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

const amountUnits = ["g", "kg", "ml", "L", "tsp", "tbsp"];

function IngredientEntry({ section, title }) {
  const dispatch = useDispatch();
  const { ingredientDrafts, ingredients, availableIngredients, errors } = useSelector((state) => state.brew);
  const draft = ingredientDrafts[section];

  const types = [...new Set(availableIngredients.map((item) => item.type))]
    .filter(Boolean)
    .sort();

  const matchingNames = availableIngredients
    .filter((item) => !draft.type || item.type === draft.type)
    .map((item) => item.name)
    .sort();

  const sectionItems = ingredients.filter(
    (item) => item.timing === draft.timing
  );

  const changeDraft = (field, value) => {
    dispatch(setIngredientDraftField({ section, field, value }));
  };

  return (
    <section className="brew-section">
      <h2>{title}</h2>

      <Row className="g-2 align-items-end">
        <Col xs={12} md={3}>
          <Form.Group>
            <Form.Label>Ingredient type</Form.Label>
            <Form.Select
              value={draft.type}
              onChange={(event) => changeDraft("type", event.target.value)}
            >
              <option value="">Select type</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Ingredient name</Form.Label>
            <Form.Control
              type="text"
              list={`${section}-ingredient-names`}
              value={draft.name}
              disabled={!draft.type}
              placeholder={draft.type ? "Select or enter a name" : "Select a type first"}
              onChange={(event) => changeDraft("name", event.target.value)}
            />
            <datalist id={`${section}-ingredient-names`}>
              {matchingNames.map((name) => <option key={name} value={name} />)}
            </datalist>
          </Form.Group>
        </Col>

        <Col xs={7} md={2}>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="any"
              value={draft.amount}
              onChange={(event) => changeDraft("amount", event.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={5} md={2}>
          <Form.Group>
            <Form.Label>Unit</Form.Label>
            <Form.Select
              value={draft.unit}
              onChange={(event) => changeDraft("unit", event.target.value)}
            >
              {amountUnits.map((unit) => <option key={unit}>{unit}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={1}>
          <Button
            className="w-100"
            type="button"
            onClick={() => dispatch(addIngredient({
              section,
              clientId: crypto.randomUUID(),
            }))}
          >
            Add
          </Button>
        </Col>
      </Row>

      {errors[`${section}Ingredient`] && (
        <div className="text-danger small mt-2">
          {errors[`${section}Ingredient`]}
        </div>
      )}

      {sectionItems.length > 0 && (
        <Table responsive hover className="ingredient-table mt-3">
          <thead>
            <tr>
              <th>Type</th><th>Name</th><th>Amount</th><th></th>
            </tr>
          </thead>
          <tbody>
            {sectionItems.map((item) => (
              <tr key={item.clientId}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>{item.amount} {item.unit}</td>
                <td className="text-end">
                  <Button
                    size="sm"
                    variant="outline-danger"
                    type="button"
                    onClick={() => dispatch(removeIngredient(item.clientId))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
}

export default IngredientEntry;