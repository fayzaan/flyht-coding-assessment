import firebase from 'firebase';

class FirebaseService {
  constructor({ apiKey, authDomain, databaseURL, name }) {
    this.apiKey = apiKey + '';
    this.authDomain = authDomain + '';
    this.databaseURL = databaseURL + '';
    this.name = name || 'DEFAULT';

    if ( apiKey && authDomain && databaseURL ) {
      try {
        this.firebaseApp = firebase.initializeApp({ apiKey, authDomain, databaseURL }, name);
        this.ref = firebase.database().ref();
        this.auth = firebase.auth;
      } catch (e) {
        console.error('FirebaseService.initialize.failed', e);
        return e;
      }
    } else {
      throw new Error('Initialization failed, some or all required parameters are missing');
    }
  }
};

export default FirebaseService;
