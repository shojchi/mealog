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
        category: "grains",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Everything bagel seasoning",
        quantity: 1,
        unit: "tsp",
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
  },

  // BREAKFAST 2
  {
    name: "Overnight Oats with Banana",
    description:
      "Creamy overnight oats with sliced banana, chia seeds, cinnamon, and a drizzle of maple syrup",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix oats with milk and chia seeds. Refrigerate overnight. Top with banana and maple syrup in the morning.",
    },
    ingredients: [
      {
        name: "Rolled oats",
        quantity: 50,
        unit: "g",
        category: "grains",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Chia seeds",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Banana",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Maple syrup",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 55,
      fat: 8,
      fiber: 8,
      calcium: 25,
    },
    mealType: "breakfast",
    labels: ["quick", "vegetarian"],
    servings: 1,
  },

  // BREAKFAST 3
  {
    name: "Veggie Scramble with Toast",
    description:
      "Fluffy scrambled eggs with bell peppers, mushrooms, spinach, and whole wheat toast",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté vegetables until tender. Add beaten eggs and scramble. Serve with toasted bread.",
    },
    ingredients: [
      {
        name: "Eggs",
        quantity: 3,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Bell pepper",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Mushrooms",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Spinach",
        quantity: 30,
        unit: "g",
        category: "produce",
      },
      {
        name: "Whole wheat bread",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 340,
      protein: 22,
      carbs: 32,
      fat: 15,
      iron: 25,
      vitaminD: 10,
    },
    mealType: "breakfast",
    labels: ["high-protein", "vegetarian"],
    servings: 1,
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
        category: "grains",
      },
      {
        name: "Chicken breast",
        quantity: 150,
        unit: "g",
        category: "meat",
      },
      {
        name: "Mixed greens",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cucumber",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Lemon",
        quantity: 1,
        unit: "pcs",
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
  },

  // LUNCH 2
  {
    name: "Mediterranean Wrap",
    description:
      "Whole wheat wrap filled with hummus, feta cheese, cucumbers, tomatoes, red onion, and mixed greens",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Spread hummus on wrap. Layer vegetables and feta. Roll tightly and cut in half.",
    },
    ingredients: [
      {
        name: "Whole wheat tortilla",
        quantity: 1,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Hummus",
        quantity: 60,
        unit: "g",
        category: "other",
      },
      {
        name: "Feta cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Cucumber",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Tomatoes",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Mixed greens",
        quantity: 30,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 48,
      fat: 16,
      calcium: 18,
      iron: 12,
    },
    mealType: "lunch",
    labels: ["quick", "vegetarian"],
    servings: 1,
  },

  // LUNCH 3
  {
    name: "Thai Peanut Noodles",
    description:
      "Rice noodles tossed with vegetables, peanut sauce, and topped with crushed peanuts and cilantro",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400",
    },
    recipe: {
      type: "url",
      content: "https://www.example.com/thai-peanut-noodles",
    },
    ingredients: [
      {
        name: "Rice noodles",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Peanut butter",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Bell pepper",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Carrots",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Edamame",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
      {
        name: "Peanuts",
        quantity: 20,
        unit: "g",
        category: "other",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 16,
      carbs: 52,
      fat: 18,
      fiber: 6,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["vegan", "dairy-free"],
    servings: 1,
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
        category: "meat",
      },
      {
        name: "Asparagus",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Carrots",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Olive oil",
        quantity: 2,
        unit: "tbsp",
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
  },

  // DINNER 2
  {
    name: "Chicken Stir-Fry with Brown Rice",
    description:
      "Tender chicken breast with colorful vegetables in a savory soy-ginger sauce, served over brown rice",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook brown rice. Stir-fry chicken until golden. Add vegetables and sauce. Simmer until vegetables are tender-crisp.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 150,
        unit: "g",
        category: "meat",
      },
      {
        name: "Brown rice",
        quantity: 80,
        unit: "g",
        category: "grains",
      },
      {
        name: "Broccoli",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Snap peas",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
      {
        name: "Soy sauce",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 38,
      carbs: 58,
      fat: 10,
      iron: 18,
      vitaminC: 120,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 1,
  },

  // DINNER 3
  {
    name: "Lentil Curry with Naan",
    description:
      "Creamy red lentil curry with coconut milk, tomatoes, and Indian spices, served with warm naan bread",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    },
    recipe: {
      type: "url",
      content: "https://www.example.com/lentil-curry-recipe",
    },
    ingredients: [
      {
        name: "Red lentils",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Coconut milk",
        quantity: 150,
        unit: "ml",
        category: "other",
      },
      {
        name: "Tomatoes",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Onion",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Curry powder",
        quantity: 2,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Naan bread",
        quantity: 1,
        unit: "pcs",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 24,
      carbs: 72,
      fat: 16,
      fiber: 18,
      iron: 35,
    },
    mealType: "dinner",
    labels: ["vegan", "dairy-free"],
    servings: 1,
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
        category: "dairy",
      },
      {
        name: "Mixed berries",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Honey",
        quantity: 1,
        unit: "tsp",
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
        category: "produce",
      },
      {
        name: "Almond butter",
        quantity: 2,
        unit: "tbsp",
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
        category: "other",
      },
      {
        name: "Carrots",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cucumber",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 100,
        unit: "g",
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
