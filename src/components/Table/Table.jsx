import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './Table.css'

function Table({ columns, data }) {
    const [pending, setPending] = useState(true);
    const [dynamicHeight, setDynamicHeight] = useState(0);

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);


    const customStyles = {
        table: {
            style: {
                boxShadow: '0px 0.7758524417877197px 10.086081504821777px 0px #000000',
                whiteSpace: 'normal',
            },
        },
        head: {
            style: {
                fontSize: '0.8rem',
                fontWeight: 'bold',
            },
        },
        rows: {
            marginTop: '1px',
            minHeight: '55px',
            height: 'fit-content',
            whiteSpace: 'normal',

            backgroundColor: '#ffffff',
            '&:hover': {
                cursor: 'pointer',
            },
            className: 'custom-row', // Add custom class
        },
        headCells: {
            style: {
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '21px',
                justifyContent: 'center',
                whiteSpace: 'normal',
                background: '#0f4bab',
                color: 'white',
            },
        },
        cells: {
            style: {
                color: '#212324',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '19px',
                borderRight: '1px solid #ccc',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '4px',
                whiteSpace: 'normal',
            },
        },
    };

    useEffect(() => {
        // Calculate the height dynamically
        setDynamicHeight(`calc(100vh - 150px)`)
    }, [])

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                progressPending={pending}
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight={dynamicHeight}
            />
        </div>
    );
}

export default Table;
