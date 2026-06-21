/* ============================================
   JOINT JOURNEY - Recipes & Shopping List
   ============================================ */

let currentRecipeCategory = 'breakfast';

function initRecipes() {
  showRecipeCategory('breakfast');
}

function showRecipeCategory(category) {
  currentRecipeCategory = category;
  const recipes = RECIPES[category] || [];
  const container = document.getElementById('recipe-grid');

  // Update sub-tabs
  const tabContainer = document.querySelector('#nutrition-recipes > .tabs');
  if (tabContainer) {
    const cats = ['breakfast', 'lunch-dinner', 'snacks', 'special'];
    tabContainer.querySelectorAll('.tab').forEach((t, i) => {
      t.classList.toggle('active', cats[i] === category);
    });
  }

  let html = '';
  recipes.forEach(r => {
    const tried = (currentUser.progress.recipesTried || []).includes(r.id);
    html += '<div class="recipe-card" onclick="openRecipe(\'' + r.id + '\', \'' + category + '\')">';
    html += '<div class="recipe-card-emoji">' + r.emoji + '</div>';
    html += '<div class="recipe-card-title">' + r.name + (tried ? ' ✅' : '') + '</div>';
    html += '<div class="recipe-card-meta">';
    html += '<span><strong>' + r.calories + '</strong> cal</span>';
    html += '<span><strong>' + r.protein + 'g</strong> protein</span>';
    html += '<span>' + (r.prepTime + r.cookTime) + ' mins</span>';
    html += '</div></div>';
  });

  container.innerHTML = html;
}

function openRecipe(id, category) {
  const recipes = RECIPES[category] || [];
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  document.getElementById('recipe-modal-title').textContent = recipe.emoji + ' ' + recipe.name;

  const tried = (currentUser.progress.recipesTried || []).includes(id);
  let html = '';

  // Stats
  html += '<div class="recipe-modal-stats">';
  html += '<div class="recipe-modal-stat"><div class="recipe-modal-stat-value">' + recipe.calories + '</div><div class="recipe-modal-stat-label">Calories</div></div>';
  html += '<div class="recipe-modal-stat"><div class="recipe-modal-stat-value">' + recipe.protein + 'g</div><div class="recipe-modal-stat-label">Protein</div></div>';
  html += '<div class="recipe-modal-stat"><div class="recipe-modal-stat-value">' + (recipe.prepTime + recipe.cookTime) + '</div><div class="recipe-modal-stat-label">Minutes</div></div>';
  html += '</div>';

  html += '<p style="color:var(--text-muted);">Serves ' + recipe.serves + ' • ' + recipe.difficulty + ' • Prep: ' + recipe.prepTime + ' min, Cook: ' + recipe.cookTime + ' min</p>';

  // Ingredients
  html += '<div class="recipe-section"><h4>🛒 Ingredients</h4><ul>';
  recipe.ingredients.forEach(ing => {
    html += '<li><strong>' + ing.item + '</strong> - ' + ing.qty + '</li>';
  });
  html += '</ul></div>';

  // Method
  html += '<div class="recipe-section"><h4>👩‍🍳 Method</h4><ol>';
  recipe.method.forEach(step => {
    html += '<li>' + step + '</li>';
  });
  html += '</ol></div>';

  // Tip
  if (recipe.tip) {
    html += '<div class="recipe-tip">💡 <strong>Tip:</strong> ' + recipe.tip + '</div>';
  }

  // Actions
  html += '<div class="recipe-actions">';
  html += '<button class="btn btn-primary" onclick="addToShoppingList(\'' + id + '\', \'' + category + '\')">🛒 Add to Shopping List</button>';
  html += '<button class="btn ' + (tried ? 'btn-ghost' : 'btn-secondary') + '" onclick="markRecipeTried(\'' + id + '\')">' + (tried ? '✅ Tried!' : 'Mark as Tried') + '</button>';
  html += '</div>';

  document.getElementById('recipe-modal-body').innerHTML = html;

  // Show modal
  document.getElementById('recipe-modal').classList.add('active');
}

function closeRecipeModal(event) {
  if (event && event.target !== document.getElementById('recipe-modal')) return;
  document.getElementById('recipe-modal').classList.remove('active');
}

// Close on no-argument call
function closeRecipeModal(event) {
  if (!event || event.target === document.getElementById('recipe-modal')) {
    document.getElementById('recipe-modal').classList.remove('active');
  }
}

function markRecipeTried(id) {
  if (!currentUser.progress.recipesTried) currentUser.progress.recipesTried = [];
  if (!currentUser.progress.recipesTried.includes(id)) {
    currentUser.progress.recipesTried.push(id);
    saveUser();
    showToast('Recipe marked as tried! 🍳');
  }
  closeRecipeModal();
  showRecipeCategory(currentRecipeCategory);
}

