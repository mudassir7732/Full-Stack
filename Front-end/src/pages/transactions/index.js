import React, { useState, useEffect } from 'react';
import styles from './styles';
import styles2 from '../products/styles';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Loader from '../../components/loader';
import CustomSnackbar from '../../components/snackbar';
import { MONTH_OPTIONS } from '../../constants';


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
                <div className={styles.container}>
                    <div className={styles.header}>
                        <p className='font-sans font-bold text-[#000080] text-[20px]'>
                            Transactions
                        </p>
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className={styles.select}
                        >
                            {MONTH_OPTIONS?.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.statsWrapper}>
                        <div className={styles2.headingBox}>
                            <p className={styles2.headingTitle}>
                                Total Profit
                            </p>
                            <p className={styles2.headingTitle}>
                                {profit}
                            </p>
                        </div>

                        <div className={styles2.headingBox}>
                            <p className={styles2.headingTitle}>
                                Total Expense
                            </p>
                            <p className={styles2.headingTitle}>
                                {expense}
                            </p>
                        </div>

                        <div className={styles2.headingBox}>
                            <p className={styles2.headingTitle}>
                                Total Cash Flow
                            </p>
                            <p className={styles2.headingTitle}>
                                {totalCash}
                            </p>
                        </div>
                    </div>

                    <TableContainer sx={{
                        paddingBlock: '0px', marginTop: '4vh', borderRadius: '10px', overflow: 'scroll', maxWidth: '95vw',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'
                    }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#d1edff' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: '500', fontSize: '13px', color: '#a0a0a0', minWidth:'95px' }}>
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
                                {data?.map((item, index) => {
                                    if ((month === 'Select Month') ^ (item?.month === month)) {
                                        return (
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
                                                <TableCell sx={{ minWidth: '120px' }}>
                                                    {item.day + ", " + item.month}
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: '25vw' }}>
                                                    {item?.description}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    );
};

export default Transactions;
