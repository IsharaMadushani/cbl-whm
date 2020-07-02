const initState = {
    transferNotes: []
  };
  
  const transferNoteReducer = (state = initState, action) => {
    switch (action.type) {

        case "FETCH_TRANSFER_NOTES":
          return {...state, transferNotes: action.data};


    }
    return state;
  };
  
  export default transferNoteReducer;
  