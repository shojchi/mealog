import type { Meal } from "../../types";

/**
 * Lunch seed meals (30 items)
 *
 * Nutrition values are per-serving and cross-referenced with USDA FoodData Central.
 * All meals have servings >= 2.
 */
export const lunchSeeds: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  // === EXISTING (updated to 2 servings, USDA-adjusted) ===
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
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Chicken breast",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Mixed greens",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 200,
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
        name: "Lemon",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 450,
      protein: 38,
      carbs: 42,
      fat: 14,
      vitaminC: 25,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "gluten-free"],
    servings: 2,
  },
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
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Hummus",
        quantity: 120,
        unit: "g",
        category: "other",
      },
      {
        name: "Feta cheese",
        quantity: 80,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Cucumber",
        quantity: 160,
        unit: "g",
        category: "produce",
      },
      {
        name: "Tomatoes",
        quantity: 160,
        unit: "g",
        category: "produce",
      },
      {
        name: "Mixed greens",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 385,
      protein: 14,
      carbs: 46,
      fat: 16,
      calcium: 18,
      iron: 12,
    },
    mealType: "lunch",
    labels: ["quick", "vegetarian"],
    servings: 2,
  },
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
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Peanut butter",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Bell pepper",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Carrots",
        quantity: 160,
        unit: "g",
        category: "produce",
      },
      {
        name: "Edamame",
        quantity: 120,
        unit: "g",
        category: "produce",
      },
      {
        name: "Peanuts",
        quantity: 40,
        unit: "g",
        category: "other",
      },
    ],
    nutrition: {
      calories: 425,
      protein: 16,
      carbs: 50,
      fat: 18,
      fiber: 6,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },

  // === NEW MEALS ===
  {
    name: "Caesar Salad with Grilled Chicken",
    description:
      "Classic Caesar salad with grilled chicken, parmesan crisps, croutons, and creamy dressing",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Grill chicken breast. Toss romaine with Caesar dressing and croutons. Slice chicken and place on top. Add shaved parmesan.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Romaine lettuce",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Parmesan cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Croutons",
        quantity: 40,
        unit: "g",
        category: "grains",
      },
      {
        name: "Caesar dressing",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 40,
      carbs: 18,
      fat: 22,
      calcium: 20,
      iron: 10,
    },
    mealType: "lunch",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "Turkey Club Sandwich",
    description:
      "Triple-decker sandwich with roasted turkey, bacon, lettuce, tomato, and mayo on sourdough",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Toast sourdough. Layer turkey, bacon, lettuce, tomato, and mayo. Stack three layers and secure with toothpicks.",
    },
    ingredients: [
      {
        name: "Sourdough bread",
        quantity: 6,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Turkey breast",
        quantity: 200,
        unit: "g",
        category: "meat",
      },
      {
        name: "Bacon",
        quantity: 4,
        unit: "pcs",
        category: "meat",
      },
      {
        name: "Lettuce",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Tomato",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Mayonnaise",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 35,
      carbs: 42,
      fat: 24,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "Minestrone Soup",
    description:
      "Hearty Italian vegetable soup with pasta, beans, tomatoes, and herbs",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté onion, carrot, celery. Add tomatoes, broth, beans, and pasta. Simmer 20 minutes until pasta is cooked.",
    },
    ingredients: [
      {
        name: "Cannellini beans",
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Ditalini pasta",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Canned tomatoes",
        quantity: 400,
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
        name: "Celery",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Zucchini",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 280,
      protein: 14,
      carbs: 48,
      fat: 4,
      fiber: 12,
      vitaminC: 30,
    },
    mealType: "lunch",
    labels: ["vegan", "dairy-free"],
    servings: 4,
  },
  {
    name: "Tuna Nicoise Salad",
    description:
      "Classic French salad with seared tuna, green beans, potatoes, eggs, olives, and Dijon vinaigrette",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sear tuna steaks. Boil potatoes, green beans, and eggs. Arrange on platter with olives and dress with vinaigrette.",
    },
    ingredients: [
      {
        name: "Tuna steak",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Baby potatoes",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Green beans",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Kalamata olives",
        quantity: 40,
        unit: "g",
        category: "other",
      },
      {
        name: "Dijon mustard",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 440,
      protein: 42,
      carbs: 28,
      fat: 18,
      iron: 20,
      vitaminD: 50,
    },
    mealType: "lunch",
    labels: ["high-protein", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Caprese Panini",
    description:
      "Pressed sandwich with fresh mozzarella, tomatoes, basil, and balsamic glaze on ciabatta",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Layer mozzarella, tomato, and basil on ciabatta. Drizzle with balsamic glaze and olive oil. Press in panini maker or pan.",
    },
    ingredients: [
      {
        name: "Ciabatta bread",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Fresh mozzarella",
        quantity: 150,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Tomatoes",
        quantity: 200,
        unit: "g",
        category: "produce",
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
      calories: 410,
      protein: 20,
      carbs: 42,
      fat: 18,
      calcium: 30,
    },
    mealType: "lunch",
    labels: ["quick", "vegetarian"],
    servings: 2,
  },
  {
    name: "Chicken Tikka Wrap",
    description:
      "Spiced yogurt-marinated chicken with lettuce, tomato, and mint raita in a flatbread",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Marinate chicken in yogurt and spices. Grill until charred. Wrap in flatbread with salad and raita.",
    },
    ingredients: [
      {
        name: "Chicken thigh",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Greek yogurt",
        quantity: 100,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Flatbread",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Lettuce",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
      {
        name: "Tomato",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Garam masala",
        quantity: 2,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 460,
      protein: 36,
      carbs: 38,
      fat: 18,
      iron: 15,
      calcium: 12,
    },
    mealType: "lunch",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "Black Bean Tacos",
    description:
      "Spiced black bean tacos with pickled onion, cilantro, avocado, and lime crema",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Season and warm black beans. Fill corn tortillas with beans, pickled onion, cilantro, avocado, and crema.",
    },
    ingredients: [
      {
        name: "Black beans",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Corn tortilla",
        quantity: 6,
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
        name: "Red onion",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
      {
        name: "Lime",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Sour cream",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 16,
      carbs: 52,
      fat: 14,
      fiber: 16,
      iron: 20,
    },
    mealType: "lunch",
    labels: ["vegetarian", "gluten-free"],
    servings: 2,
  },
  {
    name: "Miso Soup with Tofu",
    description:
      "Traditional Japanese miso soup with silken tofu, wakame seaweed, and scallions",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Heat dashi stock. Dissolve miso paste. Add cubed tofu and wakame. Garnish with scallions.",
    },
    ingredients: [
      {
        name: "Miso paste",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Silken tofu",
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Wakame seaweed",
        quantity: 5,
        unit: "g",
        category: "other",
      },
      {
        name: "Scallions",
        quantity: 30,
        unit: "g",
        category: "produce",
      },
      {
        name: "Dashi stock",
        quantity: 600,
        unit: "ml",
        category: "other",
      },
    ],
    nutrition: {
      calories: 120,
      protein: 10,
      carbs: 10,
      fat: 5,
      calcium: 15,
      iron: 12,
    },
    mealType: "lunch",
    labels: ["vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Falafel Bowl",
    description:
      "Crispy baked falafel over rice with hummus, pickled vegetables, tahini, and fresh herbs",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Form falafel from chickpea mixture, bake at 400°F for 25 min. Serve over rice with toppings.",
    },
    ingredients: [
      {
        name: "Chickpeas",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Brown rice",
        quantity: 150,
        unit: "g",
        category: "grains",
      },
      {
        name: "Hummus",
        quantity: 100,
        unit: "g",
        category: "other",
      },
      {
        name: "Tahini",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Cucumber",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Parsley",
        quantity: 20,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 20,
      carbs: 68,
      fat: 16,
      fiber: 14,
      iron: 25,
    },
    mealType: "lunch",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },
  {
    name: "Grilled Shrimp Salad",
    description:
      "Grilled shrimp over mixed greens with avocado, mango, and chili-lime dressing",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Season and grill shrimp. Toss greens with diced mango and avocado. Top with shrimp and chili-lime dressing.",
    },
    ingredients: [
      {
        name: "Shrimp",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Mixed greens",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Mango",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Lime",
        quantity: 2,
        unit: "pcs",
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
      calories: 340,
      protein: 32,
      carbs: 24,
      fat: 16,
      vitaminC: 50,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Spicy Tuna Poke Bowl",
    description:
      "Fresh ahi tuna over sushi rice with edamame, cucumber, avocado, and sriracha mayo",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cube tuna and marinate in soy and sesame oil. Cook sushi rice. Assemble bowl with toppings.",
    },
    ingredients: [
      {
        name: "Ahi tuna",
        quantity: 250,
        unit: "g",
        category: "meat",
      },
      {
        name: "Sushi rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Edamame",
        quantity: 80,
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
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
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
      calories: 460,
      protein: 38,
      carbs: 48,
      fat: 14,
      iron: 12,
      vitaminD: 35,
    },
    mealType: "lunch",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Lentil Soup",
    description:
      "Warm and hearty red lentil soup with carrots, cumin, and a squeeze of lemon",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté onion and garlic. Add lentils, carrots, cumin, and broth. Simmer 25 minutes. Blend partially and add lemon.",
    },
    ingredients: [
      {
        name: "Red lentils",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Carrots",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Onion",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Cumin",
        quantity: 2,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Vegetable broth",
        quantity: 600,
        unit: "ml",
        category: "other",
      },
      {
        name: "Lemon",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 260,
      protein: 18,
      carbs: 42,
      fat: 3,
      fiber: 16,
      iron: 30,
    },
    mealType: "lunch",
    labels: ["vegan", "gluten-free", "dairy-free"],
    servings: 4,
  },
  {
    name: "Chicken Quesadilla",
    description:
      "Crispy flour tortilla filled with shredded chicken, cheese, peppers, and served with sour cream",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Fill tortilla with chicken, cheese, and peppers. Cook on medium heat until tortilla is crispy and cheese melts. Cut into wedges.",
    },
    ingredients: [
      {
        name: "Flour tortilla",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Chicken breast",
        quantity: 200,
        unit: "g",
        category: "meat",
      },
      {
        name: "Cheddar cheese",
        quantity: 80,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Bell pepper",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Sour cream",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 490,
      protein: 34,
      carbs: 36,
      fat: 24,
      calcium: 25,
    },
    mealType: "lunch",
    labels: ["quick", "high-protein"],
    servings: 2,
  },
  {
    name: "Vietnamese Pho",
    description:
      "Aromatic beef pho with rice noodles, herbs, bean sprouts, and lime",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Simmer broth with star anise and cinnamon. Cook rice noodles. Serve with thinly sliced beef, herbs, and lime.",
    },
    ingredients: [
      {
        name: "Beef sirloin",
        quantity: 200,
        unit: "g",
        category: "meat",
      },
      {
        name: "Rice noodles",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Bean sprouts",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Thai basil",
        quantity: 10,
        unit: "g",
        category: "produce",
      },
      {
        name: "Lime",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Star anise",
        quantity: 2,
        unit: "pcs",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 410,
      protein: 30,
      carbs: 50,
      fat: 10,
      iron: 20,
      vitaminC: 10,
    },
    mealType: "lunch",
    labels: ["dairy-free", "gluten-free"],
    servings: 2,
  },
  {
    name: "Greek Salad with Grilled Halloumi",
    description:
      "Traditional Greek salad with grilled halloumi cheese, olives, and oregano dressing",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Grill halloumi slices until golden. Toss tomatoes, cucumber, onion, and olives with olive oil and oregano. Top with halloumi.",
    },
    ingredients: [
      {
        name: "Halloumi cheese",
        quantity: 200,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Tomatoes",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cucumber",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Red onion",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Kalamata olives",
        quantity: 50,
        unit: "g",
        category: "other",
      },
      {
        name: "Olive oil",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 22,
      carbs: 14,
      fat: 28,
      calcium: 45,
      vitaminC: 25,
    },
    mealType: "lunch",
    labels: ["vegetarian", "gluten-free", "low-carb"],
    servings: 2,
  },
  {
    name: "BBQ Chicken Bowl",
    description:
      "Shredded BBQ chicken over cilantro rice with corn, black beans, and coleslaw",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1543339308-d595c4819c82?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Shred cooked chicken and toss with BBQ sauce. Cook rice with cilantro and lime. Assemble bowl with corn, beans, and slaw.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "White rice",
        quantity: 150,
        unit: "g",
        category: "grains",
      },
      {
        name: "BBQ sauce",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Sweet corn",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Black beans",
        quantity: 100,
        unit: "g",
        category: "other",
      },
      {
        name: "Cabbage",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 510,
      protein: 38,
      carbs: 62,
      fat: 12,
      fiber: 8,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Veggie Sushi Rolls",
    description:
      "Nori rolls filled with seasoned sushi rice, avocado, cucumber, carrot, and cream cheese",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Prepare sushi rice. Lay nori on mat, spread rice, add fillings. Roll tightly, slice into 6-8 pieces.",
    },
    ingredients: [
      {
        name: "Sushi rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Nori sheets",
        quantity: 4,
        unit: "pcs",
        category: "other",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Cucumber",
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
        name: "Cream cheese",
        quantity: 50,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 360,
      protein: 8,
      carbs: 58,
      fat: 12,
      fiber: 6,
      iron: 10,
    },
    mealType: "lunch",
    labels: ["vegetarian"],
    servings: 2,
  },
  {
    name: "Stuffed Bell Peppers",
    description:
      "Roasted bell peppers filled with seasoned ground turkey, rice, and melted cheese",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1596097635092-6d889b4e5ce6?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Hollow bell peppers. Mix cooked turkey, rice, tomato sauce, and spices. Stuff peppers, top with cheese. Bake at 375°F for 30 min.",
    },
    ingredients: [
      {
        name: "Bell peppers",
        quantity: 4,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Ground turkey",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "White rice",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Tomato sauce",
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Mozzarella cheese",
        quantity: 80,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 30,
      carbs: 34,
      fat: 14,
      vitaminC: 150,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "gluten-free"],
    servings: 4,
  },
  {
    name: "Cobb Salad",
    description:
      "Classic Cobb salad with chicken, bacon, hard-boiled egg, avocado, blue cheese, and ranch",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Arrange chopped romaine on a platter. Top with rows of chicken, bacon, egg, avocado, tomato, and blue cheese. Drizzle with ranch.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 200,
        unit: "g",
        category: "meat",
      },
      {
        name: "Bacon",
        quantity: 4,
        unit: "pcs",
        category: "meat",
      },
      {
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Blue cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Romaine lettuce",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 38,
      carbs: 10,
      fat: 34,
      iron: 12,
      vitaminC: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "low-carb", "gluten-free"],
    servings: 2,
  },
  {
    name: "Chickpea Curry Wrap",
    description:
      "Spiced chickpea curry with spinach wrapped in warm naan bread",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook chickpeas with curry paste and coconut milk. Add spinach until wilted. Wrap in warm naan.",
    },
    ingredients: [
      {
        name: "Chickpeas",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Coconut milk",
        quantity: 150,
        unit: "ml",
        category: "other",
      },
      {
        name: "Spinach",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Curry paste",
        quantity: 2,
        unit: "tbsp",
        category: "spices",
      },
      {
        name: "Naan bread",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 56,
      fat: 14,
      fiber: 12,
      iron: 25,
    },
    mealType: "lunch",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },
  {
    name: "Salmon Teriyaki Rice Bowl",
    description:
      "Glazed teriyaki salmon over steamed rice with edamame, pickled ginger, and sesame",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Glaze salmon with teriyaki sauce. Bake at 400°F for 12 min. Serve over rice with edamame and pickled ginger.",
    },
    ingredients: [
      {
        name: "Salmon fillet",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "White rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Teriyaki sauce",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Edamame",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Pickled ginger",
        quantity: 20,
        unit: "g",
        category: "other",
      },
      {
        name: "Sesame seeds",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 38,
      carbs: 56,
      fat: 16,
      vitaminD: 80,
      iron: 12,
    },
    mealType: "lunch",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Roasted Vegetable Flatbread",
    description:
      "Crispy flatbread topped with roasted zucchini, eggplant, red pepper, goat cheese, and balsamic",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Roast vegetables at 425°F. Top flatbread with roasted veggies and goat cheese. Bake 10 min. Drizzle with balsamic.",
    },
    ingredients: [
      {
        name: "Flatbread",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Zucchini",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Eggplant",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Red bell pepper",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Goat cheese",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Balsamic vinegar",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 350,
      protein: 14,
      carbs: 42,
      fat: 14,
      vitaminC: 60,
      fiber: 6,
    },
    mealType: "lunch",
    labels: ["vegetarian"],
    servings: 2,
  },
  {
    name: "Korean Bibimbap",
    description:
      "Korean mixed rice bowl with sautéed vegetables, beef, gochujang sauce, and a fried egg",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook rice. Sauté vegetables and beef separately. Assemble in bowl with vegetables, beef, and gochujang. Top with fried egg.",
    },
    ingredients: [
      {
        name: "White rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Beef sirloin",
        quantity: 200,
        unit: "g",
        category: "meat",
      },
      {
        name: "Spinach",
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
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Gochujang",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 510,
      protein: 32,
      carbs: 58,
      fat: 16,
      iron: 25,
      vitaminC: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Egg Salad on Rye",
    description:
      "Creamy egg salad with Dijon mustard, chives, and celery on toasted rye bread",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Hard boil eggs, chop, and mix with mayo, Dijon, celery, and chives. Serve on toasted rye bread with lettuce.",
    },
    ingredients: [
      {
        name: "Eggs",
        quantity: 6,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Mayonnaise",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Rye bread",
        quantity: 4,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Celery",
        quantity: 40,
        unit: "g",
        category: "produce",
      },
      {
        name: "Dijon mustard",
        quantity: 1,
        unit: "tsp",
        category: "other",
      },
      {
        name: "Chives",
        quantity: 10,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 30,
      fat: 22,
      vitaminD: 15,
      iron: 12,
    },
    mealType: "lunch",
    labels: ["quick", "vegetarian"],
    servings: 2,
  },
  {
    name: "Tom Yum Soup",
    description:
      "Spicy and sour Thai soup with shrimp, mushrooms, lemongrass, and lime leaves",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Simmer lemongrass, galangal, and lime leaves in broth. Add mushrooms and shrimp. Season with fish sauce and lime juice.",
    },
    ingredients: [
      {
        name: "Shrimp",
        quantity: 250,
        unit: "g",
        category: "meat",
      },
      {
        name: "Mushrooms",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Lemongrass",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Fish sauce",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Lime",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 180,
      protein: 28,
      carbs: 10,
      fat: 4,
      vitaminC: 30,
      iron: 15,
    },
    mealType: "lunch",
    labels: ["high-protein", "low-carb", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Butternut Squash Soup",
    description:
      "Velvety roasted butternut squash soup with sage, nutmeg, and a swirl of cream",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Roast butternut squash. Sauté onion, add squash and broth. Blend until smooth. Season with sage and nutmeg. Swirl in cream.",
    },
    ingredients: [
      {
        name: "Butternut squash",
        quantity: 800,
        unit: "g",
        category: "produce",
      },
      {
        name: "Onion",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Vegetable broth",
        quantity: 400,
        unit: "ml",
        category: "other",
      },
      {
        name: "Heavy cream",
        quantity: 60,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Sage",
        quantity: 1,
        unit: "tbsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 220,
      protein: 4,
      carbs: 38,
      fat: 8,
      vitaminC: 50,
      fiber: 6,
    },
    mealType: "lunch",
    labels: ["vegetarian", "gluten-free"],
    servings: 4,
  },
  {
    name: "Italian Sub Sandwich",
    description:
      "Hearty Italian sub with salami, pepperoni, provolone, lettuce, tomato, and Italian dressing",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Slice sub rolls. Layer salami, pepperoni, provolone, lettuce, tomato, and onion. Drizzle with Italian dressing.",
    },
    ingredients: [
      {
        name: "Sub roll",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Salami",
        quantity: 80,
        unit: "g",
        category: "meat",
      },
      {
        name: "Pepperoni",
        quantity: 40,
        unit: "g",
        category: "meat",
      },
      {
        name: "Provolone cheese",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Lettuce",
        quantity: 50,
        unit: "g",
        category: "produce",
      },
      {
        name: "Tomato",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 540,
      protein: 26,
      carbs: 44,
      fat: 30,
      iron: 15,
      calcium: 18,
    },
    mealType: "lunch",
    labels: [],
    servings: 2,
  },
];
