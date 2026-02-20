import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../db';
import type { Meal, Ingredient, MealType, MealLabel, MeasurementUnit, IngredientCategory } from '../types';
import styles from './MealFormModal.module.css';
import { ImageWithFallback } from './ImageWithFallback';
import placeholderSvg from '../assets/meal-placeholder.svg';

interface MealFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editMeal?: Meal | null; // If provided, form will be in edit mode
}

export function MealFormModal({ isOpen, onClose, onSuccess, editMeal }: MealFormModalProps) {
  const { t } = useTranslation();
  // Basic info
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [servings, setServings] = useState<string | number>('1');
  
  // Image
  const [imageUrl, setImageUrl] = useState('');
  
  // Ingredients
  type FormIngredient = Omit<Ingredient, 'quantity'> & { quantity: string | number };
  const [ingredients, setIngredients] = useState<FormIngredient[]>([
    { name: '', quantity: '0', unit: 'g', category: 'other' },
  ]);
  
  // Nutrition
  const [calories, setCalories] = useState<string | number>('0');
  const [protein, setProtein] = useState<string | number>('0');
  const [carbs, setCarbs] = useState<string | number>('0');
  const [fat, setFat] = useState<string | number>('0');
  
  // Recipe
  const [recipeType, setRecipeType] = useState<'url' | 'text'>('text');
  const [recipeContent, setRecipeContent] = useState('');
  
  // Labels
  const [selectedLabels, setSelectedLabels] = useState<MealLabel[]>([]);
  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [newLabelInput, setNewLabelInput] = useState('');
  
  const [error, setError] = useState('');

  // Load custom labels from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('customLabels');
    if (stored) {
      try {
        setCustomLabels(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse custom labels:', e);
      }
    }
  }, []);

  // Pre-fill form when editing
  useEffect(() => {
    if (editMeal) {
      setName(editMeal.name);
      setDescription(editMeal.description);
      setMealType(editMeal.mealType);
      setServings(editMeal.servings.toString());
      setImageUrl(editMeal.image.content);
      setIngredients(editMeal.ingredients.length > 0 ? editMeal.ingredients.map(i => ({ ...i, quantity: i.quantity.toString() })) : [{ name: '', quantity: '0', unit: 'g', category: 'other' }]);
      setCalories(editMeal.nutrition.calories.toString());
      setProtein(editMeal.nutrition.protein.toString());
      setCarbs(editMeal.nutrition.carbs.toString());
      setFat(editMeal.nutrition.fat.toString());
      setRecipeType(editMeal.recipe.type);
      setRecipeContent(editMeal.recipe.content);
      setSelectedLabels(editMeal.labels);
    }
  }, [editMeal]);

  if (!isOpen) return null;

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val === '') {
      setter('0');
      return;
    }
    if (val.length > 1 && val.startsWith('0') && val[1] !== '.') {
      val = val.replace(/^0+/, '');
    }
    setter(val);
  };

  const updateIngredientQuantity = (index: number, val: string) => {
    if (val === '') val = '0';
    if (val.length > 1 && val.startsWith('0') && val[1] !== '.') {
      val = val.replace(/^0+/, '');
    }
    const updated = [...ingredients];
    updated[index] = { ...updated[index], quantity: val };
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '0', unit: 'g', category: 'other' }]);
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

  const handleAddCustomLabel = () => {
    const trimmed = newLabelInput.trim().toLowerCase();
    
    // Validation
    if (!trimmed) {
      alert(t('mealForm.validation.emptyLabel', 'Label cannot be empty'));
      return;
    }
    
    if (trimmed.length > 20) {
      alert(t('mealForm.validation.labelLength', 'Label must be 20 characters or less'));
      return;
    }
    
    if (customLabels.includes(trimmed)) {
      alert(t('mealForm.validation.labelExists', 'This label already exists'));
      return;
    }
    
    // Add to custom labels
    const updatedLabels = [...customLabels, trimmed];
    setCustomLabels(updatedLabels);
    localStorage.setItem('customLabels', JSON.stringify(updatedLabels));
    
    // Reset and close modal
    setNewLabelInput('');
    setShowLabelModal(false);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError(t('mealForm.validation.nameRequired', 'Meal name is required'));
      return;
    }
    if (ingredients.some(ing => !ing.name.trim())) {
      setError(t('mealForm.validation.ingredientsRequired', 'All ingredients must have a name'));
      return;
    }

    try {
      const finalImageUrl = imageUrl.trim() || placeholderSvg;

      const mealData: Meal = {
        name: name.trim(),
        description: description.trim(),
        image: {
          type: 'url',
          content: finalImageUrl,
        },
        recipe: {
          type: recipeType,
          content: recipeContent.trim(),
        },
        ingredients: ingredients.filter(ing => ing.name.trim()).map(ing => ({ ...ing, quantity: Number(ing.quantity) || 0 })),
        nutrition: {
          calories: Number(calories) || 0,
          protein: Number(protein) || 0,
          carbs: Number(carbs) || 0,
          fat: Number(fat) || 0,
        },
        mealType,
        labels: selectedLabels,
        servings: Number(servings) || 1,
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
      setError(editMeal ? t('mealForm.validation.updateFailed', 'Failed to update meal') : t('mealForm.validation.createFailed', 'Failed to create meal'));
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setMealType('breakfast');
    setServings('1');
    setImageUrl('');
    setIngredients([{ name: '', quantity: '0', unit: 'g', category: 'other' }]);
    setCalories('0');
    setProtein('0');
    setCarbs('0');
    setFat('0');
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
          <h2>{editMeal ? t('mealForm.editTitle') : t('mealForm.createTitle')}</h2>
          <button onClick={handleClose} className={styles.closeButton}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Info Section */}
          <section className={styles.section}>
            <h3>{t('mealForm.basicInfo')}</h3>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name">{t('mealForm.mealName')} *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('mealForm.placeholders.name', 'e.g., Avocado Toast')}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">{t('mealForm.description')}</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('mealForm.placeholders.description', 'Brief description of the meal')}
                rows={3}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="mealType">{t('mealForm.mealType')} *</label>
                <select
                  id="mealType"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as MealType)}
                >
                  <option value="breakfast">{t('catalog.filters.breakfast')}</option>
                  <option value="lunch">{t('catalog.filters.lunch')}</option>
                  <option value="dinner">{t('catalog.filters.dinner')}</option>
                  <option value="snack">{t('catalog.filters.snack')}</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="servings">{t('mealForm.servings')} *</label>
                <input
                  id="servings"
                  type="number"
                  min="1"
                  value={servings}
                  onChange={handleNumberChange(setServings)}
                />
              </div>
            </div>
          </section>

          {/* Image Section */}
          <section className={styles.section}>
            <h3>{t('mealForm.image')}</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="imageUrl">{t('mealForm.imageUrl')}</label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              {imageUrl && (
                <div className={styles.imagePreview}>
                  <ImageWithFallback src={imageUrl} alt="Preview" />
                </div>
              )}
            </div>
          </section>

          {/* Ingredients Section */}
          <section className={styles.section}>
            <h3>{t('mealForm.ingredients')}</h3>
            {ingredients.map((ingredient, index) => (
              <div key={index} className={styles.ingredientRow}>
                <input
                  type="text"
                  placeholder={t('mealForm.placeholders.ingredientName', 'Name')}
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder={t('mealForm.placeholders.quantity', 'Qty')}
                  min="0"
                  step="0.1"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredientQuantity(index, e.target.value)}
                />
                <select
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value as MeasurementUnit)}
                >
                  <option value="g">{t('units.g', 'g')}</option>
                  <option value="kg">{t('units.kg', 'kg')}</option>
                  <option value="ml">{t('units.ml', 'ml')}</option>
                  <option value="l">{t('units.l', 'l')}</option>
                  <option value="pcs">{t('units.pcs', 'pcs')}</option>
                  <option value="tbsp">{t('units.tbsp', 'tbsp')}</option>
                  <option value="tsp">{t('units.tsp', 'tsp')}</option>
                  <option value="cup">{t('units.cup', 'cup')}</option>
                </select>
                <select
                  value={ingredient.category}
                  onChange={(e) => updateIngredient(index, 'category', e.target.value as IngredientCategory)}
                >
                  <option value="dairy">{t('shoppingList.categories.dairy')}</option>
                  <option value="produce">{t('shoppingList.categories.produce')}</option>
                  <option value="meat">{t('shoppingList.categories.meat')}</option>
                  <option value="grains">{t('shoppingList.categories.grains')}</option>
                  <option value="spices">{t('shoppingList.categories.spices')}</option>
                  <option value="other">{t('shoppingList.categories.other')}</option>
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
              + {t('mealForm.buttons.addIngredient')}
            </button>
          </section>

          {/* Nutrition Section */}
          <section className={styles.section}>
            <h3>{t('mealForm.nutritionFacts')}</h3>
            <div className={styles.nutritionGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="calories">{t('common.calories')}</label>
                <input
                  id="calories"
                  type="number"
                  min="0"
                  value={calories}
                  onChange={handleNumberChange(setCalories)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="protein">{t('common.protein')} ({t('units.g', 'g')})</label>
                <input
                  id="protein"
                  type="number"
                  min="0"
                  step="0.1"
                  value={protein}
                  onChange={handleNumberChange(setProtein)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="carbs">{t('common.carbs')} ({t('units.g', 'g')})</label>
                <input
                  id="carbs"
                  type="number"
                  min="0"
                  step="0.1"
                  value={carbs}
                  onChange={handleNumberChange(setCarbs)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="fat">{t('common.fat')} ({t('units.g', 'g')})</label>
                <input
                  id="fat"
                  type="number"
                  min="0"
                  step="0.1"
                  value={fat}
                  onChange={handleNumberChange(setFat)}
                />
              </div>
            </div>
          </section>

          {/* Labels Section */}
          <section className={styles.section}>
            <h3>{t('mealForm.labels.title')} ({t('mealForm.labels.optional')})</h3>
            <div className={styles.labelsGrid}>
              {/* Default labels */}
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
              
              {/* Custom labels */}
              {customLabels.map((label) => (
                <label key={label} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedLabels.includes(label as MealLabel)}
                    onChange={() => toggleLabel(label as MealLabel)}
                  />
                  <span>{label}</span>
                </label>
              ))}
              
              {/* Add custom label button */}
              <button
                type="button"
                className={styles.addLabelButton}
                onClick={() => setShowLabelModal(true)}
                title={t('mealForm.buttons.addLabel')}
              >
                +
              </button>
            </div>
          </section>

          {/* Custom Label Modal */}
          {showLabelModal && (
            <div className={styles.labelModalOverlay} onClick={() => setShowLabelModal(false)}>
              <div className={styles.labelModalContent} onClick={(e) => e.stopPropagation()}>
                <h4>{t('mealForm.labels.addCustom')}</h4>
                <input
                  type="text"
                  value={newLabelInput}
                  onChange={(e) => setNewLabelInput(e.target.value)}
                  placeholder={t('mealForm.labels.placeholder', 'Enter label (max 20 chars)')}
                  maxLength={20}
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomLabel()}
                />
                <div className={styles.labelModalButtons}>
                  <button type="button" onClick={handleAddCustomLabel}>
                    {t('common.add')}
                  </button>
                  <button type="button" onClick={() => {
                    setNewLabelInput('');
                    setShowLabelModal(false);
                  }}>
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Recipe Section */}
          <section className={styles.section}>
            <h3>{t('mealForm.recipe.title')}</h3>
            <div className={styles.recipeToggle}>
              <button
                type="button"
                className={recipeType === 'text' ? styles.active : ''}
                onClick={() => setRecipeType('text')}
              >
                {t('mealForm.recipe.text')}
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
                  placeholder={t('mealForm.recipe.placeholder', 'Enter cooking instructions...')}
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
              {t('common.cancel')}
            </button>
            <button type="submit" className={styles.submitButton}>
              {editMeal ? t('common.save') : t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
