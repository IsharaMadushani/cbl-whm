import app from 'firebase/app';
import 'firebase/auth';

const config = {
       //
    
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }
}

export default Firebase;