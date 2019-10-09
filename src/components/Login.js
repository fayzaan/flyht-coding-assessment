import React from 'react';
import logo from '../logo.png';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import Firebase from '../stores/FirebaseStore'

const styles = {
  logo: {
    height: 127,
    backgroundColor: 'black'
  },
  card: {
    width: 345
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount () {
    console.log('checkSession', Firebase.getSession())
    if (Firebase.getSession()) {
      this.forceUpdate();
    }
  }
  login () {
    console.log('login', this.state)
    Firebase
      .login(this.state)
      .then(() => {
        console.log('login.then', Firebase.getSession())
        this.setState({session: Firebase.getSession()})
      })
  }
  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }
  render () {
    const {classes} = this.props;
    const {onChange, login} = this;

    if (Firebase.getSession()) {
      return this.props.children
    }

    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.logo}
            image={logo}
            title="Logo"
          />
          <CardContent>
            <form>
              <TextField
                id="email"
                label="Email"
                name="email"
                value={this.state.email}
                fullWidth
                onChange={onChange}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                value={this.state.password}
                fullWidth
                onChange={onChange}
              />
            </form>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={login}>
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Login);
