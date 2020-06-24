import app from 'firebase/app';
import 'firebase/auth';

const config = {
    //add config details
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }
}
   
export default Firebase;