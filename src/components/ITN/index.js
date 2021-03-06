import React, { Component } from "react";
import { withAuthorization } from "../../config/Session";
import UserRoles from "../../constants/roles";
import TransferNotesType from "../../constants/transferNotesType";
import { connect } from "react-redux";
import { fetchTransferNotes } from "../../store/actions/transferNoteActions";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash';
import { auto } from "async";
import LocalPrintshopTwoToneIcon from '@material-ui/icons/LocalPrintshopTwoTone';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { Table as ReportTable, TableCell as ReportTableCell, TableHeader, DataTableCell, TableBody as ReportTableBody} from '@david.kucsai/react-pdf-table'


class ITNView extends Component { 
    state = {
        type: TransferNotesType.ActiveITN,
    };
    componentWillMount() {
      this.props.fetchTransferNotes(TransferNotesType.ActiveITN);
    }
    
    render() {
      const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            borderBottom: 'unset',
          },
        },

        title: {
          flex: '1 1 100%',
          fontSize: 14
        },

        body: {
          fontWeight: "normal",
          fontSize: 13
        },

        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },

        selectEmpty: {
          marginTop: theme.spacing(2),
        },

        cotainer: {
          overflow: auto,
          height: '80vh',
        }
      }));
      
      const reportStyles = StyleSheet.create({
        page: { margin: 30, flexDirection: 'column' }
      });

      const Report = (props) => {
        const { row } = props;

        return (
          <Document>
            <Page size="A4" style={reportStyles.page}>
              <View>
                <Text style={{ fontSize: 12, padding: 5, fontWeight: 'bold' }}>Transfer Note ID: {row.noteId}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}></Text> 

                <Text style={{ fontSize: 10, padding: 5 }}>Production Line ID: {row.productionLine}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}>Batch No.: {row.batchNo}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}>Date: {row.date}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}></Text>  

                <Text style={{ fontSize: 10, padding: 5 }}>Status: {row.details.status}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}>Prepared by: {row.details.preparedBy}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}>Approved by: {row.details.approvedBy || '-'}</Text>
                <Text style={{ fontSize: 10, padding: 5 }}></Text> 
              </View>

              <View style={{ padding: 5, maxWidth: 500}}>
                <Text style={{ fontSize: 12, padding: 5 }}>Transfer Products</Text>
                <ReportTable data={row.details.transferProductsList}>
                      <TableHeader>
                          <ReportTableCell isHeader={true} style={{ padding: 5, fontSize: 10}}>Product Code</ReportTableCell>
                          <ReportTableCell isHeader={true} style={{ padding: 5, fontSize: 10 }}>Description</ReportTableCell>
                          <ReportTableCell isHeader={true} style={{ padding: 5, fontSize: 10 }}>Quantity</ReportTableCell>
                      </TableHeader>
                      <ReportTableBody>
                          <DataTableCell getContent={(r) => r.productCode} style={{ padding: 5, fontSize: 10}}/>
                          <DataTableCell getContent={(r) => r.description} style={{ padding: 5, fontSize: 10}}/>
                          <DataTableCell getContent={(r) => r.quantity} style={{ padding: 5, fontSize: 10 }}/>
                      </ReportTableBody>
                </ReportTable>
              </View>            
            </Page>
        </Document>
        );        
      }
       
      const Row = (props) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useStyles();        
      
        return (
          <React.Fragment>
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.noteId}
              </TableCell>
              <TableCell>{row.productionLine}</TableCell>
              <TableCell>{row.batchNo}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <div>
                    <PDFDownloadLink document={<Report row={row} />} fileName={'TransferNote_' + row.noteId + '.pdf'}>
                      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <IconButton aria-label="expand row" size="small"><LocalPrintshopTwoToneIcon /></IconButton> )}
                    </PDFDownloadLink>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Details
                    </Typography>

                    <Typography variant="h6" component="div">
                      <span className={classes.title}>Status - </span> <span className={classes.body}>{row.details.status}</span>
                    </Typography>
                    <Typography variant="h6" component="div">
                      <span className={classes.title}>Prepared by - </span> <span className={classes.body}>{row.details.preparedBy}</span>
                    </Typography>                   

                    {row.details.approvedBy ? (
                      <Typography className={classes.title} variant="h6" component="div">
                        <span className={classes.title}>Approved by - </span> <span className={classes.body}>{row.details.approvedBy}</span>
                      </Typography>
                    ) : (
                      <Typography className={classes.title} variant="h6" component="div"></Typography>
                    )}

                    <Typography className={classes.title} variant="h6" component="div">
                      Transfer Products
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Code</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.details.transferProductsList.map((product) => (
                          <TableRow key={product.productCode}>
                            <TableCell component="th" scope="row">
                              {product.productCode}
                            </TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
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
      };

      const handleChange = (event) => {
        this.setState({ type: event.target.value });
        this.props.fetchTransferNotes(event.target.value);
      };

      const TypeSelect = (props) => {
        const classes = useStyles();

        return (
          <React.Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Transfer Note Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={this.state.type}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value={TransferNotesType.ActiveITN}>Active</MenuItem>
                <MenuItem value={TransferNotesType.CompletedITN}>Completed</MenuItem>
              </Select>
              <FormHelperText>Select a transfer note type here</FormHelperText>
            </FormControl>
          </React.Fragment>
        );
      };

      const TableContent = (props) => {
        const classes = useStyles();
        return (
          <TableContainer className={classes.cotainer} component={Paper}>
            <TypeSelect />
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Transfer Note ID</TableCell>
                  <TableCell>Prduction Line ID</TableCell>
                  <TableCell>Batch No.</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.noteId} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }

      const getNoteDetails = (alltransferNote) => {
        const preparedDetails = JSON.parse(alltransferNote.preparedBy);
        const approvedDetails = alltransferNote.approvedBy ? JSON.parse(alltransferNote.preparedBy) : null;
        const transferProductsList = alltransferNote.transferProductsList ? JSON.parse(alltransferNote.transferProductsList) : null;

        return {
          status: alltransferNote.status,
          preparedBy: preparedDetails.name,
          approvedBy: approvedDetails ? (approvedDetails.name) : null,
          transferProductsList: transferProductsList
        };
      };

      //generating rows
      var rows = [];
      console.log(this.props.transferNotes);
      console.log(_.isEmpty(this.props.transferNotes));
      if (this.props.transferNotes && !_.isEmpty(this.props.transferNotes)) {
        const alltransferNotes = this.props.transferNotes;

        for (let [key, alltransferNote] of Object.entries(alltransferNotes)) {          
          var productionLine = {};
          if (alltransferNote.productionLine) {
            productionLine = JSON.parse(alltransferNote.productionLine);
          }
          var rowData = {
            noteId: key,
            productionLine: !_.isEmpty(productionLine)? (productionLine.id + '-' + productionLine.name) : '-',
            batchNo: alltransferNote.batchNumber || '-',
            date: alltransferNote.preparedAt,
            details: getNoteDetails(alltransferNote)
          };
          rows.push(rowData);
        }
      }      
  
      return (
        <TableContent />        
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
 
const condition = authUserRole => authUserRole && (authUserRole === UserRoles.DepartmentHead || authUserRole === UserRoles.ManagementStaff);
export default withAuthorization(condition)(connect(mapStateToProps,mapDispatchToProps)(ITNView));