// ===== SHOPPING LIST =====
function addToShoppingList(id, category) {
  const recipes = RECIPES[category] || [];
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  if (!currentUser.progress.shoppingList) currentUser.progress.shoppingList = [];

  recipe.ingredients.forEach(ing => {
    const existing = currentUser.progress.shoppingList.find(
      i => i.item === ing.item && i.recipeId === id
    );
    if (!existing) {
      currentUser.progress.shoppingList.push({
        item: ing.item,
        qty: ing.qty,
        aisle: ing.aisle,
        recipeId: id,
        recipeName: recipe.name,
        checked: false
      });
    }
  });

  saveUser();
  showToast('Added to shopping list! 🛒');
  closeRecipeModal();
}

// Smart quantity merging - adds up numbers with matching units
function mergeQuantities(qty1, qty2) {
  const parsed1 = parseQty(qty1);
  const parsed2 = parseQty(qty2);

  // If both have numeric values and same unit, add them
  if (parsed1.num !== null && parsed2.num !== null && parsed1.unit === parsed2.unit) {
    const total = Math.round((parsed1.num + parsed2.num) * 100) / 100;
    return total + (parsed1.unit ? parsed1.unit : '');
  }

  // Can't merge cleanly - concatenate with +
  return qty1 + ' + ' + qty2;
}

function parseQty(qty) {
  if (!qty || typeof qty !== 'string') return { num: null, unit: '' };
  qty = qty.trim();

  // Match patterns like "2", "200g", "1.5 tbsp", "2 tins", "½", "1/2"
  const match = qty.match(/^(\d+(?:\.\d+)?(?:\/\d+)?)\s*(.*)$/);
  if (match) {
    let num = match[1];
    // Handle fractions like 1/2
    if (num.includes('/')) {
      const parts = num.split('/');
      num = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      num = parseFloat(num);
    }
    return { num: num, unit: match[2].trim() };
  }

  // Handle unicode fractions
  const fractions = { '½': 0.5, '⅓': 0.333, '⅔': 0.667, '¼': 0.25, '¾': 0.75 };
  for (const [frac, val] of Object.entries(fractions)) {
    if (qty.startsWith(frac)) {
      return { num: val, unit: qty.slice(frac.length).trim() };
    }
  }

  return { num: null, unit: '' };
}

function renderShoppingList() {
  const list = currentUser.progress.shoppingList || [];
  const container = document.getElementById('shopping-list-content');

  if (list.length === 0) {
    container.innerHTML = '<p class="text-center" style="color: var(--text-muted); padding: var(--space-2xl);">Your shopping list is empty.<br>Add recipes from the Recipes tab to build your list!</p>';
    return;
  }

  // Group by aisle and smartly merge quantities
  const aisles = {};
  list.forEach(item => {
    if (!aisles[item.aisle]) aisles[item.aisle] = [];
    // Case-insensitive match for same items
    const existing = aisles[item.aisle].find(i => i.item.toLowerCase() === item.item.toLowerCase());
    if (existing) {
      existing.qty = mergeQuantities(existing.qty, item.qty);
    } else {
      aisles[item.aisle].push({ ...item });
    }
  });

  const aisleOrder = ['Fresh', 'Fridge', 'Freezer', 'Bakery', 'Cupboard'];
  let html = '';

  aisleOrder.forEach(aisle => {
    if (!aisles[aisle]) return;
    html += '<div class="shopping-aisle">';
    html += '<div class="shopping-aisle-title">' + getAisleEmoji(aisle) + ' ' + aisle + '</div>';
    aisles[aisle].forEach(item => {
      html += '<div class="shopping-item ' + (item.checked ? 'checked' : '') + '" onclick="toggleShoppingItem(this, \'' + escapeStr(item.item) + '\')">';
      html += '<input type="checkbox" ' + (item.checked ? 'checked' : '') + ' onclick="event.stopPropagation()">';
      html += '<span>' + item.item + ' - ' + item.qty + '</span>';
      html += '</div>';
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

function getAisleEmoji(aisle) {
  const emojis = { Fresh: '🥬', Fridge: '🧊', Freezer: '❄️', Bakery: '🍞', Cupboard: '🏪' };
  return emojis[aisle] || '🛒';
}

function escapeStr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function toggleShoppingItem(el, itemName) {
  const list = currentUser.progress.shoppingList || [];
  list.forEach(item => {
    if (item.item === itemName) item.checked = !item.checked;
  });
  saveUser();
  renderShoppingList();
}

function clearShoppingList() {
  currentUser.progress.shoppingList = [];
  saveUser();
  renderShoppingList();
  showToast('Shopping list cleared.');
}

function printShoppingList() {
  window.print();
}
