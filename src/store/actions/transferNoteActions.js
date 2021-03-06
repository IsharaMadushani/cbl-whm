import TransferNotesType from "../../constants/transferNotesType";
import firebase, {fgtnTransferNoteRef, itnTransferNoteRef, transferNotes} from '../../config/Firebase';

export const fetchTransferNotes = (type) => {
    return (dispatch, getState) => {
        dispatch({ 
            type: "FETCH_TRANSFER_NOTES",
            data: null
        });
        switch (type) {
            case TransferNotesType.CompletedFGTN:
                fetchCompletedFgtn(dispatch);
                break;
            case TransferNotesType.ActiveFGTN:
                fetchActiveFgtn(dispatch);
                break;
            case TransferNotesType.CompletedITN:
                fetchCompletedItn(dispatch);
                break;
            case TransferNotesType.ActiveITN:
                fetchActiveItn(dispatch);
                break;
        }
    };
  };

  const fetchCompletedFgtn = (dispatch) => {
    var items = {};
    fgtnTransferNoteRef.child('completedTransfersRefs').on("value", snapshot => {
        if (snapshot.val()) {
            for (const [key, value] of Object.entries(snapshot.val())) {
                const availableTransferNotes = JSON.parse(value);
                availableTransferNotes.forEach(id => {
                    transferNotes.child(id).on("value", snapshot => {
                        items[id]  = snapshot.val();                    
                    });
                }); 
            }
        }
        dispatch({ 
            type: "FETCH_TRANSFER_NOTES",
            data: items
        });  
    });
  }

  const fetchActiveFgtn = (dispatch) => {
    var items = {};
    fgtnTransferNoteRef.child('activeTransfersRefs').on("value", snapshot => {
        if (snapshot.val()) {
            for (const [key, value] of Object.entries(snapshot.val())) {
                const availableTransferNotes = JSON.parse(value);
                availableTransferNotes.forEach(id => {
                    transferNotes.child(id).on("value", snapshot => {
                        items[id]  = snapshot.val();                    
                    });
                }); 
            }
        }
        dispatch({ 
            type: "FETCH_TRANSFER_NOTES",
            data: items
        });  
    });
  }
  const fetchCompletedItn = (dispatch) => {
    var items = {};
    itnTransferNoteRef.child('completedTransfersRefs').on("value", snapshot => {
        if (snapshot.val()) {
            for (const [key, value] of Object.entries(snapshot.val())) {
                const availableTransferNotes = JSON.parse(value);
                availableTransferNotes.forEach(id => {
                    transferNotes.child(id).on("value", snapshot => {
                        items[id]  = snapshot.val();                    
                    });
                });  
            }
        }
        dispatch({ 
            type: "FETCH_TRANSFER_NOTES",
            data: items
        });  
    });
  }
  const fetchActiveItn = (dispatch) => {
    var items = {};
    itnTransferNoteRef.child('activeTransfersRefs').on("value", snapshot => {
        if (snapshot.val()) {
            for (const [key, value] of Object.entries(snapshot.val())) {
                const availableTransferNotes = JSON.parse(value);
                availableTransferNotes.forEach(id => {
                    transferNotes.child(id).on("value", snapshot => {
                        items[id]  = snapshot.val();                    
                    });
                });
            }
        }
        dispatch({ 
            type: "FETCH_TRANSFER_NOTES",
            data: items
        });  
    });
  }