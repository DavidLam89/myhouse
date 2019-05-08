import { MAKE_HOUSE_FETCH, MAKE_HOUSE_SUCCESS, MAKE_HOUSE_FAIL, EDIT_HOUSE_INFO, SAVE_HOUSE_INFO, CANCEL_SAVE_HOUSE_INFO } from './index';
import { API, graphqlOperation } from 'aws-amplify';
import { makeUser } from './usersActions';
import { createHouse } from '../graphql/mutations';

export const makeHouse = ({ id, houseInput }, history) => dispatch => {
  dispatch({ type: MAKE_HOUSE_FETCH, payload: houseInput });
  return API.graphql(graphqlOperation(createHouse, { input: houseInput }))
    .then(({ data }) => {
      const house = data.createHouse;
      dispatch({ type: MAKE_HOUSE_SUCCESS, payload: house });
      makeUser(id, history)(dispatch);
    })
    .catch(error => {
      dispatch({ type: MAKE_HOUSE_FAIL, payload: error });
    });
};

export const isEditing = id => {
  return {
    type: EDIT_HOUSE_INFO,
    payload: id
  };
};

export const saveHouseInfo = ({ changes, id }) => {
  return {
    type: SAVE_HOUSE_INFO,
    payload: {
      changes,
      id
    }
  };
};

export const cancelSaveHouseInfo = id => {
  return {
    type: CANCEL_SAVE_HOUSE_INFO,
    payload: id
  };
};
