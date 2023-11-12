import axios from "axios";

const flashCardsApi = axios.create ({
    baseURL: "https://flash-cards-be.onrender.com/api",
})

export const getCards = async () => {
    const response = await flashCardsApi.get('/cards');
    // console.log(response)
    return response.data;
}

export const getSingleCard = async (card_id) => {
    const response = await flashCardsApi.get(`/cards/${card_id}`);
    // console.log("from api single card ", response)
    return response.data;
}

export const postCard = async (newCard) => {
    const response = await flashCardsApi.post('/cards', newCard);
    // console.log(response)
    return response.data.cards
}

export const deleteCard = async (card_id) => {
    const response = await flashCardsApi.delete(`/cards/${card_id}`);
    return response.data.card
}
export const getUsers = async () => {
    const response = await flashCardsApi.get('/users');
    
    return response.data
}

export const postUsers = async (newUser) => {
    const response = await flashCardsApi.post('/users', newUser);
    return response.data.user
}