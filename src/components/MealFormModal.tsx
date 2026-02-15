import { useState, useEffect, type FormEvent } from 'react';
import { db } from '../db';
import type { Meal, Ingredient, MealType, MealLabel, MeasurementUnit, IngredientCategory } from '../types';
import styles from './MealFormModal.module.css';

interface MealFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editMeal?: Meal | null; // If provided, form will be in edit mode
}

export function MealFormModal({ isOpen, onClose, onSuccess, editMeal }: MealFormModalProps) {
  // Basic info
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [servings, setServings] = useState(1);
  
  // Image
  const [imageUrl, setImageUrl] = useState('');
  
  // Ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantity: 0, unit: 'g', category: 'other' },
  ]);
  
  // Nutrition
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  
  // Recipe
  const [recipeType, setRecipeType] = useState<'url' | 'text'>('text');
  const [recipeContent, setRecipeContent] = useState('');
  
  // Labels
  const [selectedLabels, setSelectedLabels] = useState<MealLabel[]>([]);
  
  const [error, setError] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (editMeal) {
      setName(editMeal.name);
      setDescription(editMeal.description);
      setMealType(editMeal.mealType);
      setServings(editMeal.servings);
      setImageUrl(editMeal.image.content);
      setIngredients(editMeal.ingredients.length > 0 ? editMeal.ingredients : [{ name: '', quantity: 0, unit: 'g', category: 'other' }]);
      setCalories(editMeal.nutrition.calories);
      setProtein(editMeal.nutrition.protein);
      setCarbs(editMeal.nutrition.carbs);
      setFat(editMeal.nutrition.fat);
      setRecipeType(editMeal.recipe.type);
      setRecipeContent(editMeal.recipe.content);
      setSelectedLabels(editMeal.labels);
    }
  }, [editMeal]);

  if (!isOpen) return null;

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: 'g', category: 'other' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const toggleLabel = (label: MealLabel) => {
    setSelectedLabels(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Meal name is required');
      return;
    }
    if (!imageUrl.trim()) {
      setError('Image URL is required');
      return;
    }
    if (calories <= 0) {
      setError('Calories must be greater than 0');
      return;
    }
    if (ingredients.some(ing => !ing.name.trim())) {
      setError('All ingredients must have a name');
      return;
    }

    try {
      const totalPrice = ingredients.reduce((sum, ing) => {
        return sum + (ing.pricePerUnit || 0) * ing.quantity;
      }, 0);

      const mealData: Meal = {
        name: name.trim(),
        description: description.trim(),
        image: {
          type: 'url',
          content: imageUrl.trim(),
        },
        recipe: {
          type: recipeType,
          content: recipeContent.trim(),
        },
        ingredients: ingredients.filter(ing => ing.name.trim()),
        nutrition: {
          calories,
          protein,
          carbs,
          fat,
        },
        mealType,
        labels: selectedLabels,
        servings,
        totalPrice,
        createdAt: editMeal?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (editMeal) {
        // Update existing meal
        await db.meals.put({ ...mealData, id: editMeal.id });
      } else {
        // Create new meal
        await db.meals.add(mealData);
      }
      
      onSuccess();
      resetForm();
      onClose();
    } catch (err) {
      console.error(`Failed to ${editMeal ? 'update' : 'create'} meal:`, err);
      setError(`Failed to ${editMeal ? 'update' : 'create'} meal. Please try again.`);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setMealType('breakfast');
    setServings(1);
    setImageUrl('');
    setIngredients([{ name: '', quantity: 0, unit: 'g', category: 'other' }]);
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setFat(0);
    setRecipeType('text');
    setRecipeContent('');
    setSelectedLabels([]);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{editMeal ? 'Edit Meal' : 'Create New Meal'}</h2>
          <button onClick={handleClose} className={styles.closeButton}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Info Section */}
          <section className={styles.section}>
            <h3>Basic Information</h3>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name">Meal Name *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Avocado Toast"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the meal"
                rows={3}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="mealType">Meal Type *</label>
                <select
                  id="mealType"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as MealType)}
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="servings">Servings *</label>
                <input
                  id="servings"
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                />
              </div>
            </div>
          </section>

          {/* Image Section */}
          <section className={styles.section}>
            <h3>Image</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="imageUrl">Image URL *</label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />
              {imageUrl && (
                <div className={styles.imagePreview}>
                  <img src={imageUrl} alt="Preview" />
                </div>
              )}
            </div>
          </section>

          {/* Ingredients Section */}
          <section className={styles.section}>
            <h3>Ingredients</h3>
            {ingredients.map((ingredient, index) => (
              <div key={index} className={styles.ingredientRow}>
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="0"
                  step="0.1"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, 'quantity', Number(e.target.value))}
                />
                <select
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value as MeasurementUnit)}
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="l">l</option>
                  <option value="pcs">pcs</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="cup">cup</option>
                </select>
                <select
                  value={ingredient.category}
                  onChange={(e) => updateIngredient(index, 'category', e.target.value as IngredientCategory)}
                >
                  <option value="dairy">Dairy</option>
                  <option value="produce">Produce</option>
                  <option value="meat">Meat</option>
                  <option value="grains">Grains</option>
                  <option value="spices">Spices</option>
                  <option value="other">Other</option>
                </select>
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient} className={styles.addButton}>
              + Add Ingredient
            </button>
          </section>

          {/* Nutrition Section */}
          <section className={styles.section}>
            <h3>Nutrition Facts (per serving)</h3>
            <div className={styles.nutritionGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="calories">Calories *</label>
                <input
                  id="calories"
                  type="number"
                  min="0"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="protein">Protein (g)</label>
                <input
                  id="protein"
                  type="number"
                  min="0"
                  step="0.1"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="carbs">Carbs (g)</label>
                <input
                  id="carbs"
                  type="number"
                  min="0"
                  step="0.1"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="fat">Fat (g)</label>
                <input
                  id="fat"
                  type="number"
                  min="0"
                  step="0.1"
                  value={fat}
                  onChange={(e) => setFat(Number(e.target.value))}
                />
              </div>
            </div>
          </section>

          {/* Labels Section */}
          <section className={styles.section}>
            <h3>Labels (optional)</h3>
            <div className={styles.labelsGrid}>
              {(['quick', 'high-protein', 'low-carb', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free'] as MealLabel[]).map((label) => (
                <label key={label} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedLabels.includes(label)}
                    onChange={() => toggleLabel(label)}
                  />
                  <span>{label.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Recipe Section */}
          <section className={styles.section}>
            <h3>Recipe Instructions</h3>
            <div className={styles.recipeToggle}>
              <button
                type="button"
                className={recipeType === 'text' ? styles.active : ''}
                onClick={() => setRecipeType('text')}
              >
                Text
              </button>
              <button
                type="button"
                className={recipeType === 'url' ? styles.active : ''}
                onClick={() => setRecipeType('url')}
              >
                URL
              </button>
            </div>
            <div className={styles.inputGroup}>
              {recipeType === 'text' ? (
                <textarea
                  value={recipeContent}
                  onChange={(e) => setRecipeContent(e.target.value)}
                  placeholder="Enter cooking instructions..."
                  rows={5}
                />
              ) : (
                <input
                  type="url"
                  value={recipeContent}
                  onChange={(e) => setRecipeContent(e.target.value)}
                  placeholder="https://example.com/recipe"
                />
              )}
            </div>
          </section>

          {/* Error Message */}
          {error && <div className={styles.error}>{error}</div>}

          {/* Form Actions */}
          <div className={styles.actions}>
            <button type="button" onClick={handleClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {editMeal ? 'Save Changes' : 'Create Meal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
