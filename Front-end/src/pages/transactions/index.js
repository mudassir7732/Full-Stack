import React, { useState, useEffect } from 'react';
import styles from '../products/styles';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Loader from '../../components/loader';
import CustomSnackbar from '../../components/snackbar';
import { MONTH_OPTIONS } from '../../constants/month_options';

const Transactions = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [month, setMonth] = useState('Select Month');
    const [profit, setProfit] = useState(0);
    const [expense, setExpense] = useState(0);
    const [totalCash, setTotalCash] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        await axios.get('http://localhost:5000/routes/transactions/get-transactions')
            .then((res) => {
                setData(res?.data);
            })
            .catch((err) => {
                console.log(err, ' = Error');
                setMessage(err?.message || "Error occurred while fetching data");
            })
            .finally(() => {
                calculateTotals();
                setLoading(false);
            });
    };

    const calculateTotals = () => {
        let totalAmount = 0;
        let totalExpense = 0;
        let totalProfit = 0;
        data?.forEach((item) => {
            if (month !== '' && item?.month === month) {
                totalAmount += item?.amount;
                if (item?.type === 'Expense') {
                    totalExpense += item?.amount;
                } else if (item?.type === 'Income') {
                    totalProfit += item?.amount;
                }
            }
            else if (month === 'Select Month') {
                totalAmount += item?.amount;
                if (item?.type === 'Expense') {
                    totalExpense += item?.amount;
                } else if (item?.type === 'Income') {
                    totalProfit += item?.amount;
                }
            }
        });

        setTotalCash(totalAmount);
        setExpense(totalExpense);
        setProfit(totalProfit);
    };

    useEffect(() => {
        calculateTotals();
    }, [data, month]);

    return (
        <>
            {loading && <Loader />}
            {message && <CustomSnackbar message={message} />}
            {data && (
                <div className="bg-white py-4 px-[30px] my-4 border-[1px] border-[#e9e9e9] shadow-lg rounded-[16px]">
                    <div className='flex flex-row justify-between items-start mb-2'>
                        <p className='font-sans font-bold text-[#000080] text-[20px]'>
                            All Transactions
                        </p>
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className='bg-[#fdfdfd] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[30px] w-fit mb-4 outline-none font-normal'
                        >
                            {MONTH_OPTIONS?.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.header}>
                        <div className={styles.headingBox}>
                            <p className={styles.headingTitle}>
                                Total Profit
                            </p>
                            <p className={styles.headingTitle}>
                                {profit}
                            </p>
                        </div>

                        <div className={styles.headingBox}>
                            <p className={styles.headingTitle}>
                                Total Expense
                            </p>
                            <p className={styles.headingTitle}>
                                {expense}
                            </p>
                        </div>

                        <div className={styles.headingBox}>
                            <p className={styles.headingTitle}>
                                Total Cash Flow
                            </p>
                            <p className={styles.headingTitle}>
                                {totalCash}
                            </p>
                        </div>
                    </div>

                    <TableContainer sx={{ paddingBlock: '0px', marginTop: '4vh', borderRadius: '10px' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#d1edff' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }}>
                                        Serial No.
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }}>
                                        Type
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }}>
                                        Amount
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }}>
                                        Date
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0' }}>
                                        Description
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((item, index) => (
                                    // item?.month === month && (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {item?.type}
                                            </TableCell>
                                            <TableCell>
                                                {item?.amount}
                                            </TableCell>
                                            <TableCell>
                                                {item.day + ", " + item.month}
                                            </TableCell>
                                            <TableCell sx={{ maxWidth: '25vw' }}>
                                                {item?.description}
                                            </TableCell>
                                        </TableRow>
                                    // )
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    );
};

export default Transactions;
