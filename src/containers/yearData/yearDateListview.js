import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
//import Dialog from 'react-bootstrap-dialog'
// import Moment from 'react-moment';
// import trashImage from'../icon-trash.png';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const btnStyle = {
    color: "white",
    background: "white",
    //padding: ".375rem .75rem",
    border: "1px solid white",
    borderRadius: ".25rem",
   // fontSize: "1rem",
    lineHeight: 1.5
  };



  const Problem = props => ( 
        <TableRow>  
          <TableCell component="th" scope="row">          {props.problem.problem_index}          </TableCell>
        <TableCell align="left">{props.problem.problem_info}</TableCell>
        <TableCell align="left">{props.problem.problem_answer}</TableCell>
        <TableCell align="left">{props.problem.problem_year}</TableCell>
        </TableRow>
)

    
const useStyles = makeStyles(theme => ({
    root: {
      padding: 10,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 500,
    },
  }));

export default class problemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {problems: []};
        //this.onDeletebutton = this.onDeletebutton.bind(this);
    }
    

    componentDidMount() {
        axios.get('http://localhost:7376/comment/2018')
            .then(response => {
                this.setState({ problems: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }


    todoList() {
        var data = this.state.problems;
        return data.map(function(currentTodo, i){
            return <Problem problem={currentTodo} key={i}/> ;
        })

    }

    render() {
        return (
          <div style={{ marginLeft: 15,  marginRight: 15, marginTop: 5}}> 
            <div className={useStyles.root}>
              <Paper className={useStyles.paper}>
                <Table className={useStyles.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell >#</TableCell>
                      <TableCell align="left" >문제</TableCell>
                      <TableCell align="left">정답</TableCell>
                      <TableCell align="left">년도</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                          { this.todoList() }  
                  </TableBody>
                </Table>
              </Paper>
            </div>
        </div>
           
        )
    }
}