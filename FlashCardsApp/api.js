import axios from "axios";

const flashCardsApi = axios.create ({
    baseURL: "https://flash-cards-be.onrender.com/api",
})

export const getCards = async () => {
    const response = await flashCardsApi.get('/cards');
    console.log(response)
    return response.data.cards
}

export const singleFlashCard = async (card_id) => {
    const response = await flashCardsApi.get(`/cards/${card_id}`);
    return response.data.card;
}

export const postCard = async (newCard) => {
    const response = await flashCardsApi.post('/cards', newCard);
    console.log(response)
    return response.data.cards
}