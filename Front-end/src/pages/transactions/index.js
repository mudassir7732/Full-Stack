import React, {useState, useEffect } from 'react';
import styles from '../products/styles';
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';

const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Transactions = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.get()
            .then((res) => {
                console.log(res.data, ' = Response')
            })
            .catch((err) => {
                console.log(err, ' = Error')
            })
    }

    const handleClick=()=>{
        console.log('')
    }

    return (
        <div className="w-full bg-white ">

            <TableContainer sx={{ paddingInline: '30px', paddingBlock: '5px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }} >
                                Serial No.
                            </TableCell>
                            <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }} >
                                Type
                            </TableCell>
                            <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }} >
                                Amount
                            </TableCell>
                            <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }} >
                                Date
                            </TableCell>
                            <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }} >
                                Description
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item, index) => (
                            <TableRow>
                                <TableCell>
                                    {item?.name}
                                </TableCell>
                                <TableCell>
                                    {item?.date}
                                </TableCell>
                                <TableCell>
                                    <button id={1} className={styles.viewButton}
                                        onClick={() => handleClick(item?.id)}
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <select
                name=''
                // value={section.month}
                // onChange={handleChange}
                className='bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-full outline-none font-normal'
            >
                <option value="" label="Select month" />
                {MONTH_OPTIONS.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select> */}
        </div>
    )
}
export default Transactions;