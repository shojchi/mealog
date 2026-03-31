import type { Meal } from "../../types";

/**
 * Snack seed meals (15 items)
 *
 * Nutrition values are per-serving and cross-referenced with USDA FoodData Central.
 * All meals have servings >= 2.
 */
export const snackSeeds: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  // === EXISTING (updated to 2 servings, USDA-adjusted) ===
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
        quantity: 300,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Mixed berries",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Honey",
        quantity: 2,
        unit: "tsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 200,
      protein: 15,
      carbs: 26,
      fat: 5,
      calcium: 20,
      vitaminC: 15,
    },
    mealType: "snack",
    labels: ["quick", "high-protein", "vegetarian"],
    servings: 2,
  },
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
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Almond butter",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 250,
      protein: 7,
      carbs: 30,
      fat: 14,
      fiber: 6,
      vitaminC: 10,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free"],
    servings: 2,
  },
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
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Carrots",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cucumber",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 185,
      protein: 7,
      carbs: 22,
      fat: 8,
      fiber: 7,
      vitaminC: 90,
      iron: 10,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free"],
    servings: 2,
  },

  // === NEW MEALS ===
  {
    name: "Trail Mix",
    description:
      "Homemade trail mix with almonds, cashews, dark chocolate chips, and dried cranberries",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix all ingredients together. Store in airtight container. Portion into individual servings.",
    },
    ingredients: [
      {
        name: "Almonds",
        quantity: 60,
        unit: "g",
        category: "other",
      },
      {
        name: "Cashews",
        quantity: 40,
        unit: "g",
        category: "other",
      },
      {
        name: "Dark chocolate chips",
        quantity: 40,
        unit: "g",
        category: "other",
      },
      {
        name: "Dried cranberries",
        quantity: 40,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 28,
      fat: 18,
      fiber: 4,
      iron: 10,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free", "dairy-free"],
    servings: 3,
  },
  {
    name: "Caprese Skewers",
    description:
      "Cherry tomato and mozzarella skewers with fresh basil and balsamic drizzle",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Thread cherry tomatoes, mozzarella balls, and basil leaves onto skewers. Drizzle with balsamic glaze.",
    },
    ingredients: [
      {
        name: "Cherry tomatoes",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Fresh mozzarella balls",
        quantity: 150,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Fresh basil",
        quantity: 10,
        unit: "g",
        category: "produce",
      },
      {
        name: "Balsamic glaze",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 180,
      protein: 12,
      carbs: 10,
      fat: 12,
      calcium: 25,
      vitaminC: 20,
    },
    mealType: "snack",
    labels: ["quick", "vegetarian", "gluten-free"],
    servings: 2,
  },
  {
    name: "Energy Balls",
    description:
      "No-bake energy balls with oats, peanut butter, honey, chocolate chips, and flax seeds",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix oats, peanut butter, honey, chocolate chips, and flax seeds. Roll into balls. Refrigerate 30 minutes before serving.",
    },
    ingredients: [
      {
        name: "Rolled oats",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Peanut butter",
        quantity: 80,
        unit: "g",
        category: "other",
      },
      {
        name: "Honey",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Mini chocolate chips",
        quantity: 40,
        unit: "g",
        category: "other",
      },
      {
        name: "Flax seeds",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 200,
      protein: 7,
      carbs: 26,
      fat: 9,
      fiber: 3,
    },
    mealType: "snack",
    labels: ["vegetarian"],
    servings: 6,
  },
  {
    name: "Edamame with Sea Salt",
    description:
      "Steamed edamame pods sprinkled with flaky sea salt and a squeeze of lemon",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1564834724105-918b73d1b8e0?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Boil or steam edamame for 5 minutes. Drain and toss with sea salt and lemon juice.",
    },
    ingredients: [
      {
        name: "Edamame (in pods)",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Sea salt",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Lemon",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 140,
      protein: 12,
      carbs: 10,
      fat: 6,
      fiber: 5,
      iron: 15,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Guacamole with Tortilla Chips",
    description:
      "Fresh guacamole with ripe avocados, lime, cilantro, and baked tortilla chips",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mash avocados with lime juice, diced onion, tomato, cilantro, and salt. Serve with chips.",
    },
    ingredients: [
      {
        name: "Avocado",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Lime",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Tomato",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Tortilla chips",
        quantity: 60,
        unit: "g",
        category: "grains",
      },
      {
        name: "Red onion",
        quantity: 30,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 280,
      protein: 4,
      carbs: 26,
      fat: 20,
      fiber: 10,
      vitaminC: 20,
    },
    mealType: "snack",
    labels: ["vegan", "gluten-free", "dairy-free"],
    servings: 3,
  },
  {
    name: "Banana with Peanut Butter",
    description:
      "Sliced banana topped with natural peanut butter and a sprinkle of chia seeds",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Slice bananas. Spread or drizzle peanut butter over slices. Sprinkle with chia seeds.",
    },
    ingredients: [
      {
        name: "Banana",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Peanut butter",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Chia seeds",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 260,
      protein: 9,
      carbs: 34,
      fat: 12,
      fiber: 5,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Rice Cakes with Avocado",
    description:
      "Crispy rice cakes topped with mashed avocado, everything bagel seasoning, and cherry tomatoes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mash avocado and spread on rice cakes. Top with sliced cherry tomatoes and everything bagel seasoning.",
    },
    ingredients: [
      {
        name: "Rice cakes",
        quantity: 4,
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
        name: "Cherry tomatoes",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Everything bagel seasoning",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 190,
      protein: 4,
      carbs: 24,
      fat: 10,
      fiber: 5,
      vitaminC: 10,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Cheese and Crackers",
    description:
      "Assorted cheese slices with whole grain crackers, grapes, and walnuts",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Arrange cheese slices and crackers on a plate. Add clusters of grapes and a handful of walnuts.",
    },
    ingredients: [
      {
        name: "Cheddar cheese",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Whole grain crackers",
        quantity: 50,
        unit: "g",
        category: "grains",
      },
      {
        name: "Grapes",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Walnuts",
        quantity: 20,
        unit: "g",
        category: "other",
      },
    ],
    nutrition: {
      calories: 310,
      protein: 12,
      carbs: 26,
      fat: 20,
      calcium: 25,
    },
    mealType: "snack",
    labels: ["quick", "vegetarian"],
    servings: 2,
  },
  {
    name: "Protein Bar Bites",
    description:
      "Homemade protein bites with dates, protein powder, oats, and dark chocolate",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Process dates in food processor. Mix with protein powder, oats, and melted dark chocolate. Roll into balls and refrigerate.",
    },
    ingredients: [
      {
        name: "Medjool dates",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Protein powder",
        quantity: 40,
        unit: "g",
        category: "other",
      },
      {
        name: "Rolled oats",
        quantity: 50,
        unit: "g",
        category: "grains",
      },
      {
        name: "Dark chocolate",
        quantity: 40,
        unit: "g",
        category: "other",
      },
    ],
    nutrition: {
      calories: 180,
      protein: 10,
      carbs: 28,
      fat: 5,
      fiber: 3,
      iron: 8,
    },
    mealType: "snack",
    labels: ["high-protein", "vegetarian"],
    servings: 6,
  },
  {
    name: "Roasted Chickpeas",
    description:
      "Crunchy oven-roasted chickpeas seasoned with smoked paprika, cumin, and garlic powder",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Drain and dry chickpeas. Toss with olive oil and spices. Roast at 425°F for 25-30 minutes until crispy.",
    },
    ingredients: [
      {
        name: "Chickpeas",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Olive oil",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Smoked paprika",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Cumin",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 180,
      protein: 10,
      carbs: 26,
      fat: 5,
      fiber: 8,
      iron: 20,
    },
    mealType: "snack",
    labels: ["vegan", "gluten-free", "dairy-free"],
    servings: 3,
  },
  {
    name: "Frozen Yogurt Bark",
    description:
      "Greek yogurt spread thin, topped with berries, nuts, and honey, then frozen and broken into pieces",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Spread yogurt on parchment-lined baking sheet. Top with berries, nuts, and honey. Freeze 3 hours. Break into pieces.",
    },
    ingredients: [
      {
        name: "Greek yogurt",
        quantity: 400,
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
        name: "Almonds",
        quantity: 30,
        unit: "g",
        category: "other",
      },
      {
        name: "Honey",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 160,
      protein: 12,
      carbs: 20,
      fat: 5,
      calcium: 18,
      vitaminC: 10,
    },
    mealType: "snack",
    labels: ["vegetarian", "gluten-free"],
    servings: 4,
  },
  {
    name: "Stuffed Medjool Dates",
    description:
      "Medjool dates stuffed with almond butter and topped with a sprinkle of sea salt and coconut flakes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Pit dates and fill with almond butter. Top with a pinch of sea salt and toasted coconut flakes.",
    },
    ingredients: [
      {
        name: "Medjool dates",
        quantity: 8,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Almond butter",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Coconut flakes",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Sea salt",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 200,
      protein: 4,
      carbs: 34,
      fat: 8,
      fiber: 4,
      iron: 5,
    },
    mealType: "snack",
    labels: ["quick", "vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
];
