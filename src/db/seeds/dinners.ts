import type { Meal } from "../../types";

/**
 * Dinner seed meals (30 items)
 *
 * Nutrition values are per-serving and cross-referenced with USDA FoodData Central.
 * All meals have servings >= 2.
 */
export const dinnerSeeds: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  // === EXISTING (updated to 2 servings, USDA-adjusted) ===
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
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Asparagus",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Carrots",
        quantity: 200,
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
        name: "Olive oil",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 42,
      carbs: 28,
      fat: 28,
      vitaminD: 80,
      iron: 15,
      vitaminC: 30,
    },
    mealType: "dinner",
    labels: ["high-protein", "gluten-free", "dairy-free"],
    servings: 2,
  },
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
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Brown rice",
        quantity: 160,
        unit: "g",
        category: "grains",
      },
      {
        name: "Broccoli",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell pepper",
        quantity: 160,
        unit: "g",
        category: "produce",
      },
      {
        name: "Snap peas",
        quantity: 120,
        unit: "g",
        category: "produce",
      },
      {
        name: "Soy sauce",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 485,
      protein: 38,
      carbs: 56,
      fat: 10,
      iron: 18,
      vitaminC: 120,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
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
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Coconut milk",
        quantity: 300,
        unit: "ml",
        category: "other",
      },
      {
        name: "Tomatoes",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Onion",
        quantity: 160,
        unit: "g",
        category: "produce",
      },
      {
        name: "Curry powder",
        quantity: 3,
        unit: "tsp",
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
      calories: 520,
      protein: 24,
      carbs: 70,
      fat: 16,
      fiber: 18,
      iron: 35,
    },
    mealType: "dinner",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },

  // === NEW MEALS ===
  {
    name: "Spaghetti Bolognese",
    description:
      "Classic Italian meat sauce with ground beef, tomatoes, and herbs served over spaghetti",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Brown ground beef with onion and garlic. Add tomatoes, herbs, and simmer 30 min. Cook spaghetti and serve with sauce.",
    },
    ingredients: [
      {
        name: "Spaghetti",
        quantity: 250,
        unit: "g",
        category: "grains",
      },
      {
        name: "Ground beef",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Canned tomatoes",
        quantity: 400,
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
        name: "Garlic",
        quantity: 3,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Parmesan cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 580,
      protein: 35,
      carbs: 62,
      fat: 20,
      iron: 30,
      calcium: 12,
    },
    mealType: "dinner",
    labels: ["high-protein"],
    servings: 3,
  },
  {
    name: "Grilled Chicken with Sweet Potato",
    description:
      "Herb-marinated grilled chicken breast with roasted sweet potato and steamed broccoli",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Marinate chicken in herbs and olive oil. Grill until cooked through. Roast sweet potato cubes. Steam broccoli. Serve together.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Sweet potato",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Broccoli",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Olive oil",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Garlic",
        quantity: 3,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 440,
      protein: 42,
      carbs: 38,
      fat: 14,
      vitaminC: 80,
      iron: 12,
    },
    mealType: "dinner",
    labels: ["high-protein", "gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Beef Tacos",
    description:
      "Seasoned ground beef tacos with fresh pico de gallo, cheese, lettuce, and sour cream",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Brown ground beef with taco seasoning. Warm tortillas. Fill with beef, pico de gallo, cheese, lettuce, and sour cream.",
    },
    ingredients: [
      {
        name: "Ground beef",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Corn tortilla",
        quantity: 8,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Cheddar cheese",
        quantity: 80,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Tomatoes",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Lettuce",
        quantity: 60,
        unit: "g",
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
      calories: 520,
      protein: 32,
      carbs: 42,
      fat: 26,
      iron: 25,
      calcium: 20,
    },
    mealType: "dinner",
    labels: ["high-protein", "gluten-free"],
    servings: 2,
  },
  {
    name: "Mushroom Risotto",
    description:
      "Creamy Italian arborio rice with mixed mushrooms, white wine, and parmesan",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté mushrooms. Toast arborio rice. Add white wine, then ladle warm broth gradually, stirring. Finish with butter and parmesan.",
    },
    ingredients: [
      {
        name: "Arborio rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Mixed mushrooms",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Parmesan cheese",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
      {
        name: "White wine",
        quantity: 100,
        unit: "ml",
        category: "other",
      },
      {
        name: "Vegetable broth",
        quantity: 600,
        unit: "ml",
        category: "other",
      },
      {
        name: "Butter",
        quantity: 30,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 14,
      carbs: 56,
      fat: 16,
      iron: 10,
      calcium: 18,
    },
    mealType: "dinner",
    labels: ["vegetarian", "gluten-free"],
    servings: 3,
  },
  {
    name: "Teriyaki Tofu with Vegetables",
    description:
      "Crispy baked tofu glazed with teriyaki sauce, served with stir-fried vegetables and jasmine rice",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Press and cube tofu. Bake until crispy. Toss with teriyaki sauce. Stir-fry vegetables. Serve over jasmine rice.",
    },
    ingredients: [
      {
        name: "Firm tofu",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Jasmine rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Teriyaki sauce",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Broccoli",
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
        name: "Sesame seeds",
        quantity: 1,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 22,
      carbs: 58,
      fat: 12,
      iron: 25,
      calcium: 35,
    },
    mealType: "dinner",
    labels: ["vegan", "dairy-free"],
    servings: 2,
  },
  {
    name: "Pork Chops with Apple Sauce",
    description:
      "Pan-seared pork loin chops with homemade apple sauce and mashed potatoes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Season and pan-sear pork chops. Make apple sauce by simmering apples with cinnamon. Boil and mash potatoes with butter.",
    },
    ingredients: [
      {
        name: "Pork loin chop",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Apples",
        quantity: 3,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Potatoes",
        quantity: 400,
        unit: "g",
        category: "produce",
      },
      {
        name: "Butter",
        quantity: 30,
        unit: "g",
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
      calories: 520,
      protein: 38,
      carbs: 52,
      fat: 18,
      iron: 12,
      vitaminC: 20,
    },
    mealType: "dinner",
    labels: ["high-protein", "gluten-free"],
    servings: 2,
  },
  {
    name: "Stuffed Zucchini Boats",
    description:
      "Baked zucchini halves filled with quinoa, sun-dried tomatoes, spinach, and feta",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1596097635092-6d889b4e5ce6?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Halve zucchini and scoop centers. Mix quinoa, sun-dried tomatoes, spinach, and feta. Fill boats and bake at 375°F for 25 min.",
    },
    ingredients: [
      {
        name: "Zucchini",
        quantity: 4,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Quinoa",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Sun-dried tomatoes",
        quantity: 50,
        unit: "g",
        category: "produce",
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
    ],
    nutrition: {
      calories: 280,
      protein: 14,
      carbs: 34,
      fat: 10,
      fiber: 6,
      vitaminC: 40,
    },
    mealType: "dinner",
    labels: ["vegetarian", "gluten-free"],
    servings: 2,
  },
  {
    name: "Shrimp Scampi Pasta",
    description:
      "Garlic butter shrimp tossed with linguine, white wine, lemon, and fresh parsley",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook linguine. Sauté garlic in butter, add shrimp. Deglaze with white wine and lemon juice. Toss with pasta and parsley.",
    },
    ingredients: [
      {
        name: "Linguine",
        quantity: 250,
        unit: "g",
        category: "grains",
      },
      {
        name: "Shrimp",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Garlic",
        quantity: 5,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Butter",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
      {
        name: "White wine",
        quantity: 80,
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
      calories: 520,
      protein: 34,
      carbs: 56,
      fat: 18,
      iron: 20,
      vitaminC: 15,
    },
    mealType: "dinner",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "Thai Green Curry",
    description:
      "Aromatic green curry with chicken, bamboo shoots, Thai eggplant, and coconut milk over rice",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté green curry paste in coconut cream. Add chicken and cook through. Add vegetables and coconut milk. Serve over rice.",
    },
    ingredients: [
      {
        name: "Chicken thigh",
        quantity: 300,
        unit: "g",
        category: "meat",
      },
      {
        name: "Coconut milk",
        quantity: 400,
        unit: "ml",
        category: "other",
      },
      {
        name: "Green curry paste",
        quantity: 3,
        unit: "tbsp",
        category: "spices",
      },
      {
        name: "Bamboo shoots",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Thai basil",
        quantity: 15,
        unit: "g",
        category: "produce",
      },
      {
        name: "Jasmine rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 560,
      protein: 30,
      carbs: 52,
      fat: 26,
      iron: 18,
    },
    mealType: "dinner",
    labels: ["gluten-free", "dairy-free"],
    servings: 2,
  },
  {
    name: "Eggplant Parmesan",
    description:
      "Breaded and baked eggplant slices layered with marinara sauce and melted mozzarella",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1629115916087-7e8c114a24a1?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Slice eggplant, bread and bake until crispy. Layer in baking dish with marinara and mozzarella. Bake until bubbly.",
    },
    ingredients: [
      {
        name: "Eggplant",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Marinara sauce",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Mozzarella cheese",
        quantity: 200,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Breadcrumbs",
        quantity: 80,
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
        name: "Parmesan cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 22,
      carbs: 38,
      fat: 22,
      calcium: 35,
      vitaminC: 10,
    },
    mealType: "dinner",
    labels: ["vegetarian"],
    servings: 3,
  },
  {
    name: "Lamb Kofta with Tzatziki",
    description:
      "Spiced ground lamb skewers with yogurt-cucumber tzatziki, pita bread, and fresh salad",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Mix ground lamb with spices, form onto skewers. Grill until cooked. Make tzatziki. Serve with warm pita and salad.",
    },
    ingredients: [
      {
        name: "Ground lamb",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Greek yogurt",
        quantity: 150,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Cucumber",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Pita bread",
        quantity: 4,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Cumin",
        quantity: 2,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Garlic",
        quantity: 3,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 540,
      protein: 32,
      carbs: 40,
      fat: 28,
      iron: 20,
      calcium: 15,
    },
    mealType: "dinner",
    labels: ["high-protein"],
    servings: 2,
  },
  {
    name: "Vegetable Pad Thai",
    description:
      "Classic Thai stir-fried rice noodles with tofu, bean sprouts, egg, and tamarind-peanut sauce",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Soak rice noodles. Stir-fry tofu, push aside. Scramble egg, add noodles and pad thai sauce. Toss with bean sprouts and peanuts.",
    },
    ingredients: [
      {
        name: "Rice noodles",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Firm tofu",
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Eggs",
        quantity: 2,
        unit: "pcs",
        category: "dairy",
      },
      {
        name: "Bean sprouts",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Peanuts",
        quantity: 40,
        unit: "g",
        category: "other",
      },
      {
        name: "Tamarind paste",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 440,
      protein: 20,
      carbs: 54,
      fat: 18,
      iron: 18,
      fiber: 4,
    },
    mealType: "dinner",
    labels: ["vegetarian", "dairy-free", "gluten-free"],
    servings: 2,
  },
  {
    name: "Beef Stew",
    description:
      "Slow-braised beef chunks with potatoes, carrots, peas, and rich gravy",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Brown beef cubes. Add onion, carrots, potatoes, and broth. Simmer 90 minutes until tender. Add peas. Thicken gravy with flour.",
    },
    ingredients: [
      {
        name: "Beef chuck",
        quantity: 500,
        unit: "g",
        category: "meat",
      },
      {
        name: "Potatoes",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Carrots",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Green peas",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Beef broth",
        quantity: 500,
        unit: "ml",
        category: "other",
      },
      {
        name: "Onion",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 40,
      carbs: 38,
      fat: 20,
      iron: 30,
      vitaminC: 20,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 4,
  },
  {
    name: "Margherita Pizza",
    description:
      "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Make pizza dough. Stretch and top with crushed tomatoes, torn mozzarella, and basil. Bake at 500°F for 10-12 minutes.",
    },
    ingredients: [
      {
        name: "Pizza dough",
        quantity: 300,
        unit: "g",
        category: "grains",
      },
      {
        name: "San Marzano tomatoes",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Fresh mozzarella",
        quantity: 200,
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
        name: "Olive oil",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 450,
      protein: 20,
      carbs: 50,
      fat: 20,
      calcium: 30,
    },
    mealType: "dinner",
    labels: ["vegetarian"],
    servings: 2,
  },
  {
    name: "Honey Garlic Chicken Thighs",
    description:
      "Crispy chicken thighs glazed with honey garlic sauce, served with steamed jasmine rice",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1598103442097-8b74f4e4c3c1?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sear chicken thighs skin-side down until crispy. Make honey garlic sauce in pan. Glaze chicken and bake 20 min. Serve over rice.",
    },
    ingredients: [
      {
        name: "Chicken thigh",
        quantity: 500,
        unit: "g",
        category: "meat",
      },
      {
        name: "Honey",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Garlic",
        quantity: 5,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Soy sauce",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Jasmine rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 550,
      protein: 35,
      carbs: 58,
      fat: 20,
      iron: 12,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Cauliflower Tikka Masala",
    description:
      "Roasted cauliflower in creamy spiced tomato sauce with basmati rice",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Roast cauliflower florets. Make tikka masala sauce with tomatoes, cream, and spices. Combine and serve over basmati rice.",
    },
    ingredients: [
      {
        name: "Cauliflower",
        quantity: 500,
        unit: "g",
        category: "produce",
      },
      {
        name: "Canned tomatoes",
        quantity: 400,
        unit: "g",
        category: "produce",
      },
      {
        name: "Heavy cream",
        quantity: 100,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Garam masala",
        quantity: 2,
        unit: "tsp",
        category: "spices",
      },
      {
        name: "Basmati rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Onion",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 400,
      protein: 12,
      carbs: 60,
      fat: 14,
      vitaminC: 90,
      fiber: 8,
    },
    mealType: "dinner",
    labels: ["vegetarian", "gluten-free"],
    servings: 3,
  },
  {
    name: "Fish and Chips",
    description:
      "Beer-battered white fish fillets with thick-cut oven fries and tartar sauce",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1534766555764-ce878a4e1df2?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cut potatoes into thick fries and bake. Make beer batter. Dip fish and fry until golden. Serve with tartar sauce.",
    },
    ingredients: [
      {
        name: "White fish fillet",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Potatoes",
        quantity: 400,
        unit: "g",
        category: "produce",
      },
      {
        name: "Flour",
        quantity: 100,
        unit: "g",
        category: "grains",
      },
      {
        name: "Beer",
        quantity: 150,
        unit: "ml",
        category: "other",
      },
      {
        name: "Mayonnaise",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
    ],
    nutrition: {
      calories: 560,
      protein: 32,
      carbs: 58,
      fat: 22,
      iron: 10,
    },
    mealType: "dinner",
    labels: ["dairy-free"],
    servings: 2,
  },
  {
    name: "Chickpea and Spinach Stew",
    description:
      "Mediterranean stew with chickpeas, spinach, tomatoes, and warm spices",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sauté onion and garlic. Add chickpeas, tomatoes, cumin, and paprika. Simmer 20 min. Stir in spinach until wilted.",
    },
    ingredients: [
      {
        name: "Chickpeas",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Spinach",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Canned tomatoes",
        quantity: 400,
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
        name: "Paprika",
        quantity: 1,
        unit: "tsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 280,
      protein: 16,
      carbs: 42,
      fat: 6,
      fiber: 14,
      iron: 35,
    },
    mealType: "dinner",
    labels: ["vegan", "gluten-free", "dairy-free"],
    servings: 3,
  },
  {
    name: "Beef Bulgogi",
    description:
      "Korean marinated beef with garlic, soy, sesame, and pear, served with steamed rice and kimchi",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Marinate thinly sliced beef in soy, sesame oil, garlic, and pear juice for 2 hours. Grill or pan-fry. Serve with rice and kimchi.",
    },
    ingredients: [
      {
        name: "Beef sirloin",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Soy sauce",
        quantity: 4,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Sesame oil",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Asian pear",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "White rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Kimchi",
        quantity: 100,
        unit: "g",
        category: "other",
      },
    ],
    nutrition: {
      calories: 520,
      protein: 36,
      carbs: 54,
      fat: 18,
      iron: 22,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Baked Cod with Lemon and Capers",
    description:
      "Oven-baked cod fillets with lemon butter, capers, and roasted cherry tomatoes",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Place cod in baking dish. Top with lemon slices, capers, and cherry tomatoes. Drizzle with butter. Bake at 400°F for 15 min.",
    },
    ingredients: [
      {
        name: "Cod fillet",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Lemon",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Capers",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Cherry tomatoes",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "Butter",
        quantity: 30,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 280,
      protein: 38,
      carbs: 8,
      fat: 12,
      vitaminD: 30,
      vitaminC: 40,
    },
    mealType: "dinner",
    labels: ["high-protein", "low-carb", "gluten-free"],
    servings: 2,
  },
  {
    name: "Pasta Primavera",
    description:
      "Penne pasta tossed with seasonal vegetables in a light garlic-olive oil sauce",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Cook penne. Sauté assorted vegetables in garlic and olive oil. Toss with pasta. Finish with parmesan and fresh herbs.",
    },
    ingredients: [
      {
        name: "Penne pasta",
        quantity: 250,
        unit: "g",
        category: "grains",
      },
      {
        name: "Zucchini",
        quantity: 150,
        unit: "g",
        category: "produce",
      },
      {
        name: "Cherry tomatoes",
        quantity: 150,
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
        name: "Olive oil",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Parmesan cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 420,
      protein: 14,
      carbs: 58,
      fat: 16,
      vitaminC: 60,
      fiber: 5,
    },
    mealType: "dinner",
    labels: ["vegetarian"],
    servings: 3,
  },
  {
    name: "Miso-Glazed Salmon",
    description:
      "Broiled salmon fillets with sweet white miso glaze, served with bok choy and rice",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Marinate salmon in miso, mirin, and sugar mixture. Broil until caramelized. Sauté bok choy with garlic. Serve with rice.",
    },
    ingredients: [
      {
        name: "Salmon fillet",
        quantity: 350,
        unit: "g",
        category: "meat",
      },
      {
        name: "White miso paste",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Mirin",
        quantity: 2,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Bok choy",
        quantity: 200,
        unit: "g",
        category: "produce",
      },
      {
        name: "White rice",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
    ],
    nutrition: {
      calories: 510,
      protein: 38,
      carbs: 50,
      fat: 18,
      vitaminD: 75,
      calcium: 15,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 2,
  },
  {
    name: "Black Bean Enchiladas",
    description:
      "Corn tortillas rolled with black beans and cheese, topped with red enchilada sauce",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Fill tortillas with black beans and cheese. Roll and place in baking dish. Cover with enchilada sauce. Bake at 375°F for 20 min.",
    },
    ingredients: [
      {
        name: "Corn tortilla",
        quantity: 8,
        unit: "pcs",
        category: "grains",
      },
      {
        name: "Black beans",
        quantity: 400,
        unit: "g",
        category: "other",
      },
      {
        name: "Cheddar cheese",
        quantity: 150,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Enchilada sauce",
        quantity: 300,
        unit: "g",
        category: "other",
      },
      {
        name: "Sour cream",
        quantity: 60,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 440,
      protein: 22,
      carbs: 52,
      fat: 18,
      fiber: 14,
      iron: 20,
    },
    mealType: "dinner",
    labels: ["vegetarian", "gluten-free"],
    servings: 4,
  },
  {
    name: "Chicken Souvlaki Plate",
    description:
      "Greek-style grilled chicken skewers with roasted potatoes, Greek salad, and tzatziki",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Marinate chicken in lemon, oregano, and olive oil. Thread onto skewers and grill. Roast potatoes. Serve with salad and tzatziki.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Potatoes",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Greek yogurt",
        quantity: 100,
        unit: "g",
        category: "dairy",
      },
      {
        name: "Cucumber",
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
        name: "Lemon",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 42,
      carbs: 40,
      fat: 16,
      vitaminC: 35,
      iron: 12,
    },
    mealType: "dinner",
    labels: ["high-protein", "gluten-free"],
    servings: 2,
  },
  {
    name: "Ratatouille",
    description:
      "Provençal vegetable stew with eggplant, zucchini, tomatoes, and bell peppers",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Slice vegetables thinly. Layer in baking dish with tomato sauce. Drizzle with olive oil and herbs. Bake at 375°F for 45 min.",
    },
    ingredients: [
      {
        name: "Eggplant",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Zucchini",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Tomatoes",
        quantity: 300,
        unit: "g",
        category: "produce",
      },
      {
        name: "Bell peppers",
        quantity: 2,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Olive oil",
        quantity: 3,
        unit: "tbsp",
        category: "other",
      },
      {
        name: "Fresh thyme",
        quantity: 1,
        unit: "tbsp",
        category: "spices",
      },
    ],
    nutrition: {
      calories: 180,
      protein: 5,
      carbs: 22,
      fat: 10,
      vitaminC: 80,
      fiber: 8,
    },
    mealType: "dinner",
    labels: ["vegan", "gluten-free", "dairy-free", "low-carb"],
    servings: 4,
  },
  {
    name: "Moroccan Lamb Tagine",
    description:
      "Slow-cooked lamb with dried apricots, chickpeas, warm spices, and couscous",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Brown lamb. Add onion, garlic, spices, apricots, chickpeas, and broth. Simmer 1.5 hours. Serve over couscous.",
    },
    ingredients: [
      {
        name: "Lamb shoulder",
        quantity: 500,
        unit: "g",
        category: "meat",
      },
      {
        name: "Dried apricots",
        quantity: 80,
        unit: "g",
        category: "produce",
      },
      {
        name: "Chickpeas",
        quantity: 200,
        unit: "g",
        category: "other",
      },
      {
        name: "Couscous",
        quantity: 200,
        unit: "g",
        category: "grains",
      },
      {
        name: "Ras el hanout",
        quantity: 2,
        unit: "tbsp",
        category: "spices",
      },
      {
        name: "Onion",
        quantity: 1,
        unit: "pcs",
        category: "produce",
      },
    ],
    nutrition: {
      calories: 560,
      protein: 38,
      carbs: 56,
      fat: 20,
      iron: 30,
      fiber: 8,
    },
    mealType: "dinner",
    labels: ["high-protein", "dairy-free"],
    servings: 4,
  },
  {
    name: "Creamy Tuscan Chicken",
    description:
      "Pan-seared chicken in a creamy sun-dried tomato and spinach sauce with garlic",
    image: {
      type: "url",
      content:
        "https://images.unsplash.com/photo-1598103442097-8b74f4e4c3c1?w=400",
    },
    recipe: {
      type: "text",
      content:
        "Sear chicken breast. Add garlic, sun-dried tomatoes, spinach, and cream. Simmer until sauce thickens. Serve with crusty bread.",
    },
    ingredients: [
      {
        name: "Chicken breast",
        quantity: 400,
        unit: "g",
        category: "meat",
      },
      {
        name: "Heavy cream",
        quantity: 150,
        unit: "ml",
        category: "dairy",
      },
      {
        name: "Sun-dried tomatoes",
        quantity: 60,
        unit: "g",
        category: "produce",
      },
      {
        name: "Spinach",
        quantity: 100,
        unit: "g",
        category: "produce",
      },
      {
        name: "Garlic",
        quantity: 4,
        unit: "pcs",
        category: "produce",
      },
      {
        name: "Parmesan cheese",
        quantity: 40,
        unit: "g",
        category: "dairy",
      },
    ],
    nutrition: {
      calories: 480,
      protein: 42,
      carbs: 10,
      fat: 32,
      calcium: 15,
      iron: 15,
    },
    mealType: "dinner",
    labels: ["high-protein", "low-carb", "gluten-free"],
    servings: 2,
  },
];
