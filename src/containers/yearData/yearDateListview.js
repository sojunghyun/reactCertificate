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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const Problem = props => [  <TableRow>  <TableCell component="th" scope="row">
  {props.problem.problem_index}
  </TableCell>
<TableCell align="left">{props.problem.problem_info}</TableCell>
<TableCell align="left">{props.problem.problem_answer}</TableCell>
<TableCell align="left">{props.problem.problem_year}</TableCell>
</TableRow>
]

    


const useStyles = makeStyles(theme => ({
    root: {
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
      minWidth: 650,
    },
  }));

export default class problemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {problems: []};
        //this.onDeletebutton = this.onDeletebutton.bind(this);
    }
    

    componentDidMount() {
        axios.get('http://localhost:7376/comment/2017')
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
            <div className={useStyles.root}>
            <Paper className={useStyles.paper}>
              <Table className={useStyles.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>index</TableCell>
                    <TableCell align="left">problem_info</TableCell>
                    <TableCell align="left">problem_answer</TableCell>
                    <TableCell align="left">problem_year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                        { this.todoList() }  
                </TableBody>
                {/* <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Paper>
          </div>
        )
    }
}