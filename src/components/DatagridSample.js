import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const DatagridSample = ({ subTests, setSubTests, selectedTest, fetchDataUnderTest }) => {
    //function for exexcuting the keywords and posting the test results  
    const handleExecution = () => {
        axios.post(`http://localhost:8081/keyword/executeAll/${selectedTest}`, rows)
            .then((response) => {
                axios.post("http://localhost:8081/postTestResults", response.data)
                    .then((response) => {
                        console.log("Data posted to testResults db:", response);
                    })
                    .catch((response) => {
                        console.error("Error posting data to testResults db:", response);
                    });
            })
            .catch((error) => {
                console.error("Error executing all keywords:", error);
            });
    };

    //function for saving the test steps and fetching the data under each test
    const handleSaveOperation = (selectedRow) => {
        console.log(selectedRow)
        axios.post(`http://localhost:8081/keyword/addSubTest/${selectedTest}`, selectedRow)
            .then(() => {
                setSubTests(subTests => {
                    return subTests.map(row => {
                        return row.id === selectedRow.id ? selectedRow : row;
                    });
                });
                fetchDataUnderTest(selectedTest);
            })
            .catch((error) => { console.log(error) })
    }

    //commented temporarily !!!//
    //function for deleting a particulat test step
    const handleDeleteOperation = (selectedRow) => {
        // axios.delete(`http://localhost:8081/keyword/delete/${selectedRow.id}`)
        //     .then((response) => {
        //         console.log(response.data);
        //         if (response.status === 200) {
        //             setSubTests((prevData) => prevData.filter(row => row.id !== selectedRow.id));
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    //function for adding a new empty row
    const handleAddClick = () => {
        const newRow = {
            id: '',
            orderOfExecution: '',
            keyword: '',
            description: '',
            locatorType: '',
            locatorValue: '',
            value: '',
            flag: '',
            screenshot: false
        };
        setSubTests((prevData) => [...prevData, newRow]);
    };

    const isCellEditable = (params) => {
        // Allow editing for 'typeMaskedText' keyword when cell is empty
        if (params.field === 'value' && params.row.keyword === 'typeMaskedText' && params.row.value === '') {
            return true;
        }
        // Disable editing for 'typeMaskedText' keyword when cell is not empty
        if (params.field === 'value' && params.row.keyword === 'typeMaskedText' && params.row.value !== '') {
            return false;
        }
        return true;
    };

    const keywords = [
        'openBrowser',
        'goToURL',
        'typeText',
        'verifyText',
        'click',
        'closeBrowser',
        'waitFor',
        'clearText',
        'verifyElement',
        'selectFromDropdown',
        'typeMaskedText',
        'mouseHover',
        'doubleClick',
        'downKeyAndEnter',
        'scrollToBottom',
        'scrollToTop',
        'scrollToElement',
        'getValue',
        'typeValue',
        'enter',
        'verifyURL',
        'verifyPageTitle',
        'waitForElement',
        'generateRandomNumber',
        'generateRandomText',
        'refreshPage',
        'acceptAlert',
        'dismissAlert',
        'fileUpload',
        'dragAndDrop',
        'executeSelectQuery',
        'rightClick'
    ]

    // const locatorTypes = [
    //     'NA',
    //     'id',
    //     'name',
    //     'xpath',
    //     'class',
    //     'classname',
    //     'tag',
    //     'link',
    //     'partiallink',
    //     'css',
    //     'cssselector'
    // ]

    const flags = ['Y', 'N']
    //function for checking the chechbox
    const handleCheckboxChange = (event, rowId) => {
        const updatedRows = subTests.map(row => {
            if (row.id === rowId) {
                return { ...row, screenshot: event.target.checked };
            }
            return row;
        });
        setSubTests(updatedRows);
    };

    const fields = [
        {
            field: "id",
            headerName: <strong>ID</strong>,
            width: 100,
            headerClassName: 'header-column',
        },
        {
            field: "orderOfExecution",
            headerName: <strong>Order</strong>,
            width: 80,
            headerClassName: 'header-column',
            editable: true
        },
        {
            field: "keyword",
            headerName: <strong>Keyword</strong>,
            width: 120,
            headerClassName: 'header-column',
            editable: true,
            type: 'singleSelect',
            valueOptions: keywords
        },
        {
            field: "description",
            headerName: <strong>Description</strong>,
            width: 110,
            headerClassName: 'header-column',
            editable: true
        },
        {
            field: "locatorType",
            headerName: <strong>Locator-Type</strong>,
            width: 100,
            headerClassName: 'header-column',
            editable: true,
            // type: 'singleSelect',
            // valueOptions: locatorTypes
        },
        {
            field: "locatorValue",
            headerName: <strong>Locator-Value</strong>,
            width: 120,
            headerClassName: 'header-column',
            editable: true
        },
        {
            field: "value",
            headerName: <strong>Parameter</strong>,
            width: 120,
            headerClassName: 'header-column',
            editable: true,
            renderCell: (params) => {
                // Check if the keyword is 'typeMaskedText' and value is empty
                if (params.row.keyword === 'typeMaskedText' && params.row.value === '') {
                    return <span></span>;
                }
                // Check if the keyword is 'typeMaskedText' and value is not empty
                else if (params.row.keyword === 'typeMaskedText' && params.row.value !== '') {
                    return <span>********</span>;
                }
                // Render actual value for other cases
                return <span>{params.row.value}</span>;
            }
        },
        {
            field: "flag",
            headerName: <strong>Flag</strong>,
            width: 80,
            headerClassName: 'header-column',
            editable: true,
            type: 'singleSelect',
            valueOptions: flags
        },
        {
            field: "screenshot",
            headerName: <strong>Screenshot</strong>,
            width: 100,
            headerClassName: 'header-column',
            editable: true,
            renderCell: (params) => (
                <input
                    type="checkbox"
                    checked={params.value}
                    onChange={(event) => handleCheckboxChange(event, params.row.id)}

                />
            )
        },
        {
            field: "save",
            headerName: <strong>Save</strong>,
            width: 80,
            headerClassName: 'header-column',
            renderCell: (params) =>
                <Box>
                    <Button id='saveBtn' onClick={() => handleSaveOperation(params.row)}>
                        <SaveIcon />
                    </Button>
                </Box>
        },
        {
            field: "delete",
            headerName: <strong>Delete</strong>,
            width: 80,
            headerClassName: 'header-column',
            renderCell: (params) =>
                <Box>
                    <Button id='deleteBtn' onClick={() => handleDeleteOperation(params.row)}>
                        <DeleteIcon />
                    </Button>
                </Box>
        }
    ]

    const rows = subTests.map((data) => {
        return {
            id: data.id,
            keyword: data.keyword,
            orderOfExecution: data.orderOfExecution,
            description: data.description,
            locatorType: data.locatorType,
            locatorValue: data.locatorValue,
            value: data.value,
            flag: data.flag,
            screenshot: data.screenshot ? true : false,
        }
    })

    const getRowId = (data) => data.id

    return (
        <Box>
            <DataGrid
                columns={fields}
                rows={rows}
                getRowId={getRowId}
                disableRowSelectionOnClick
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                }
                isCellEditable={isCellEditable}
                sx={{
                    boxShadow: 3,
                    border: 1,
                    borderColor: 'black',
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'end', margin: '40px', gap: '10px' }}>
                <Button type='button' id='addBtn' variant='contained' onClick={handleAddClick} color='primary'>ADD</Button>
                <Button type='button' id='runBtn' variant='contained' onClick={handleExecution} color='success'>EXECUTE</Button>
            </Box>
        </Box>
    )
}
export default DatagridSample
