import React, { useContext } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";
import UserRoles from "../../constants/roles";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase, {fgtnTransferNoteRef, itnTransferNoteRef} from '../../config/Firebase';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import ReceiptTwoToneIcon from '@material-ui/icons/ReceiptTwoTone';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const DepartmentHeadDashboardView = () => {
  const [state, setState] = React.useState({    
    fgtnData: [],
    itnData: []
  });

  const authUserContext = useContext(AuthUserContext); 
  const userState = authUserContext.state || {};
  const classes = useStyles();

  React.useEffect(() => {
    var fgtnData = [];
    fgtnTransferNoteRef.child('activeTransfersRefs').on("value", snapshot => {
      if (snapshot.val()) {
        var fgtnLineCounts = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
          const availableTransferNotes = JSON.parse(value);

          fgtnLineCounts.push({
            productionLine: key,
            count: availableTransferNotes.length
          });              
        }
      }
      fgtnData = fgtnLineCounts;
    });

    itnTransferNoteRef.child('activeTransfersRefs').on("value", snapshot => {
      if (snapshot.val()) {
        var itnLineCounts = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
          const availableTransferNotes = JSON.parse(value);

          itnLineCounts.push({
            productionLine: key,
            count: availableTransferNotes.length
          });              
        }
      }
      setState({
        fgtnData: [...fgtnData],
        itnData: [...itnLineCounts]
      });  
    });
  }, [])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <Typography variant="h5" gutterBottom>
        Finished Goods
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {state.fgtnData.map((item) => (
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <Avatar className={classes.orange}><AssignmentTurnedInTwoToneIcon /></Avatar>
                {"For production line " + item.productionLine} <Chip label={item.count + " items"} variant="outlined" />
              </Paper>
            </Grid>
          ))} 
        </Grid>
      </div>
      <Divider variant="middle" /><br />
      <Typography variant="h5" gutterBottom>
        Transfer Goods
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {state.itnData.map((item) => (
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <Avatar className={classes.purple}><ReceiptTwoToneIcon /></Avatar>
                {"For production line " + item.productionLine} <Chip label={item.count + " items"} variant="outlined" />
              </Paper>
            </Grid>
          ))} 
        </Grid>
      </div>
    </div>    
  ) 
};
 
const condition = authUserRole => authUserRole &&  authUserRole === UserRoles.DepartmentHead || authUserRole === UserRoles.ManagementStaff;
 
export default withAuthorization(condition)(DepartmentHeadDashboardView);