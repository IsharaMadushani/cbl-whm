import * as firebase from "firebase";
import 'firebase/auth';

const config = {
    // apiconfig
};

firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const fgtnTransferNoteRef = databaseRef.child("transferNotesRefs").child('fgtn');
export const itnTransferNoteRef = databaseRef.child("transferNotesRefs").child('wwtn');
export const transferNotes = databaseRef.child("transferNotes");

export default firebase;