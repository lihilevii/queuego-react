// מיפוי קטגוריות בין העברית (תוויות UI) לאנגלית (מה שמאוחסן ב-DB)
export const categories = ['הכל', 'קניון', 'סופר', 'אוכל'];

export const categoryMap = {
  'הכל': 'All',
  'קניון': 'Mall',
  'סופר': 'Supermarket',
  'אוכל': 'Food',
};

// הכיוון ההפוך - מהקטגוריה ב-DB לתווית בעברית להצגה בכרטיסים
export const categoryLabels = {
  Mall: 'קניון',
  Supermarket: 'סופר',
  Food: 'אוכל',
};

export function categoryLabel(category) {
  return categoryLabels[category] || category;
}
