
const initialState = {
    count: 0,
};

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'INCREASE':{
            return{
                count: state.count + 1,
            }
        }
        case 'DECREASE':{
            return{
                count: state.count - 1,
            }
        }
    }
    


    return initialState;
}

export default rootReducer;