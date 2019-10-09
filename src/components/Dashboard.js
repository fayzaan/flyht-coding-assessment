import React from 'react';
import Firebase from '../stores/FirebaseStore'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import StudentsList from './StudentsList';
import AddStudent from "./AddStudent";
import Button from "@material-ui/core/Button";

import Dragula from 'react-dragula';

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      students: [],
      editStudent: null,
      drake: null,
      showAddStudentForm: false
    };
    this.addStudent = this.addStudent.bind(this);
    this.onEditStudent = this.onEditStudent.bind(this);
    this.onAddStudentFormClosed = this.onAddStudentFormClosed.bind(this);
    this.onStudentAdded = this.onStudentAdded.bind(this);
    this.onStudentUpdated = this.onStudentUpdated.bind(this);
    this.changeStudentStatus = this.changeStudentStatus.bind(this);
  }
  componentDidMount() {
    this.getStudents();

    this.setState({drake: Dragula([document.getElementById('active_list'), document.getElementById('delinquent_list'), document.getElementById('dropped_list')])}, () => {
      this.state.drake.on('drop', (el, target, source, sibling) => {
        let studentId = parseInt(el.getAttribute('id').split('_')[1]);
        let status = target.getAttribute('id').split('_')[0];

        this.changeStudentStatus(studentId, status)
        console.log('Drake dropped item', el, target, source, sibling)
      })
    })
  }
  getStudents () {
    Firebase.getStudents()
      .then(students => this.setState({students}));
  }
  addStudent () {
    this.setState({showAddStudentForm: true});
  }
  onAddStudentFormClosed () {
    this.setState({showAddStudentForm: false, editStudent: null});
  }
  onEditStudent (editStudent) {
    this.setState({editStudent, showAddStudentForm: true});
  }
  onStudentAdded () {
    this.setState({showAddStudentForm: false});
    this.getStudents();
  }
  onStudentUpdated () {
    this.setState({editStudent: null, showAddStudentForm: false});
    this.getStudents();
  }
  changeStudentStatus(id, status) {
    let student = this.state.students
      .filter(s => s.id === id)[0];

    if (student) {
      student.status = status;
      Firebase.updateStudent(student);
    }
  }
  render () {
    return (
      <Container style={{textAlign: 'left', height: '100%'}}>
        <Button onClick={this.addStudent}>Add Student</Button>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{maxWidth: 360, width: '100%', margin: '15px'}}>
            <Typography style={{textAlign: 'left', marginBottom: '15px'}} variant={'h4'}>Active</Typography>
            <StudentsList id="active_list" status={'active'} students={this.state.students} onEdit={this.onEditStudent} />
          </div>

          <div style={{maxWidth: 360, width: '100%', margin: '15px'}}>
            <Typography style={{textAlign: 'left', marginBottom: '15px'}} variant={'h4'}>Delinquent</Typography>
            <StudentsList id="delinquent_list" status={'delinquent'} students={this.state.students} onEdit={this.onEditStudent} />
          </div>

          <div style={{maxWidth: 360, width: '100%', margin: '15px'}}>
            <Typography style={{textAlign: 'left', marginBottom: '15px'}} variant={'h4'}>Dropped</Typography>
            <StudentsList id="dropped_list" status={'dropped'} students={this.state.students} onEdit={this.onEditStudent} />
          </div>
        </div>

        {this.state.showAddStudentForm ? <AddStudent open={this.state.showAddStudentForm} student={this.state.editStudent} onAdd={this.onStudentAdded} onUpdate={this.onStudentUpdated} onClose={this.onAddStudentFormClosed} /> : null}
      </Container>
    )
  }
}

export default Dashboard;
