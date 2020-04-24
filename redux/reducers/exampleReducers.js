import * as actionTypes from "../actions/actionTypes";



var UserInfo = {
    Rooms: [
        {
            Name: 'Radyo'
        },
        {
            Name: 'BanaÖzel'
        }
    ],
    userInfo: { username: 'karakusnavy', login: false },
    currentRoomName: 'Genel'
}

const exampleReducers = (state = UserInfo, action) => {


    if (actionTypes.SELECTED_NAME == action.type) {


        return (action.payload);
    }
    else {
        return state;
    }
};

export default exampleReducers

