import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const normaliseName = (name: string): string => {
  return name.trim().toLowerCase();
};

const brewStyles = [
  "Australian Pale Ale",
  "New Zealand Pale Ale",
  "American Pale Ale",
  "India Pale Ale",
  "New England IPA",
  "Lager",
  "Pilsner",
  "Wheat Beer",
  "Amber Ale",
  "Brown Ale",
  "Golden Ale",
  "Bitter",
  "Porter",
  "Stout",
  "Saison",
  "Sour",
];

const ingredients = [
  // Extract brewing kits
  { name: "Coopers Australian Pale Ale", type: "Extract" },
  { name: "Coopers Lager", type: "Extract" },
  { name: "Mangrove Jacks Pilsner", type: "Extract" },
  { name: "Black Rock IPA", type: "Extract" },
  { name: "Brick Road Stout", type: "Extract" },
  { name: "Black Rock Wheat Beer", type: "Extract" },

  // Fermentables
  { name: "Light Liquid Malt Extract", type: "Fermentable" },
  { name: "Dark Liquid Malt Extract", type: "Fermentable" },
  { name: "Wheat Liquid Malt Extract", type: "Fermentable" },
  { name: "Light Dry Malt Extract", type: "Fermentable" },
  { name: "Dark Dry Malt Extract", type: "Fermentable" },
  { name: "Dextrose", type: "Fermentable" },
  { name: "Brewing Sugar", type: "Fermentable" },
  { name: "Table Sugar", type: "Fermentable" },
  { name: "Brown Sugar", type: "Fermentable" },
  { name: "Honey", type: "Fermentable" },
  { name: "Molasses", type: "Fermentable" },

  // Hops
  { name: "Nelson Sauvin", type: "Hop" },
  { name: "Motueka", type: "Hop" },
  { name: "Riwaka", type: "Hop" },
  { name: "Nectaron", type: "Hop" },
  { name: "Rakau", type: "Hop" },
  { name: "Wai-iti", type: "Hop" },
  { name: "Pacific Jade", type: "Hop" },
  { name: "Green Bullet", type: "Hop" },
  { name: "Cascade", type: "Hop" },
  { name: "Citra", type: "Hop" },
  { name: "Mosaic", type: "Hop" },
  { name: "Simcoe", type: "Hop" },
  { name: "Centennial", type: "Hop" },
  { name: "Amarillo", type: "Hop" },
  { name: "Galaxy", type: "Hop" },
  { name: "Falconer's Flight", type: "Hop" },

  // Yeast
  { name: "US-05", type: "Yeast" },
  { name: "S-04", type: "Yeast" },
  { name: "Nottingham Ale Yeast", type: "Yeast" },
  { name: "Windsor Ale Yeast", type: "Yeast" },
  { name: "K-97", type: "Yeast" },
  { name: "W-34/70", type: "Yeast" },
  { name: "S-23", type: "Yeast" },
  { name: "Verdant IPA Yeast", type: "Yeast" },
  { name: "Coopers Brewing Yeast", type: "Yeast" },

  // Adjuncts and additions
  { name: "Orange Peel", type: "Adjunct" },
  { name: "Coriander Seed", type: "Adjunct" },
  { name: "Coffee", type: "Adjunct" },
  { name: "Cocoa Nibs", type: "Adjunct" },
  { name: "Vanilla", type: "Adjunct" },
  { name: "Fruit", type: "Adjunct" },
  { name: "Oak Chips", type: "Adjunct" },
  { name: "Chilli", type: "Adjunct" },

  // Brewing aids
  { name: "Irish Moss", type: "Brewing Aid" },
  { name: "Whirlfloc", type: "Brewing Aid" },
  { name: "Gelatine", type: "Brewing Aid" },
  { name: "Yeast Nutrient", type: "Brewing Aid" },
  { name: "Glucoamylase", type: "Brewing Aid" },
];

async function seedBrewStyles() {
  console.log("Seeding brew styles...");

  for (const name of brewStyles) {
    const normalisedName = normaliseName(name);

    await prisma.brewStyle.upsert({
      where: {
        normalisedName,
      },
      update: {
        name,
      },
      create: {
        name,
        normalisedName,
      },
    });
  }

  console.log(`${brewStyles.length} brew styles processed`);
}

async function seedIngredients() {
  console.log("Seeding ingredients...");

  for (const ingredient of ingredients) {
    const normalisedName = normaliseName(ingredient.name);

    await prisma.ingredient.upsert({
      where: {
        normalisedName,
      },
      update: {
        name: ingredient.name,
        type: ingredient.type,
      },
      create: {
        name: ingredient.name,
        normalisedName,
        type: ingredient.type,
      },
    });
  }

  console.log(`${ingredients.length} ingredients processed`);
}

async function main() {
  console.log("Starting database seed...");

  await seedBrewStyles();
  await seedIngredients();

  console.log("Database seed completed successfully");
}

main()
  .catch((error) => {
    console.error("Database seed failed:");
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });