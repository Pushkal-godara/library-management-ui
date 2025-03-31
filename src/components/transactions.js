import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { borrowBook, returnBook } from '../services/apiService';
import { 
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronDown } from 'lucide-react';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiAccordionSummary-root': {
        backgroundColor: theme.palette.grey[50],
    },
    '& .MuiAccordionDetails-root': {
        padding: theme.spacing(3),
    },
}));

const FormTextField = styled(TextField)({
    marginBottom: '16px',
    width: '100%'
});

const TransactionPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [expanded, setExpanded] = useState('borrow');
    
    const [borrowPayload, setBorrowPayload] = useState({
        user_id: '',
        book_id: '',
        due_date: '',
        issue_date: '',
    });

    const [returnPayload, setReturnPayload] = useState({
        user_id: '',
        book_id: '',
    });

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmitBorrow = async (e) => {
        e.preventDefault();
        try {
            await borrowBook(borrowPayload);
            navigate('/transaction');
        } catch (error) {
            setError('Error while borrowing book: ' + error);
        }
    };

    const handleSubmitReturn = async (e) => {
        e.preventDefault();
        try {
            await returnBook(returnPayload);
            navigate('/transaction');
        } catch (error) {
            setError('Error while returning book: ' + error);
        }
    };

    const handleChangeBorrow = (e) => {
        const { name, value } = e.target;
        setBorrowPayload((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangeReturn = (e) => {
        const { name, value } = e.target;
        setReturnPayload((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Book Transactions
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ mt: 3 }}>
                    {/* Borrow Book Form */}
                    <StyledAccordion 
                        expanded={expanded === 'borrow'} 
                        onChange={handleAccordionChange('borrow')}
                    >
                        <AccordionSummary
                            expandIcon={<ChevronDown />}
                            aria-controls="borrow-content"
                            id="borrow-header"
                        >
                            <Typography variant="h6">Borrow Book</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form onSubmit={handleSubmitBorrow}>
                                <FormTextField
                                    label="User ID"
                                    name="user_id"
                                    value={borrowPayload.user_id}
                                    onChange={handleChangeBorrow}
                                    required
                                    variant="outlined"
                                />
                                <FormTextField
                                    label="Book ID"
                                    name="book_id"
                                    value={borrowPayload.book_id}
                                    onChange={handleChangeBorrow}
                                    required
                                    variant="outlined"
                                />
                                <FormTextField
                                    label="Issue Date"
                                    name="issue_date"
                                    type="date"
                                    value={borrowPayload.issue_date}
                                    onChange={handleChangeBorrow}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                                <FormTextField
                                    label="Due Date"
                                    name="due_date"
                                    type="date"
                                    value={borrowPayload.due_date}
                                    onChange={handleChangeBorrow}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                                <Button 
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                >
                                    Submit Borrow Request
                                </Button>
                            </form>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* Return Book Form */}
                    <StyledAccordion 
                        expanded={expanded === 'return'} 
                        onChange={handleAccordionChange('return')}
                    >
                        <AccordionSummary
                            expandIcon={<ChevronDown />}
                            aria-controls="return-content"
                            id="return-header"
                        >
                            <Typography variant="h6">Return Book</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form onSubmit={handleSubmitReturn}>
                                <FormTextField
                                    label="User ID"
                                    name="user_id"
                                    value={returnPayload.user_id}
                                    onChange={handleChangeReturn}
                                    required
                                    variant="outlined"
                                />
                                <FormTextField
                                    label="Book ID"
                                    name="book_id"
                                    value={returnPayload.book_id}
                                    onChange={handleChangeReturn}
                                    required
                                    variant="outlined"
                                />
                                <Button 
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                >
                                    Submit Return Request
                                </Button>
                            </form>
                        </AccordionDetails>
                    </StyledAccordion>
                </Box>
            </Box>
        </Container>
    );
};

export default TransactionPage;