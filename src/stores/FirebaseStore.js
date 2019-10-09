import firebase from '../utils/firebase';
import Errors from '../utils/errors';
import Config from '../config.json';
import Validation from '../utils/validation';

const database = {};
let session = null;

const store = {
  initialize() {
    return new Promise((resolve, reject) => {
      const params = {
        apiKey: Config.apiKey,
        authDomain: Config.projectId + '.firebaseapp.com',
        databaseURL: 'https://' + Config.projectId + '.firebaseio.com'
      };

      database.state = new firebase(params);

      database.state.auth().onAuthStateChanged(user => {
        console.log('onAuthStateChanged', user)
        if (!user) {
          session = null
        } else {
          session = user;
        }
        resolve();
      });
    })
  },
  login (params) {
    return new Promise((resolve, reject) => {
      database
        .state
        .auth()
        .signInWithEmailAndPassword(params.email, params.password)
        .then(res => {
          console.log('dbLogin.success', res);
          session = database.state.auth().currentUser;

          resolve(res)
        })
        .catch(e => reject({success: false, errors: [Errors.get(e.code)]}))
    });
  },
  getSession () {
    return session;
  },
  getStudents (params) {
    return new Promise((resolve, reject) => {
      database.state.ref.child('/students/')
        .once('value')
        .then(snap => resolve(snap.val()))
        .catch(e => reject({success: false, errors: [Errors.get(e.code)]}))
    })
  },
  addStudent (params) {
    return new Promise((resolve, reject) => {
      let student = {...params};
      this.getStudents()
        .then(students => {
          student.id = getNewId(students);

          console.log('addStudent', student, hasRequiredProfile(student))

          if (hasRequiredProfile(student)) {
            database.state.ref.child('/students/' + student.id)
              .set(student)
              .then(function () {
                console.log('addStudent.then')
                resolve()
              })
              .catch(e => {
                console.error('addStudent.failed', e);
                reject({success: false, errors: [Errors.get(e.code)]})
              })
          } else {
            reject({success: false, errors: [Errors.get('add_student_missing_or_invalid_required_fields')]})
          }
        });
    })
  },
  updateStudent (params) {
    return new Promise((resolve, reject) => {
      if (hasRequiredProfile(params)) {
        database.state.ref.child('/students/' + params.id)
          .update({
            firstName: params.firstName,
            lastName: params.lastName,
            phone: params.phone,
            status: params.status
          })
          .then(resolve)
          .catch(e => reject({success: false, errors: [Errors.get(e.code)]}))
      } else {
        reject({success: false, errors: [Errors.get('update_student_missing_or_invalid_required_fields')]})
      }
    })
  }
};

function getNewId (students) {
  console.log('getNewId', students);
  let id = 1;

  students
    .map(student => student.id)
    .forEach(sid => id = Math.max(id, sid))

  id += 1;

  return id;
}

function hasRequiredProfile (params) {
  return Object.keys(params || {})
    .filter(key => {
      const value = params[key];

      switch (key) {
        case 'id':
          return !Validation.id(value);
        case 'firstName':
          return !Validation.name(value);
        case 'lastName':
          return !Validation.name(value);
        case 'phone':
          return !Validation.phone(value);
        case 'status':
          return !Validation.status(value);
        default:
          return value; // no other values are accepted
      }
    })
    .length === 0
}

export default store;
