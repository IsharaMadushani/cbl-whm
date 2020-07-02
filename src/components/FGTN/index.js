import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";
import UserRoles from "../../constants/roles";
import TransferNotesType from "../../constants/transferNotesType";
import { connect } from "react-redux";
import { fetchTransferNotes } from "../../store/actions/transferNoteActions";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class FGTNView extends Component {
    state = {
      search: "",
    };
  
    componentWillMount() {
      this.props.fetchTransferNotes(TransferNotesType.ActiveFGTN);
    }
    
    render() {
      // const { classes } = this.props;

      // if (this.props.transferNotes) {
      //   const alltransferNotes = this.props.transferNotes;

      //   var data = [];
      //   for (let [key, alltransferNote] of Object.entries(alltransferNotes)) {
      //     //get data from each staff member to display in the table
      //     var data = [];
      //     data.push(key);
      //     data.push(alltransferNote.productionLine.name);
      //     data.push(alltransferNote.batchNumber);
      //     data.push(alltransferNote.preparedAt);
      //     data.push(
      //       <Link to={"./staff/" + key}>
      //         <Button color="info" round>
      //           View
      //         </Button>
      //       </Link>
      //     );

      //     //push array of individual staff member's data into the staff data array
      //     data.push(data);
      //   }

        //search
        // if(this.state.search){
        //   managementStaffData = managementStaffData.filter(item => item[0].toLowerCase().includes(this.state.search.toLowerCase()) || item[1].toLowerCase().includes(this.state.search.toLowerCase()) || item[2].toLowerCase().includes(this.state.search.toLowerCase()))
        // }
      // }

      //create table of staff data using table component
      // const details = this.props.transferNotes ? (
      //   <div>
      //     <Table
      //       tableHeaderColor="info"
      //       tableHead={["Transfer Note ID", "Prduction Line ID", "Batch No.", "Date", "View"]}
      //       tableData={data}
      //     />
      //   </div>
      // ) : (
      //   <div>
      //     <p>No Transfer Notes.</p>
      //   </div>
      // );   
      const useRowStyles = makeStyles({
        root: {
          '& > *': {
            borderBottom: 'unset',
          },
        },
      });
      
      const createData = (name, calories, fat, carbs, protein, price) => {
        return {
          name,
          calories,
          fat,
          carbs,
          protein,
          price,
          history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
          ],
        };
      }
      
      const Row = (props) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();
      
        return (
          <React.Fragment>
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Total price ($)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.history.map((historyRow) => (
                          <TableRow key={historyRow.date}>
                            <TableCell component="th" scope="row">
                              {historyRow.date}
                            </TableCell>
                            <TableCell>{historyRow.customerId}</TableCell>
                            <TableCell align="right">{historyRow.amount}</TableCell>
                            <TableCell align="right">
                              {Math.round(historyRow.amount * row.price * 100) / 100}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }

      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
        createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
        createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
        createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
      ];
  
      return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  }

const mapStateToProps = state => {
    return {
      transferNotes: state.transferNote.transferNotes
    };
  };
  
  //load required functions from actions to props
  const mapDispatchToProps = dispatch => {
    return {
        fetchTransferNotes: type => {
          dispatch(fetchTransferNotes(type));
        }
    };
  };
 
const condition = authUserRole => authUserRole &&  authUserRole === UserRoles.DepartmentHead;
 
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//     withAuthorization(condition)
//   )(FGTNView);

export default connect(mapStateToProps,mapDispatchToProps)(FGTNView);