import React from "react";
import Firebase from "../stores/FirebaseStore";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  margin: '15px'
};

class AddStudent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      status: 'active',
      errors: {}
    }
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    if (this.props.student) {
      const {id, firstName, lastName, phone, status} = this.props.student;
      console.log('AddStudent.mounted', this.props.student)
      this.setState({
        id, firstName, lastName, phone, status
      })
    }
  }
  add () {
    console.log('add', this.formIsValid())
    if (this.formIsValid()) {
      const {firstName, lastName, phone, status} = this.state

      Firebase.addStudent({firstName, lastName, phone, status})
        .then(this.props.onAdd)
        .catch(err => {
          console.error('AddStudent.add.error', err)
        })
    }
  }
  update () {
    if (this.formIsValid()) {
      const {id, firstName, lastName, phone, status} = this.state

      Firebase.updateStudent({id, firstName, lastName, phone, status})
        .then(this.props.onUpdate)
    }
  }
  formIsValid () {
    let errors = {...this.state.errors};

    let keys = ['firstName', 'lastName', 'phone', 'status'];
    keys.forEach(key => {
      const value = this.state[key];

      switch (key) {
        case 'firstName':
        case 'lastName':
          if (!value || value.length < 2) {
            errors[key] = true;
          } else {
            delete errors[key];
          }
          break;
        case 'phone':
          if (!value || value.length < 10 || value.length > 10) {
            errors[key] = true;
          } else {
            delete errors[key];
          }
          break;
        default:
          delete errors[key];
          break;
      }
      })

    this.setState({errors})
    return Object.keys(errors).length === 0
  }
  onChange (e) {
    switch (e.target.name) {
      case 'phone':
        this.setState({[e.target.name]: parseInt(e.target.value)})
        break;
      default:
        this.setState({[e.target.name]: e.target.value})
    }
  }
  render () {
    const {open, onClose, classes} = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{this.props.student ? 'Update Student' : 'Add new Student'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth className={classes.margin} error={this.state.errors.firstName}>
            <InputLabel>First Name</InputLabel>
            <Input
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />
            {this.state.errors.firstName && <FormHelperText>First name is required and must be a minimum of 2 characters</FormHelperText>}
          </FormControl>

          <FormControl fullWidth className={classes.margin} error={this.state.errors.lastName}>
            <InputLabel>Last Name</InputLabel>
            <Input
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />
            {this.state.errors.lastName && <FormHelperText>Last name is required and must be a minimum of 2 characters</FormHelperText>}
          </FormControl>

          <FormControl fullWidth className={classes.margin} error={this.state.errors.phone}>
            <InputLabel>Phone Number</InputLabel>
            <Input
              id="phone"
              name="phone"
              value={this.state.phone}
              type="number"
              onChange={this.onChange}
            />
            {this.state.errors.phone && <FormHelperText>Phone number is required and must be 10 digits</FormHelperText>}
          </FormControl>

          <FormControl fullWidth className={classes.margin} error={this.state.errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              value={this.state.status}
              onChange={this.onChange}
              inputProps={{
                id: 'status',
                name: 'status'
              }}
            >
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'delinquent'}>Delinquent</MenuItem>
              <MenuItem value={'dropped'}>Dropped</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          {
            !this.props.student ? (
              <Button onClick={this.add} color="primary">
                Add
              </Button>
            ) : null
          }
          {
            this.props.student ? (
              <Button onClick={this.update} color="primary">
                Update
              </Button>
            ) : null
          }
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(AddStudent);
