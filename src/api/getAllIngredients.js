const getAllIngredientsApi = `https://recipe-organizer-api.azurewebsites.net/api/Ingredients/GetAll`

export const fetchIngredientData = async () => {
    try {
        const response = await fetch(getAllIngredientsApi)
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}
