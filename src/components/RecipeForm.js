import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeForm = ({ fetchRecipes, selectedRecipe, clearSelectedRecipe }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (selectedRecipe) {
            setTitle(selectedRecipe.title);
            setIngredients(selectedRecipe.ingredients);
            setInstructions(selectedRecipe.instructions);
            setCategory(selectedRecipe.category);
        }
    }, [selectedRecipe]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipeData = {
            title,
            ingredients,
            instructions,
            category
        };

        if (selectedRecipe) {
            axios.put(`https://disher.pythonanywhere.com//api/recipes/${selectedRecipe.id}/`, recipeData)
                .then(response => {
                    fetchRecipes();
                    clearSelectedRecipe();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the recipe!', error);
                });
        } else {
            axios.post('http://localhost:8000/api/recipes/', recipeData)
                .then(response => {
                    fetchRecipes();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error creating the recipe!', error);
                });
        }
    };

    const resetForm = () => {
        setTitle('');
        setIngredients('');
        setInstructions('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2>{selectedRecipe ? 'Edit Recipe' : 'Add a new recipe'}</h2>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Ingredients</label>
                <textarea
                    className="form-control"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Instructions</label>
                <textarea
                    className="form-control"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Category</label>
                <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <button type="submit" style={{marginRight: "0.7rem"}} className="btn btn-success mt-3">{selectedRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
            {selectedRecipe && (
                <button type="button" className="btn btn-secondary mt-3" onClick={() => clearSelectedRecipe()}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default RecipeForm;
