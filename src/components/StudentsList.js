import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

class StudentsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    };
    this.meetsCriteria = this.meetsCriteria.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
  }
  meetsCriteria (student) {
    let statuses = this.props.status;

    if (statuses) {
      if (!Array.isArray(statuses)) {
        statuses = [statuses];
      }

      return statuses.indexOf(student.status) !== -1;
    }

    return true;
  }
  onEdit (student) {
    this.props.onEdit(student);
  }
  changeRowsPerPage (event) {
    this.setState({rowsPerPage: event.target.value}, () => {
      this.changePage(null, 0)
    })
  }
  changePage (event, page) {
    this.setState({page})
  }
  render () {
    const {meetsCriteria} = this;
    const {page, rowsPerPage} = this.state;
    const filteredStudents = this.props.students
      .filter(meetsCriteria)

    return (
      <div>
        <Paper style={{maxHeight: 440, overflow: 'auto'}}>
          <List id={this.props.id}>
            {
              filteredStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(student => (
                <span id={`student_${student.id}`} key={`list_item_${student.id}`}>
                  <ListItem alignItems="flex-start" button>
                    <ListItemAvatar>
                      <Avatar src={`https://randomuser.me/api/portraits/med/men/${student.id}.jpg`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${student.firstName} ${student.lastName}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            style={{display: 'inline'}}
                            color="textPrimary"
                          >
                            Student ID: {student.id}
                          </Typography>
                          <br />
                          {`${student.phone}`}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" onClick={this.onEdit.bind(null, student)}>
                        <Icon>edit</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </span>
              ))
            }
          </List>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.changePage}
          onChangeRowsPerPage={this.changeRowsPerPage}
        />
      </div>
    );
  }
}

export default StudentsList
