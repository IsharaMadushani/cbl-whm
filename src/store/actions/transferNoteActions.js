import TransferNotesType from "../../constants/transferNotesType";
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDi1conn7rx1gHOSD4hRZno4OuaA_rQHOQ",
    authDomain: "cbl-storex-wms.firebaseapp.com",
    databaseURL: "https://cbl-storex-wms.firebaseio.com",
    projectId: "cbl-storex-wms",
    storageBucket: "cbl-storex-wms.appspot.com",
    messagingSenderId: "989085924632",
    appId: "1:989085924632:web:028064f18f0d4919fa326d",
    measurementId: "G-MDJ2DBMFD8"

};
firebase.initializeApp(config);


const databaseRef = firebase.database().ref();
const fgtnTransferNoteRef = databaseRef.child("transferNotesRefs").child('fgtn');
const itnTransferNoteRef = databaseRef.child("transferNotesRefs").child('wwtn');
const transferNotes = databaseRef.child("transferNotes");

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