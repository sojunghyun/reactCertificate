import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import yearlistview from "./yearData/yearDateListview";
// import { Route, BrowserRouter, Switch as Router  } from "react-router-dom"
// import React, { Component } from 'react';

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '100%',
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
// });

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

const rows2 = props => (
  <tr>
  <td>{props.problem.problem_index}</td>
  <td>{props.problem.problem_info}</td>
  <td>{props.problem.problem_answer}</td>
  <td>{props.problem.problem_year}</td>
</tr>
 
)

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    
  };
}

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

const onClickhandle = (num) => {
  
  // Link 사용하여 컴포넌트 누르는 메뉴 이벤트 형성
  const Tab = ({active, children, to}) => (
    <Link to={to} >
            {children}
    </Link>
  )
console.log(num,'.눌렸다.');


};


export default function VerticalTabs() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


    
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="2017" {...a11yProps(0)} />
        <Tab label="2018" {...a11yProps(1)} />
        <Tab label="2019" {...a11yProps(2)} />
        <Tab label="2020" {...a11yProps(3)} />
        <Tab label="2021" {...a11yProps(4)} />
        <Tab label="2022" {...a11yProps(5)} />
        <Tab label="2023" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}  onClick={onClickhandle(2017)}  >
        
        
            {/* <div className={classes.root}>
            <Paper className={classes.paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow>
                    <TableCell>problem_index</TableCell>
                    <TableCell align="right">problem_info</TableCell>
                    <TableCell align="right">problem_answer</TableCell>
                    <TableCell align="right">problem_year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map(row => (
                    <TableRow key={row.problem_index}>
                      <TableCell component="th" scope="row">
                        {row.problem_index}
                      </TableCell>
                      <TableCell align="right">{row.problem_info}</TableCell>
                      <TableCell align="right">{row.problem_answer}</TableCell>
                      <TableCell align="right">{row.problem_year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper> */}
          {/* </div> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}