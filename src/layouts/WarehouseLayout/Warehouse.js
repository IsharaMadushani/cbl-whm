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

export default function Warehouses() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Warehouse ID', field: 'key' },
            { title: 'Warehouse Name', field: 'name' },

        ],
        data: []
    });
    React.useEffect(() => {
        firebase.database().ref('warehouses').on('value', (snapshot) => {
            var warehouses = [];
            if (snapshot.exists()) {
                snapshot.forEach((warehouse) => {
                    let warehouseData = warehouse.val()
                    warehouseData.key = warehouse.key
                    warehouses.push(warehouseData)
                })
            }
            setState({
                ...state,
                data: [...warehouses]
            })
        })
    }, [])
    return (
        <MaterialTable
            icons={tableIcons}
            // actions={[
            //     {
            //         icon: 'person',
            //         iconProps: { style: { fontSize: "24px", color: "rgb(64,81,181)" } },
            //         tooltip: 'View Profile',
            //         onClick: (event, rowData) => {
            //             alert(`${rowData.name}`)
            //         }
            //     }
            // ]}
            title="Warehouse Management"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            firebase.database().ref('warehouses').child(newData.key).set({ 'name': newData.name })
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
                                firebase.database().ref('warehouses').child(newData.key).set({ 'name': newData.name })
                                // firebase.database().ref('warehouses').child(`${oldData.key}`).remove()
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
                            firebase.database().ref('warehouses').child(`${oldData.key}`).remove()
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
