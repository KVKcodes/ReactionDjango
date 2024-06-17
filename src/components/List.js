import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeForm from './RecipeForm';
import SearchBar from './SearchBar';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        axios.get('https://disher.pythonanywhere.com/api/recipes/')
            .then(response => {
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the recipes!', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`https://disher.pythonanywhere.com/api/recipes/${id}/`)
            .then(response => {
                fetchRecipes();
            })
            .catch(error => {
                console.error('There was an error deleting the recipe!', error);
            });
    };

    const handleEdit = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const clearSelectedRecipe = () => {
        setSelectedRecipe(null);
    };

    const handleSearch = (query) => {
        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query.toLowerCase()) ||
            recipe.category.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    return (
        <div className="container">
            <h1 className="my-4">Recipes</h1>
            <SearchBar onSearch={handleSearch} />
            <RecipeForm
                fetchRecipes={fetchRecipes}
                selectedRecipe={selectedRecipe}
                clearSelectedRecipe={clearSelectedRecipe}
            />
            <div className="row">
                {filteredRecipes.map(recipe => (
                    <div key={recipe.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{recipe.category}</h6>
                                <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                <p className="card-text"><strong>Instructions:</strong> {recipe.instructions}</p>
                                <button className="btn btn-primary m-2" onClick={() => handleEdit(recipe)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(recipe.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
