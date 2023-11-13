import axios from 'axios';

const flashCardsApi = axios.create({
  baseURL: 'https://flash-cards-be.onrender.com/api',
});

// const flashCardsApi = axios.create({
//   baseURL: 'http://localhost:9090/api',
// });

export const getCards = async () => {
  const response = await flashCardsApi.get('/cards');
  // console.log(response)
  return response.data;
};

export const getSingleCard = async (card_id) => {
  console.log('card_id from api', card_id);
  const response = await flashCardsApi.get(`/cards/${card_id}`);
  // console.log("from api single card ", response)
  return response.data;
};

export const postCard = async (newCard) => {
  const response = await flashCardsApi.post('/cards', newCard);
  // console.log(response)
  return response.data.cards;
};

export const getUsers = async () => {
  const response = await flashCardsApi.get('/users');

  return response.data;
};

export const postUsers = async (newUser) => {
  const response = await flashCardsApi.post('/users', newUser);
  return response.data.user;
};

export const getTopics = async () => {
  return (await flashCardsApi.get('/topics')).data;
};

export const patchTopic = async (topic) => {
  return await flashCardsApi.patch('/topics/' + topic.slug, topic);
};

export const deleteTopic = async (topic) => {
  return await flashCardsApi.delete('/topics/' + topic.slug);
};

export const postTopic = async (topic) => {
  return await flashCardsApi.post('/topics/', topic);
};
