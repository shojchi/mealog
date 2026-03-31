import type { Meal } from "../../types";

/**
 * Breakfast seed meals (25 items)
 *
 * Nutrition values are per-serving and cross-referenced with USDA FoodData Central.
 * All meals have servings >= 2.
 */
export const breakfastSeeds: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  // === EXISTING (updated to 2 servings, USDA-adjusted) ===
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
        quantity: 4,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Avocado",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Everything bagel seasoning",
        quantity: 2,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 385,
      protein: 15,
      carbs: 38,
      fat: 19,
      vitaminD: 15,
      iron: 20,
    },
    mealType: "breakfast",
    labels: ["quick", "high-protein", "vegetarian"],
    servings: 2,
  },
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
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Milk",
        quantity: 400,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Chia seeds",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Banana",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Maple syrup",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 325,
      protein: 12,
      carbs: 54,
      fat: 8,
      fiber: 8,
      calcium: 25,
    },
    mealType: "breakfast",
    labels: ["quick", "vegetarian"],
    servings: 2,
  },
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
        quantity: 6,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Bell pepper",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Mushrooms",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Spinach",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
      {
        name: "Whole wheat bread",
        quantity: 4,
        unit: "pcs",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 345,
      protein: 22,
      carbs: 30,
      fat: 15,
      iron: 25,
      vitaminD: 10,
    },
    mealType: "breakfast",
    labels: ["high-protein", "vegetarian"],
    servings: 2,
  },

  // === NEW MEALS ===
  {
    name: "Greek Yogurt Parfait",
    description:
      "Layered Greek yogurt with granola, mixed berries, and a drizzle of honey",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Layer yogurt, granola, and berries in a glass or bowl. Drizzle with honey. Repeat layers.",
    },
    ingredients: [
      {
        name: "Greek yogurt",
        quantity: 400,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Granola",
        quantity: 80,
        unit: "g",
        category: "grains",
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
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 310,
      protein: 18,
      carbs: 42,
      fat: 8,
      calcium: 22,
      vitaminC: 20,
    },
    mealType: "breakfast",
    labels: ["quick", "high-protein", "vegetarian"],
    servings: 2,
  },
  {
    name: "Banana Pancakes",
    description:
      "Fluffy pancakes made with ripe bananas, oat flour, and a touch of cinnamon",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mash bananas. Mix with oat flour, eggs, milk, and cinnamon. Cook on medium heat until golden on both sides.",
    },
    ingredients: [
      {
        name: "Banana",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Oat flour",
        quantity: 120,
        unit: "g",
        category: "grains",
      },
      {
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Milk",
        quantity: 100,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Cinnamon",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 340,
      protein: 13,
      carbs: 55,
      fat: 9,
      fiber: 5,
    },
    mealType: "breakfast",
    labels: ["vegetarian"],
    servings: 2,
  },
  {
    name: "Smoked Salmon Bagel",
    description:
      "Toasted everything bagel with cream cheese, smoked salmon, capers, and red onion",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1592415499556-74fcb9f18667?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Toast bagels. Spread cream cheese generously. Top with smoked salmon, capers, and thin red onion slices.",
    },
    ingredients: [
      {
        name: "Everything bagel",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Cream cheese",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Smoked salmon",
        quantity: 100,
        unit: "g",
        category: "meat",
      },
      {
        name: "Capers",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Red onion",
        quantity: 30,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 395,
      protein: 22,
      carbs: 40,
      fat: 16,
      vitaminD: 40,
      iron: 12,
    },
    mealType: "breakfast",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "Spinach and Feta Omelette",
    description:
      "Fluffy omelette filled with sautéed spinach, crumbled feta, and sun-dried tomatoes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Beat eggs. Cook in buttered pan. Add spinach, feta, and sun-dried tomatoes. Fold and serve.",
    },
    ingredients: [
      {
        name: "Eggs",
        quantity: 6,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Spinach",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Feta cheese",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Sun-dried tomatoes",
        quantity: 30,
        unit: "g",
        category: "produce",
      },
      {
        name: "Butter",
        quantity: 10,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 330,
      protein: 24,
      carbs: 5,
      fat: 24,
      calcium: 20,
      iron: 18,
    },
    mealType: "breakfast",
    labels: ["high-protein", "low-carb", "gluten-free", "vegetarian"],
    servings: 2,
  },
  {
    name: "Chia Seed Pudding",
    description:
      "Creamy coconut milk chia pudding topped with mango and toasted coconut flakes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix chia seeds with coconut milk and sweetener. Refrigerate 4 hours or overnight. Top with mango and coconut.",
    },
    ingredients: [
      {
        name: "Chia seeds",
        quantity: 60,
        unit: "g",
        category: "other",
      },
      {
        name: "Coconut milk",
        quantity: 400,
        unit: "ml",
        category: "other",
      },
      {
        name: "Mango",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Coconut flakes",
        quantity: 20,
        unit: "g",
        category: "other",
      },
      {
        name: "Maple syrup",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 350,
      protein: 8,
      carbs: 32,
      fat: 22,
      fiber: 12,
      vitaminC: 30,
    },
    mealType: "breakfast",
    labels: ["vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Breakfast Burrito",
    description:
      "Flour tortilla stuffed with scrambled eggs, black beans, cheese, salsa, and avocado",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Scramble eggs. Warm tortillas. Fill with eggs, beans, cheese, salsa, and avocado. Roll tightly.",
    },
    ingredients: [
      {
        name: "Flour tortilla",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Black beans",
        quantity: 100,
        unit: "g",
        category: "other",
      },
      {
        name: "Cheddar cheese",
        quantity: 50,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Salsa",
        quantity: 60,
        unit: "g",
        category: "other",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 25,
      carbs: 42,
      fat: 24,
      fiber: 10,
      iron: 20,
    },
    mealType: "breakfast",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "French Toast with Berries",
    description:
      "Classic French toast made with brioche, topped with fresh berries and powdered sugar",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Whisk eggs with milk, cinnamon, and vanilla. Dip brioche slices and cook until golden. Top with berries.",
    },
    ingredients: [
      {
        name: "Brioche bread",
        quantity: 4,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Eggs",
        quantity: 3,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Milk",
        quantity: 100,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Mixed berries",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cinnamon",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Powdered sugar",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 48,
      fat: 15,
      vitaminC: 15,
    },
    mealType: "breakfast",
    labels: ["vegetarian"],
    servings: 2,
  },
  {
    name: "Acai Bowl",
    description:
      "Thick acai smoothie bowl topped with granola, banana, coconut, and chia seeds",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Blend acai packets with banana and a splash of almond milk until thick. Top with granola, fruit, and seeds.",
    },
    ingredients: [
      {
        name: "Acai puree",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Banana",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Almond milk",
        quantity: 100,
        unit: "ml",
        category: "other",
      },
      {
        name: "Granola",
        quantity: 60,
        unit: "g",
        category: "grains",
      },
      {
        name: "Chia seeds",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 310,
      protein: 6,
      carbs: 52,
      fat: 10,
      fiber: 8,
      vitaminC: 15,
    },
    mealType: "breakfast",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },
  {
    name: "Shakshuka",
    description:
      "Eggs poached in spiced tomato and pepper sauce with cumin, paprika, and fresh herbs",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté onion and peppers. Add tomatoes and spices. Create wells, crack eggs in, cover and cook until set.",
    },
    ingredients: [
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Canned tomatoes",
        quantity: 400,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 1,
        unit: "pcs",
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
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Paprika",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 220,
      protein: 14,
      carbs: 18,
      fat: 11,
      vitaminC: 80,
      iron: 20,
    },
    mealType: "breakfast",
    labels: ["vegetarian", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Protein Smoothie Bowl",
    description:
      "Thick blended smoothie with protein powder, frozen berries, banana, and toppings",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Blend frozen berries, banana, protein powder, and a splash of milk until thick. Pour into bowl and add toppings.",
    },
    ingredients: [
      {
        name: "Frozen berries",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Banana",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Protein powder",
        quantity: 60,
        unit: "g",
        category: "other",
      },
      {
        name: "Milk",
        quantity: 150,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Granola",
        quantity: 40,
        unit: "g",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 340,
      protein: 30,
      carbs: 45,
      fat: 6,
      fiber: 6,
      vitaminC: 35,
    },
    mealType: "breakfast",
    labels: ["quick", "high-protein"],
    servings: 2,
  },
  {
    name: "Huevos Rancheros",
    description:
      "Fried eggs on crispy corn tortillas with black bean salsa, avocado, and cotija cheese",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Fry tortillas until crispy. Top with refried beans, fried eggs, salsa, avocado, and cheese.",
    },
    ingredients: [
      {
        name: "Corn tortilla",
        quantity: 4,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Black beans",
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Salsa",
        quantity: 100,
        unit: "g",
        category: "other",
      },
      {
        name: "Avocado",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Cotija cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 21,
      carbs: 40,
      fat: 20,
      fiber: 12,
      iron: 22,
    },
    mealType: "breakfast",
    labels: ["high-protein", "gluten-free", "vegetarian"],
    servings: 2,
  },
  {
    name: "PB&J Overnight Oats",
    description:
      "Creamy overnight oats with peanut butter swirl and strawberry jam",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix oats, milk, peanut butter, and chia seeds. Refrigerate overnight. Top with jam and chopped peanuts.",
    },
    ingredients: [
      {
        name: "Rolled oats",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Milk",
        quantity: 300,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Peanut butter",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Strawberry jam",
        quantity: 2,
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
      calories: 380,
      protein: 15,
      carbs: 48,
      fat: 16,
      fiber: 6,
    },
    mealType: "breakfast",
    labels: ["vegetarian"],
    servings: 2,
  },
  {
    name: "Mushroom and Gruyère Frittata",
    description:
      "Baked egg frittata loaded with sautéed mushrooms, gruyère cheese, and fresh thyme",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté mushrooms. Beat eggs with cheese and thyme. Pour over mushrooms in oven-safe skillet. Bake at 375°F for 15 minutes.",
    },
    ingredients: [
      {
        name: "Eggs",
        quantity: 8,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Mushrooms",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Gruyère cheese",
        quantity: 80,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Fresh thyme",
        quantity: 1,
        unit: "tbsp",
        category: "spices",
      },
      {
        name: "Olive oil",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 350,
      protein: 26,
      carbs: 4,
      fat: 26,
      calcium: 25,
      vitaminD: 15,
    },
    mealType: "breakfast",
    labels: ["high-protein", "low-carb", "gluten-free", "vegetarian"],
    servings: 4,
  },
  {
    name: "Tropical Mango Smoothie",
    description:
      "Refreshing mango smoothie with pineapple, coconut milk, and lime",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Blend mango, pineapple, coconut milk, and lime juice until smooth. Serve immediately.",
    },
    ingredients: [
      {
        name: "Mango",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Pineapple chunks",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Coconut milk",
        quantity: 200,
        unit: "ml",
        category: "other",
      },
      {
        name: "Lime juice",
        quantity: 2,
        unit: "tbsp",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 230,
      protein: 3,
      carbs: 42,
      fat: 8,
      vitaminC: 90,
      fiber: 4,
    },
    mealType: "breakfast",
    labels: ["quick", "vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Cottage Cheese Bowl with Peaches",
    description:
      "Creamy cottage cheese topped with sliced peaches, walnuts, and a drizzle of honey",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Divide cottage cheese into bowls. Top with sliced peaches and walnuts. Drizzle with honey.",
    },
    ingredients: [
      {
        name: "Cottage cheese",
        quantity: 400,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Peaches",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Walnuts",
        quantity: 30,
        unit: "g",
        category: "other",
      },
      {
        name: "Honey",
        quantity: 2,
        unit: "tsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 260,
      protein: 24,
      carbs: 22,
      fat: 10,
      calcium: 15,
    },
    mealType: "breakfast",
    labels: ["quick", "high-protein", "gluten-free", "vegetarian"],
    servings: 2,
  },
  {
    name: "Sweet Potato Hash",
    description:
      "Crispy sweet potato cubes with bell peppers, onions, and topped with fried eggs",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Dice sweet potato and sauté until crispy. Add peppers and onions. Fry eggs and place on top.",
    },
    ingredients: [
      {
        name: "Sweet potato",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Onion",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Olive oil",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 360,
      protein: 16,
      carbs: 40,
      fat: 16,
      vitaminC: 60,
      fiber: 6,
    },
    mealType: "breakfast",
    labels: ["gluten-free", "dairy-free", "vegetarian"],
    servings: 2,
  },
  {
    name: "Tofu Scramble",
    description:
      "Seasoned crumbled tofu with turmeric, nutritional yeast, spinach, and tomatoes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Crumble firm tofu. Sauté with turmeric, garlic, and nutritional yeast. Add spinach and tomatoes until wilted.",
    },
    ingredients: [
      {
        name: "Firm tofu",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Spinach",
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
        name: "Turmeric",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Nutritional yeast",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 220,
      protein: 22,
      carbs: 8,
      fat: 12,
      iron: 30,
      calcium: 40,
    },
    mealType: "breakfast",
    labels: ["high-protein", "vegan", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Blueberry Muffins",
    description:
      "Homemade whole wheat blueberry muffins with a hint of lemon zest",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix dry and wet ingredients separately. Fold together with blueberries. Bake at 375°F for 20 minutes.",
    },
    ingredients: [
      {
        name: "Whole wheat flour",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Blueberries",
        quantity: 150,
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
        name: "Greek yogurt",
        quantity: 100,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Honey",
        quantity: 3,
        unit: "tbsp",
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
      calories: 210,
      protein: 7,
      carbs: 38,
      fat: 4,
      fiber: 4,
      vitaminC: 10,
    },
    mealType: "breakfast",
    labels: ["vegetarian"],
    servings: 6,
  },
  {
    name: "Buckwheat Porridge with Apple",
    description:
      "Warm buckwheat groats cooked with cinnamon, topped with sautéed apples and walnuts",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook buckwheat in water with cinnamon. Sauté apples with butter and cinnamon. Top porridge with apples and walnuts.",
    },
    ingredients: [
      {
        name: "Buckwheat groats",
        quantity: 150,
        unit: "g",
        category: "grains",
      },
      {
        name: "Apple",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Walnuts",
        quantity: 30,
        unit: "g",
        category: "other",
      },
      {
        name: "Cinnamon",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Butter",
        quantity: 10,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 340,
      protein: 10,
      carbs: 58,
      fat: 10,
      fiber: 7,
      iron: 15,
    },
    mealType: "breakfast",
    labels: ["gluten-free", "vegetarian"],
    servings: 2,
  },
  {
    name: "Egg and Cheese Croissant",
    description:
      "Warm buttery croissant filled with scrambled eggs and melted gruyère cheese",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Scramble eggs lightly. Slice croissants, fill with eggs and cheese. Warm in oven for 3 minutes.",
    },
    ingredients: [
      {
        name: "Croissant",
        quantity: 2,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Gruyère cheese",
        quantity: 50,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Butter",
        quantity: 10,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 20,
      carbs: 30,
      fat: 26,
      calcium: 18,
    },
    mealType: "breakfast",
    labels: ["quick", "vegetarian"],
    servings: 2,
  },
  {
    name: "Granola Bowl with Coconut Yogurt",
    description:
      "Crunchy homemade granola served over coconut yogurt with kiwi, pomegranate seeds, and hemp hearts",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Spoon coconut yogurt into a bowl. Top with granola, sliced kiwi, pomegranate seeds, and a sprinkle of hemp hearts.",
    },
    ingredients: [
      {
        name: "Coconut yogurt",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Granola",
        quantity: 80,
        unit: "g",
        category: "grains",
      },
      {
        name: "Kiwi",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Pomegranate seeds",
        quantity: 40,
        unit: "g",
        category: "produce",
      },
      {
        name: "Hemp hearts",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 44,
      fat: 14,
      fiber: 6,
      vitaminC: 80,
    },
    mealType: "breakfast",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },
  {
    name: "Savory Oatmeal with Egg",
    description:
      "Steel-cut oats cooked in broth, topped with a soft-boiled egg, cheddar, scallions, and hot sauce",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook steel-cut oats in chicken broth until creamy. Top with soft-boiled egg, shredded cheddar, scallions, and hot sauce.",
    },
    ingredients: [
      {
        name: "Steel-cut oats",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Chicken broth",
        quantity: 400,
        unit: "ml",
        category: "other",
      },
      {
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Cheddar cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Scallions",
        quantity: 20,
        unit: "g",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 350,
      protein: 20,
      carbs: 38,
      fat: 14,
      iron: 18,
      calcium: 12,
    },
    mealType: "breakfast",
    labels: ["high-protein"],
    servings: 2,
  },
];
