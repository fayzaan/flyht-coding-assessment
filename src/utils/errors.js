const _errorCodes = {
  'auth/email-already-in-use': {
    type: 'validation',
    source: 'Firebase',
    field: 'email',
    message: 'a user with this email address already exists'
  },
  'auth/invalid-email': {
    type: 'validation',
    source: 'Firebase',
    field: 'email',
    message: 'You must enter a valid Email address'
  },
  'auth/operation-not-allowed': {
    type: 'uncaught',
    source: 'Firebase',
    message: 'Unable to register user'
  },
  'auth/weak-password': {
    type: 'validation',
    source: 'Firebase',
    field: 'password',
    message: 'Password must be at least 8 characters'
  },
  'check-auth/imei-not-found': {
    type: 'validation',
    source: 'App',
    field: 'firstImei',
    message: 'IMEI does not match with company records'
  },
  'check-auth/invoice-not-found': {
    type: 'validation',
    source: 'App',
    field: 'invoice',
    message: 'Could not find a company, check the invoice number'
  },
  'invite/user-already-in-group': {
    type: '',
    source: 'App',
    message: 'User is already a part of this group'
  },
  'invite/user-invite-already-sent': {
    type: '',
    source: 'App',
    message: 'An invitation has already been sent to this user for this group'
  },
  'twilio/invalid-phone': {
    type: 'validation',
    source: 'twilio',
    field: 'phone',
    message: 'Invalid phone number'
  },
  'check-company-exists/company-exists': {
    type: 'validation',
    source: 'App',
    field: 'name',
    message: 'Company with this name already exists'
  },
  'company.create.failed.exists': {
    type: '',
    source: 'App',
    title: 'Could not register Company',
    message: 'This company is already registered, please contact us for support.'
  },
  'uncaughtexception': {
    type: 'uncaught',
    title: 'Unexpected error',
    message: 'An Unexpected Error has occurred'
  }
};

const Errors = {
  get: (code) => {
    return _errorCodes[code] || _errorCodes['uncaughtexception'];
  }
};

export default Errors;
