# Mealog — Meal Import Contract

This document defines the data contract for adding new meals to Mealog.
Use it when manually authoring seed files, asking an AI to generate meals,
or building any tooling that imports meal data.

<!-- Prompt example:
"Generate 20 high-protein dinner meals following the Mealog import contract. Output as a TypeScript array." -->

---

## Quick reference

| Field         | Type           | Required | Notes                                         |
| ------------- | -------------- | -------- | --------------------------------------------- |
| `name`        | `string`       | ✅       | Unique. Title-cased. Max ~60 chars.           |
| `description` | `string`       | ✅       | 1–2 sentences. Max ~200 chars.                |
| `image`       | `Image`        | ✅       | Unsplash URL preferred (see below)            |
| `recipe`      | `Recipe`       | ✅       | URL or inline text instructions               |
| `ingredients` | `Ingredient[]` | ✅       | Min 2 ingredients                             |
| `nutrition`   | `Nutrition`    | ✅       | Per-serving, USDA-sourced                     |
| `mealType`    | `MealType`     | ✅       | `breakfast` \| `lunch` \| `dinner` \| `snack` |
| `labels`      | `MealLabel[]`  | ✅       | Can be empty `[]`. See valid values.          |
| `servings`    | `number`       | ✅       | Integer ≥ 2                                   |

> **Do NOT include** `id`, `createdAt`, `updatedAt`, `householdId`, `dirty`, `lastUpdated` —
> those are set automatically by the system.

---

## Field definitions

### `name` — string (required)

- Unique across the entire catalog (deduplication is name-based)
- Title-case: `"Grilled Salmon Salad"`, not `"grilled salmon salad"`
- No emoji, no trailing punctuation

```
✅  "Overnight Oats with Chia Seeds"
❌  "overnight oats"
❌  "Overnight Oats 🌿"
```

---

### `description` — string (required)

- 1–2 sentences describing the dish and key ingredients/flavours
- No markdown, no newlines

```
✅  "Creamy overnight oats with chia seeds, almond milk, and fresh berries."
❌  "Delicious!\nMake it today!"
```

---

### `image` — object (required)

```ts
{
  type: "url",           // always "url" for seed/import meals
  content: string        // Unsplash URL with ?w=400 suffix
}
```

**Format:** `https://images.unsplash.com/photo-<ID>?w=400`

