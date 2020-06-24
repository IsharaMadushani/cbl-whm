import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBMk_gT4FDWVwvLQOkwsIfAdYZxM5hr8Qw",
    authDomain: "project-whm-1dd03.firebaseapp.com",
    databaseURL: "https://project-whm-1dd03.firebaseio.com",
    projectId: "project-whm-1dd03",
    storageBucket: "project-whm-1dd03.appspot.com",
    messagingSenderId: "444783523754",
    appId: "1:444783523754:web:db044e24c7d83095b85dd3",
    measurementId: "G-17SKX1S6J4"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }
}
   
export default Firebase;