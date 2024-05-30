const getAllMealsApi = `https://recipe-organizer-api.azurewebsites.net/api/Meals/GetAll`

export const fetchMealsData = async () => {
    try {
        const response = await fetch(getAllMealsApi)
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}
