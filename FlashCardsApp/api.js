import axios from "axios";

const flashCardsApi = axios.create ({
    baseURL: "https://flash-cards-be.onrender.com/api",
})

export const getCards = async (topic) => {
    const params = {}; 
    if (topic && topic.slug) {
        params.topic = topic.slug;
    }
    console.log('API Request Params:', params);
    const response = await flashCardsApi.get('/cards', {params});
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
// delete card


//  isCOrrect answer => patch request
export const updateCardIsCorrect = async (card_id, answer, topic, isCorrect) => {
    try {
        const response = await flashCardsApi.patch(`/cards/${card_id}`, {
            answer: answer,
            topic: topic,
            isCorrect: isCorrect,
        });
        return response.data.card;
    } catch (error) {
        console.error('Error updating card:', error);
        throw error;
    }
};

//reset "isCorrect" property for all cards or on certain topic

export const resetAllCardsIsCorrect = async (topic) => {
    const params = {}; 
    if (topic && topic.slug) {
        params.topic = topic.slug;
    }
    const response = await flashCardsApi.patch('/cards', { params } );
    console.log(response.data)
    return response.data.cards;
}

export const getUsers = async () => {
    const response = await flashCardsApi.get('/users');
    return response.data
}

export const postUsers = async (newUser) => {
    const response = await flashCardsApi.post('/users', newUser);
    return response.data.user
}

export const getTopics = async () => {
    const response = await flashCardsApi.get('/topics');
    // console.log(response)
    return response.data
}