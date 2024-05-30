import api from "./api";

export const fetchCountriesAddData = async () => {
    const response = await api.get('api/Countries/GetCountriesAdd')
    const data = await response.json()
    return data
}
