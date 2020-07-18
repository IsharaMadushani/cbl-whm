import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';

import firebase from '../../config/Firebase';


const tableIcons = {
    Delete: forwardRef((props, ref) => <DeleteOutline color="secondary" {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox style={{ color: "rgb(64,81,181)" }} {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit style={{ color: "rgb(0,153,0)" }}  {...props} ref={ref} />),
}

export default function WarehouseClerks() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'First Name ', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Email', field: 'email', type: 'email' },
            {
                title: 'Contact Number',
                field: 'contactNumber',
                type: 'numeric'
            },
            { title: 'Warehouse ID', field: 'warehouseID', lookup: { 'W01': 'Central Warehouse - Ranala', 'W02': 'Regional Warehouse - Kurunegala', 'W03': 'TEST-PLACE' } }

        ],
        data: []
    });
    React.useEffect(() => {
        firebase.database().ref('users/warehouseOperators').on('value', (snapshot) => {
            var users = [];
            if (snapshot.exists()) {
                snapshot.forEach((user) => {
                    let userData = user.val()
                    userData.key = user.key
                    users.push(userData)
                })
            }
            setState({
                ...state,
                data: [...users]
            })
        })
    }, [])
    return (
        <MaterialTable
            icons={tableIcons}
            actions={[
                {
                    icon: 'person',
                    iconProps: { style: { fontSize: "24px", color: "rgb(64,81,181)" } },
                    tooltip: 'View Profile',
                    onClick: (event, rowData) => {
                        alert(`${rowData.name}`)
                    }
                }
            ]}
            title="User Management"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            firebase.auth().createUserWithEmailAndPassword(newData.email, 'ucsc@123')
                                .then((userData) => {
                                    console.log(userData)
                                    firebase.database().ref('users/warehouseOperators').child(userData.user.uid).set(newData)
                                    console.log(newData)
                                })
                            // setState((prevState) => {
                            //     const data = [...prevState.data];
                            //     data.push(newData);
                            //     return { ...prevState, data };
                            // });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                //firebase.database().ref('users/warehouseOperators').push(newData)
                                firebase.database().ref('users/warehouseOperators').child(`${oldData.key}`).remove()
                                firebase.database().ref('users/warehouseOperators').child(oldData.key).set(newData)
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            console.log(oldData)
                            firebase.database().ref('users/warehouseOperators').child(`${oldData.key}`).remove()
                            // setState((prevState) => {
                            //     const data = [...prevState.data];
                            //     data.splice(data.indexOf(oldData), 1);
                            //     return { ...prevState, data };
                            // });
                        }, 600);
                    }),
            }}
        />
    );
}
