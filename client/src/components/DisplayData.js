import React, { useState, useEffect } from 'react';
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import { ethers } from "ethers";
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled,useTheme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


const DisplayData = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
   

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const ContractAddress = "0xE4b876ed393E19FbD18eC99118647BcbFE5300F3" //"0xFa56954976bA7d616945c09A7e360499e7038d98";
    const [id, setId] = useState(1);
    const [data, setData] = useState();

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    console.log(id);
    async function getData() {
        if (typeof window.ethereum !== "undefined") {
            requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(await signer.getAddress())

            const contract = new ethers.Contract(
                ContractAddress,
                SupplyChain.abi,
                provider
            );
            try {

                const Wdata = await contract.getProductData(id);
                console.log("data: ", Wdata);
                setData(Wdata);
                console.log(Wdata)
              
                //console.log(contract);

            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }


    if (data == null) {
        getData();
        return (
            <div style={{ textAlign: "center", padding: "10%" }}>
                <Box sx={{ color: 'grey.500' }}>
                    <CircularProgress color="inherit" />
                </Box>
            </div>
        );
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


    return (
        <>

            {/* <TextField id="standard-basic" label="Enter PID" variant="standard" onChange={(e) => setId(e.target.value)} /> */}
            <div style={{display: 'flex',justifyContent: 'center',marginTop:"3%" }}>
                {/* <TextField variant="outlined" id="outlined" label="Enter Product ID" onChange={(e) => setId(e.target.value)} />
                <Button variant="contained" endIcon={<SendIcon />} onClick={getStatus} >
                Send
                </Button> */}
                <Paper 
                    elevation={3} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter Product ID"
                        onChange={(e) => setId(e.target.value)}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="search" onClick={getData}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>

            <div style={{ overflow: "auto" }}>

             

                <TableContainer component={Paper} sx={{ width: "50%", margin: "auto", marginTop: "5%" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Sr. No.</StyledTableCell>
                                
                                <StyledTableCell align="left">temp</StyledTableCell>
                                <StyledTableCell align="left">humidity</StyledTableCell>
                                <StyledTableCell align="right">hindex(feels like)</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, iterator) => (
                                <StyledTableRow
                                    key={iterator}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">{iterator + 1}</StyledTableCell>
                                   
                                    <StyledTableCell align="left">{parseInt(row.temp._hex)}°C</StyledTableCell>
                                    <StyledTableCell align="left">{parseInt(row.humidity._hex)}%</StyledTableCell>
                                    <StyledTableCell align="right">{parseInt(row.hindex._hex)}°C</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </>);
}

export default DisplayData;