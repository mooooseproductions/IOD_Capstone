import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { BrewRepo } from "../../repositories/brewRepo";
import { BrewService } from "../brewServices";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("BrewService.addBrew", () => {
  it("passes the user and brew data to the repository and returns the new brew ID", async () => {
    const userId = 7;
    const brew = {
      name: "Nelson Pale Ale",
      status: "planning",
      batchSize: 23,
      batchUnit: "L",
      ingredients: [],
      notes: [],
    };

    const addBrewSpy = jest
      .spyOn(BrewRepo, "addBrew")
      .mockResolvedValue({ id: 42 } as never);

    const result = await BrewService.addBrew(userId, brew);

    expect(addBrewSpy).toHaveBeenCalledTimes(1);
    expect(addBrewSpy).toHaveBeenCalledWith(userId, brew);
    expect(result).toBe(42);
  });

  it("passes repository errors back to the caller", async () => {
    jest
      .spyOn(BrewRepo, "addBrew")
      .mockRejectedValue(new Error("Unable to save brew"));

    await expect(BrewService.addBrew(7, {})).rejects.toThrow(
      "Unable to save brew"
    );
  });
});

describe("BrewService.getBrewById", () => {
  it("passes the brew and user IDs to the repository and returns the brew", async () => {
    const brew = { id: 12, name: "Existing Pale Ale" };
    const getBrewSpy = jest
      .spyOn(BrewRepo, "getBrewById")
      .mockResolvedValue(brew as never);

    const result = await BrewService.getBrewById(12, 7);

    expect(getBrewSpy).toHaveBeenCalledTimes(1);
    expect(getBrewSpy).toHaveBeenCalledWith(12, 7);
    expect(result).toBe(brew);
  });

  it("passes repository errors back to the caller", async () => {
    jest
      .spyOn(BrewRepo, "getBrewById")
      .mockRejectedValue(new Error("Brew not found"));

    await expect(BrewService.getBrewById(12, 7)).rejects.toThrow(
      "Brew not found"
    );
  });
});

describe("BrewService.getBrewTemplate", () => {
  it("passes the brew ID to the repository and returns the template", async () => {
    const template = { id: 18, name: "Shared Stout" };
    const getTemplateSpy = jest
      .spyOn(BrewRepo, "getBrewTemplate")
      .mockResolvedValue(template as never);

    const result = await BrewService.getBrewTemplate(18);

    expect(getTemplateSpy).toHaveBeenCalledTimes(1);
    expect(getTemplateSpy).toHaveBeenCalledWith(18);
    expect(result).toBe(template);
  });

  it("passes repository errors back to the caller", async () => {
    jest
      .spyOn(BrewRepo, "getBrewTemplate")
      .mockRejectedValue(new Error("Template not found"));

    await expect(BrewService.getBrewTemplate(18)).rejects.toThrow(
      "Template not found"
    );
  });
});

describe("BrewService.updateBrew", () => {
  it("passes the brew ID, user ID, and changes to the repository", async () => {
    const changes = {
      name: "Updated Pale Ale",
      status: "complete",
    };
    const updatedBrew = { id: 12, ...changes };
    const updateBrewSpy = jest
      .spyOn(BrewRepo, "updateBrew")
      .mockResolvedValue(updatedBrew as never);

    const result = await BrewService.updateBrew(12, 7, changes);

    expect(updateBrewSpy).toHaveBeenCalledTimes(1);
    expect(updateBrewSpy).toHaveBeenCalledWith(12, 7, changes);
    expect(result).toBe(updatedBrew);
  });

  it("passes repository errors back to the caller", async () => {
    jest
      .spyOn(BrewRepo, "updateBrew")
      .mockRejectedValue(new Error("Unable to update brew"));

    await expect(BrewService.updateBrew(12, 7, {})).rejects.toThrow(
      "Unable to update brew"
    );
  });
});

describe("BrewService.searchBrews", () => {
  it("passes the search values to the repository and converts results to DTOs", async () => {
    const repositoryResult = {
      id: 21,
      name: "Nelson Summer Ale",
      status: "planning",
      batchSize: 23,
      batchUnit: "L",
      originalGravity: null,
      finalGravity: null,
      style: {
        id: 4,
        name: "New Zealand Pale Ale",
        normalisedName: "new zealand pale ale",
      },
      user: {
        id: 7,
        handle: "HopHead",
      },
      ingredient: [
        {
          timing: "dry hop",
          amount: 50,
          unit: "g",
          ingredient: {
            id: 9,
            name: "Nelson Sauvin",
            type: "Hops",
            normalisedName: "nelson sauvin",
          },
        },
      ],
    };
    const searchSpy = jest
      .spyOn(BrewRepo, "searchBrews")
      .mockResolvedValue([repositoryResult] as never);

    const result = await BrewService.searchBrews("ingredient", "Nelson");

    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith("ingredient", "Nelson");
    expect(result).toEqual([
      {
        id: 21,
        name: "Nelson Summer Ale",
        status: "planning",
        style: { name: "New Zealand Pale Ale" },
        user: { handle: "HopHead" },
        batchSize: 23,
        batchUnit: "L",
        ingredient: [
          {
            ingredient: {
              id: 9,
              name: "Nelson Sauvin",
            },
          },
        ],
      },
    ]);
  });

  it("returns an empty array when the repository finds no matching brews", async () => {
    jest.spyOn(BrewRepo, "searchBrews").mockResolvedValue([]);

    const result = await BrewService.searchBrews("name", "missing");

    expect(result).toEqual([]);
  });

  it("passes repository errors back to the caller", async () => {
    jest
      .spyOn(BrewRepo, "searchBrews")
      .mockRejectedValue(new Error("Unable to search brews"));

    await expect(BrewService.searchBrews("name", "ale")).rejects.toThrow(
      "Unable to search brews"
    );
  });
});