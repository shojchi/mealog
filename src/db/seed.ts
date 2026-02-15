import { db } from "./database";
import type { Meal } from "../types";

/**
 * Seed data - Initial meal catalog for MVP
 *
 * 7 meals (one per day) + 3 snack options
 */
export const seedMeals: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  // BREAKFAST
  {
    name: "Avocado Toast with Poached Egg",
    description:
      "Whole grain toast topped with mashed avocado, poached egg, and everything bagel seasoning",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Toast bread. Mash avocado with salt and pepper. Poach egg. Assemble and top with seasoning.",
    },
    ingredients: [
      {
        name: "Whole grain bread",
        quantity: 2,
        unit: "pcs",
        pricePerUnit: 0.5,
        category: "grains",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        pricePerUnit: 2,
        category: "produce",
      },
      {
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        pricePerUnit: 0.3,
        category: "dairy",
      },
      {
        name: "Everything bagel seasoning",
        quantity: 1,
        unit: "tsp",
        pricePerUnit: 0.1,
        category: "spices",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 15,
      carbs: 40,
      fat: 18,
      vitaminD: 15,
      iron: 20,
    },
    mealType: "breakfast",
    labels: ["quick", "high-protein", "vegetarian"],
    servings: 1,
    totalPrice: 3.2,
  },

  // LUNCH
  {
    name: "Quinoa Salad with Grilled Chicken",
    description:
      "Mixed greens with quinoa, grilled chicken, cherry tomatoes, cucumber, and lemon vinaigrette",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    },
    recipe: {
      type: "url",
      content: "https://www.example.com/quinoa-salad-recipe",
    },
    ingredients: [
      {
        name: "Quinoa",
        quantity: 100,
        unit: "g",
        pricePerUnit: 8,
        category: "grains",
      },
      {
        name: "Chicken breast",
        quantity: 150,
        unit: "g",
        pricePerUnit: 12,
        category: "meat",
      },
      {
        name: "Mixed greens",
        quantity: 50,
        unit: "g",
        pricePerUnit: 6,
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 100,
        unit: "g",
        pricePerUnit: 4,
        category: "produce",
      },
      {
        name: "Cucumber",
        quantity: 50,
        unit: "g",
        pricePerUnit: 2,
        category: "produce",
      },
      {
        name: "Lemon",
        quantity: 1,
        unit: "pcs",
        pricePerUnit: 0.5,
        category: "produce",
      },
    ],
    nutrition: {
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 15,
      vitaminC: 25,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "gluten-free"],
    servings: 1,
    totalPrice: 5.8,
  },

  // DINNER
  {
    name: "Baked Salmon with Roasted Vegetables",
    description:
      "Herb-crusted salmon with roasted asparagus, carrots, and cherry tomatoes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Season salmon with herbs. Roast at 400°F for 12-15 minutes. Toss vegetables in olive oil and roast for 20 minutes.",
    },
    ingredients: [
      {
        name: "Salmon fillet",
        quantity: 200,
        unit: "g",
        pricePerUnit: 20,
        category: "meat",
      },
      {
        name: "Asparagus",
        quantity: 150,
        unit: "g",
        pricePerUnit: 8,
        category: "produce",
      },
      {
        name: "Carrots",
        quantity: 100,
        unit: "g",
        pricePerUnit: 2,
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 100,
        unit: "g",
        pricePerUnit: 4,
        category: "produce",
      },
      {
        name: "Olive oil",
        quantity: 2,
        unit: "tbsp",
        pricePerUnit: 0.3,
        category: "other",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 42,
      carbs: 30,
      fat: 28,
      vitaminD: 80,
      iron: 15,
      vitaminC: 30,
    },
    mealType: "dinner",
    labels: ["high-protein", "gluten-free", "dairy-free"],
    servings: 1,
    totalPrice: 7.4,
  },

  // SNACK 1
  {
    name: "Greek Yogurt with Berries",
    description:
      "Plain Greek yogurt topped with mixed berries and a drizzle of honey",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    },
    recipe: {
      type: "text",
      content: "Combine yogurt with berries and drizzle honey on top.",
    },
    ingredients: [
      {
        name: "Greek yogurt",
        quantity: 150,
        unit: "g",
        pricePerUnit: 8,
        category: "dairy",
      },
      {
        name: "Mixed berries",
        quantity: 100,
        unit: "g",
        pricePerUnit: 10,
        category: "produce",
      },
      {
        name: "Honey",
        quantity: 1,
        unit: "tsp",
        pricePerUnit: 0.2,
        category: "other",
      },
    ],
    nutrition: {
      calories: 200,
      protein: 15,
      carbs: 25,
      fat: 5,
      calcium: 20,
      vitaminC: 15,
    },
    mealType: "snack",
    labels: ["quick", "high-protein", "vegetarian"],
    servings: 1,
    totalPrice: 2.4,
  },

  // SNACK 2
  {
    name: "Apple Slices with Almond Butter",
    description: "Fresh apple slices served with natural almond butter",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
    },
    recipe: {
      type: "text",
      content: "Slice apple and serve with almond butter for dipping.",
    },
    ingredients: [
      {
        name: "Apple",
        quantity: 1,
        unit: "pcs",
        pricePerUnit: 0.8,
        category: "produce",
      },
      {
        name: "Almond butter",
        quantity: 2,
        unit: "tbsp",
        pricePerUnit: 1.5,
        category: "other",
      },
    ],
    nutrition: {
      calories: 250,
      protein: 6,
      carbs: 30,
      fat: 14,
      fiber: 6,
      vitaminC: 10,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free"],
    servings: 1,
    totalPrice: 2.3,
  },

  // SNACK 3
  {
    name: "Hummus with Veggie Sticks",
    description:
      "Homemade hummus with carrot, cucumber, and bell pepper sticks",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=400",
    },
    recipe: {
      type: "url",
      content: "https://www.example.com/hummus-recipe",
    },
    ingredients: [
      {
        name: "Hummus",
        quantity: 100,
        unit: "g",
        pricePerUnit: 6,
        category: "other",
      },
      {
        name: "Carrots",
        quantity: 100,
        unit: "g",
        pricePerUnit: 2,
        category: "produce",
      },
      {
        name: "Cucumber",
        quantity: 100,
        unit: "g",
        pricePerUnit: 2,
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 100,
        unit: "g",
        pricePerUnit: 4,
        category: "produce",
      },
    ],
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 22,
      fat: 8,
      fiber: 7,
      vitaminC: 90,
      iron: 10,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free"],
    servings: 1,
    totalPrice: 2.2,
  },
];

/**
 * Populate database with seed data
 */
export async function seedDatabase() {
  const count = await db.meals.count();

  // Only seed if database is empty
  if (count === 0) {
    const mealsWithTimestamps = seedMeals.map((meal) => ({
      ...meal,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.meals.bulkAdd(mealsWithTimestamps);
    console.log(`✅ Seeded ${mealsWithTimestamps.length} meals to database`);
  } else {
    console.log(`ℹ️ Database already contains ${count} meals, skipping seed`);
  }
}
