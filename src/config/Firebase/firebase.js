import app from 'firebase/app';
import 'firebase/auth';

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

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }
}

export default Firebase;