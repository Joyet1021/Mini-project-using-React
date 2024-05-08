const userdataReducer = (state = [], action) => {
    if (action.type === 'addUser') {
        const updatedState = [...state, action.payload];
        localStorage.setItem('usersData', JSON.stringify(updatedState));
        return updatedState;
    } else if (action.type === 'retrieve') {
        const datas = localStorage.getItem("usersData");
        return JSON.parse(datas) || []; // Provide an empty array as fallback
    } else {
        return state;
    }
};

export default userdataReducer;
