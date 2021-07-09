

// (previouState, action) => newState

const initialState={
    searchedField : ""
}
export default function reducer(state=initialState,action){
    if(action.type==="change"){
        return {searchedField: action.payload};
    }
    else{
        return state;
    }
}