Use a relevant Unsplash photo that actually matches the dish.
Browse at [unsplash.com](https://unsplash.com) and copy the photo URL.

```json
{
  "type": "url",
  "content": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
}
```

---

### `recipe` — object (required)

Two supported formats:

```ts
// Option A — inline text instructions
{ "type": "text", "content": "Step 1. Do X. Step 2. Do Y." }

// Option B — link to an external recipe
{ "type": "url",  "content": "https://www.example.com/my-recipe" }
```

For seed/AI-generated meals, prefer `"text"` with concise steps (1–4 sentences).

---

### `ingredients` — array (required, min 2)

Each ingredient:

```ts
{
  name: string,           // Common name, e.g. "Chicken breast"
  quantity: number,       // Total for the whole recipe (all servings combined)
  unit: MeasurementUnit,  // See valid values below
  category: IngredientCategory  // See valid values below
}
```

#### `unit` — valid values

| Value    | Meaning              |
| -------- | -------------------- |
| `"g"`    | grams                |
| `"kg"`   | kilograms            |
| `"ml"`   | millilitres          |
| `"l"`    | litres               |
| `"pcs"`  | pieces / whole items |
| `"tbsp"` | tablespoon           |
| `"tsp"`  | teaspoon             |
| `"cup"`  | cup                  |

#### `category` — valid values

| Value       | Examples                                                           |
| ----------- | ------------------------------------------------------------------ |
| `"produce"` | vegetables, fruit, herbs                                           |
| `"meat"`    | chicken, beef, fish, shrimp                                        |
| `"dairy"`   | milk, cheese, yogurt, eggs, butter                                 |
| `"grains"`  | rice, pasta, bread, oats, flour                                    |
| `"spices"`  | salt, pepper, cumin, paprika, cinnamon                             |
| `"other"`   | olive oil, coconut milk, soy sauce, canned beans, nut butter, etc. |

---

### `nutrition` — object (required)

> ⚠️ All values are **per serving** (divide total recipe by `servings`).
> Cross-reference with [USDA FoodData Central](https://fdc.nal.usda.gov/).

#### Macronutrients (all required)

| Field      | Unit  | Notes                                     |
| ---------- | ----- | ----------------------------------------- |
| `calories` | kcal  | Round to nearest 5                        |
| `protein`  | grams | Round to nearest 0.5                      |
| `carbs`    | grams | Total carbohydrates, round to nearest 0.5 |
| `fat`      | grams | Total fat, round to nearest 0.5           |

#### Micronutrients (all optional, as % of daily value)

| Field      | Unit  | Daily value reference |
| ---------- | ----- | --------------------- |
| `fiber`    | grams | —                     |
| `vitaminC` | % DV  | 90 mg/day             |
| `vitaminD` | % DV  | 20 mcg/day            |
| `calcium`  | % DV  | 1300 mg/day           |
| `iron`     | % DV  | 18 mg/day             |

```json
{
  "calories": 450,
  "protein": 38,
  "carbs": 42,
  "fat": 14,
  "fiber": 6,
  "vitaminC": 25,
  "iron": 15
}
```

---

### `mealType` — enum (required)

| Value         | When to use                                 |
| ------------- | ------------------------------------------- |
| `"breakfast"` | Morning meals, ≤ ~500 cal/serving typically |
| `"lunch"`     | Midday meals                                |
| `"dinner"`    | Evening / main meals                        |
| `"snack"`     | Light bites, ≤ ~300 cal/serving typically   |

---

### `labels` — array (required, can be empty)

Pick all that apply. Use `[]` if none apply.

| Label            | Meaning                           |
| ---------------- | --------------------------------- |
| `"quick"`        | Ready in under 30 minutes         |
| `"high-protein"` | ≥ 25g protein per serving         |
| `"low-carb"`     | ≤ 20g carbs per serving           |
| `"vegetarian"`   | No meat or fish                   |
| `"vegan"`        | No animal products at all         |
| `"gluten-free"`  | No gluten-containing ingredients  |
| `"dairy-free"`   | No dairy products                 |
| `"delicates"`    | Special occasion / elaborate dish |

---

### `servings` — number (required)

- Integer ≥ **2** (required by the app's design)
- Ingredients and nutrition must reflect the **total batch** vs **per serving** respectively
- Common values: `2`, `3`, `4`, `6`

---

## Minimum valid example (TypeScript)

```ts
{
  name: "Lemon Herb Chicken",
  description: "Pan-seared chicken breast with lemon, garlic, and fresh herbs.",
  image: {
    type: "url",
    content: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
  },
  recipe: {
    type: "text",
    content:
      "Season chicken with salt, pepper, garlic, and herbs. Sear in olive oil 6 min per side. Deglaze with lemon juice.",
  },
  ingredients: [
    { name: "Chicken breast", quantity: 400, unit: "g",    category: "meat" },
    { name: "Lemon",          quantity: 2,   unit: "pcs",  category: "produce" },
    { name: "Garlic",         quantity: 3,   unit: "pcs",  category: "produce" },
    { name: "Olive oil",      quantity: 2,   unit: "tbsp", category: "other" },
    { name: "Fresh thyme",    quantity: 1,   unit: "tbsp", category: "spices" },
  ],
  nutrition: {
    calories: 320,
    protein: 40,
    carbs: 4,
    fat: 16,
    vitaminC: 30,
  },
  mealType: "dinner",
  labels: ["high-protein", "gluten-free", "dairy-free", "low-carb"],
  servings: 2,
}
```

---

## Minimum valid example (JSON)

```json
{
  "name": "Lemon Herb Chicken",
  "description": "Pan-seared chicken breast with lemon, garlic, and fresh herbs.",
  "image": {
    "type": "url",
    "content": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400"
  },
  "recipe": {
    "type": "text",
    "content": "Season chicken with salt, pepper, garlic, and herbs. Sear in olive oil 6 min per side. Deglaze with lemon juice."
  },
  "ingredients": [
    {
      "name": "Chicken breast",
      "quantity": 400,
      "unit": "g",
      "category": "meat"
    },
    { "name": "Lemon", "quantity": 2, "unit": "pcs", "category": "produce" },
    { "name": "Garlic", "quantity": 3, "unit": "pcs", "category": "produce" },
    { "name": "Olive oil", "quantity": 2, "unit": "tbsp", "category": "other" },
    {
      "name": "Fresh thyme",
      "quantity": 1,
      "unit": "tbsp",
      "category": "spices"
    }
  ],
  "nutrition": {
    "calories": 320,
    "protein": 40,
    "carbs": 4,
    "fat": 16,
    "vitaminC": 30
  },
  "mealType": "dinner",
  "labels": ["high-protein", "gluten-free", "dairy-free", "low-carb"],
  "servings": 2
}
```

---

## AI prompt template

When asking an AI model to generate meals, use this prompt:

```
Generate [N] meal entries for Mealog following this contract:

REQUIRED FIELDS:
- name: string — unique, title-case, max 60 chars
- description: string — 1-2 sentences
- image: { type: "url", content: "https://images.unsplash.com/photo-<RELEVANT_ID>?w=400" }
- recipe: { type: "text", content: "brief step-by-step" }
- ingredients: array of { name, quantity (total for recipe), unit, category }
  - unit values: "g" | "kg" | "ml" | "l" | "pcs" | "tbsp" | "tsp" | "cup"
  - category values: "produce" | "meat" | "dairy" | "grains" | "spices" | "other"
- nutrition: { calories, protein, carbs, fat } — per serving, USDA-verified
- mealType: "breakfast" | "lunch" | "dinner" | "snack"
- labels: array from ["quick","high-protein","low-carb","vegetarian","vegan","gluten-free","dairy-free"]
- servings: integer ≥ 2

RULES:
- Nutrition values are PER SERVING
- Ingredients quantities are for the WHOLE RECIPE
- servings must be ≥ 2
- Do NOT include: id, createdAt, updatedAt, householdId
- Output as a valid TypeScript array (Omit<Meal, "id"|"createdAt"|"updatedAt">[])
```

---

## How to add new meals

### Option A — Add to an existing seed category file

1. Open one of: `src/db/seeds/breakfasts.ts`, `lunches.ts`, `dinners.ts`, `snacks.ts`
2. Append your meal object to the exported array
3. Bump `SEED_VERSION` in `src/db/seed.ts` (e.g. `2` → `3`)
4. Run `npm run build` to validate types
5. On next app launch, new meals are injected automatically

### Option B — Add a new seed category file

1. Create `src/db/seeds/myCategory.ts` exporting `myCategorySeeds`
2. Import and spread it in `src/db/seeds/index.ts`
3. Bump `SEED_VERSION` in `src/db/seed.ts`

### Option C — Runtime JSON import (future)

Not yet implemented. When built, it would accept a JSON array matching
this contract and call `db.meals.bulkAdd()` after validation.
