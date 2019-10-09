const _isValidEmail = function ( email ) {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test( email );
};

const _isString = function (str) {
  return typeof str === 'string';
};

const _isNumber = function (num) {
  return typeof num === 'number';
};

const statusEnums = ['active', 'delinquent', 'dropped'];

const _getLength = function (elm) {
  if (elm === 'undefined' || elm === null) { return 0; }
  switch (typeof elm) {
    case 'object':
      if (Array.isArray(elm)) {
        return elm.length;
      } else {
        return Object.keys(elm).length;
      }
    case 'string':
      return elm.length;
    case 'boolean':
    case 'number':
      return (elm + '').length;
    default:
      return 0;
  }
};

const _hasValue = function (val) {
  return val !== null && val !== undefined && val !== '';
};

const _passwordMeetsCriteria = function (password) {
  //basic test, may want to expand on this
  return password && password.length >= 8;
};

const _hasOneOf = (value, enums) => {
  return enums.indexOf(value) !== -1;
};

const Validation = {
  id: function (value, optional) {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      if (_isNumber(value)) {
        resolve();
      } else {
        reject();
      }
    })
  },
  status: (value, optional) => {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      if (_hasOneOf(value, statusEnums)) {
        resolve();
      } else {
        reject();
      }
    })
  },
  enum: (value, enums, optional) => {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      const acceptableValues = enums && Array.isArray(enums) ? enums : [];

      if (_hasOneOf(value, acceptableValues)) {
        resolve();
      } else {
        reject();
      }

    });
  },
  email: function(value, optional) {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      const email = value + '';

      if (_isValidEmail(email)) {
        resolve();
      } else {
        reject();
      }
    });
  },
  name: function (value, optional) {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      const name = value + '';

      if (_isString(name) && _getLength(name) >= 2) {
        resolve();
      } else {
        reject();
      }
    });
  },
  phone: function (value, optional) {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      const phone = value + '';

      //temp likely will want to use Twilio for validating this phone number
      if (_isString(phone) && _getLength(phone) === 10) {
        resolve();
      } else {
        reject();
      }
    });
  },
  count: function (value, min, max, optional) {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      const count = value + 0;

      if (_isNumber(count)) {
        if (count >= min && count <= max) {
          resolve();
        } else {
          reject();
        }
      } else {
        reject();
      }
    });
  },
  password: function(value, optional) {
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      }

      const password = value + '';

      if (_isString(password) && _passwordMeetsCriteria(password)) {
        resolve();
      } else {
        reject();
      }
    });
  },
  streetaddress: function(value, optional) {
    //could possibly use external services to validate address
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      } else {
        resolve();
      }
    });
  },
  city: function(value, optional) {
    //could possibly use external services to validate address
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      } else {
        resolve();
      }
    });
  },
  zip: function(value, optional) {
    //could possibly use external services to validate address
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      } else {
        resolve();
      }
    });
  },
  country: function(value, optional) {
    //could possibly use external services to validate address
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      } else {
        resolve();
      }
    });
  },
  state: function(value, optional) {
    //could possibly use external services to validate address
    return new Promise((resolve, reject) => {
      if (!_hasValue(value) && !optional) {
        reject();
      } else if (!_hasValue(value) && optional) {
        resolve();
      } else {
        resolve();
      }
    });
  }
};

export default Validation;
