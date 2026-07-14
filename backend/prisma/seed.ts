import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Brew styles
  const brewStyles = [
    {
      name: "Australian Pale Ale",
      description: "Light-bodied pale ale with restrained bitterness",
    },
    {
      name: "New Zealand Pale Ale",
      description: "Pale ale featuring New Zealand hop varieties",
    },
    {
      name: "India Pale Ale",
      description: "Hop-forward ale with greater bitterness",
    },
    {
      name: "Stout",
      description: "Dark ale with roasted malt flavours",
    },
    {
      name: "Lager",
      description: "Clean and crisp lager style",
    },
  ];

  for (const style of brewStyles) {
    await prisma.brewStyle.upsert({
      where: { name: style.name },
      update: style,
      create: style,
    });
  }

  // Ingredient types
  const fermentableType = await prisma.ingredient.upsert({
    where: { name: "Fermentable" },
    update: {},
    create: { name: "Fermentable" },
  });

  const hopType = await prisma.ingredient.upsert({
    where: { name: "Hop" },
    update: {},
    create: { name: "Hop" },
  });

  const yeastType = await prisma.ingredient.upsert({
    where: { name: "Yeast" },
    update: {},
    create: { name: "Yeast" },
  });

  const adjunctType = await prisma.ingredient.upsert({
    where: { name: "Adjunct" },
    update: {},
    create: { name: "Adjunct" },
  });

  // Ingredients
  const ingredients = [
    {
      name: "Liquid Malt Extract",
      type: fermentableType.id,
    },
    {
      name: "Dry Malt Extract",
      ingredientTypeId: fermentableType.id,
    },
    {
      name: "Dextrose",
      ingredientTypeId: fermentableType.id,
    },
    {
      name: "Nelson Sauvin",
      ingredientTypeId: hopType.id,
    },
    {
      name: "Green Bullet",
      ingredientTypeId: hopType.id,
    },
    {
      name: "US-05",
      ingredientTypeId: yeastType.id,
    },
    {
      name: "Lactose",
      ingredientTypeId: adjunctType.id,
    },
  ];

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {
        ingredientTypeId: ingredient.ingredientTypeId,
      },
      create: ingredient,
    });
  }

  console.log("Starter data added successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });