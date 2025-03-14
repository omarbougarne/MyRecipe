export interface Recipe {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    ingredients: Ingredient[];
    dateModified: string | null;
}

export interface Ingredient {
    name: string;
    measure: string;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface Area {
    strArea: string;
}

export interface ApiResponse<T> {
    meals: T[] | null;
    categories?: Category[];
}