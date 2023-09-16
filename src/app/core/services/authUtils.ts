import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { User } from '../models/user.models';

class FirebaseAuthBackend {

  constructor(firebaseConfig: any) {
    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  registerUser = (model: User) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(model.email, model.password).then((data: any) => {
        var currentUser = firebase.auth().currentUser;
        resolve(currentUser);
      }, (error) => {
        reject(this._handleError(error));
      });
    });
  }

  loginUser = (email: any, password: any) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((user: any) => {
        var user: any = firebase.auth().currentUser;
        resolve(user);
      }, (error) => {
        reject(this._handleError(error));
      });
    });
  }

  logout = () => {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve(true);
      }).catch((error) => {
        reject(this._handleError(error));
      });
    });
  }

  _handleError(error: any) {
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend: any = null;

const initFirebaseBackend = (config: any) => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
