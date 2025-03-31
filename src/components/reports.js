import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
    Container,
    Chip,
    TextField,
    Button,
    Alert,
    Pagination
} from '@mui/material';
import {
    MenuBook,
    Warning,
    AccessTime,
    MonetizationOn,
    Search
} from '@mui/icons-material';
import { getBookAvailabilityReport, getBooksAvailableToBorrow, getOverdueBookReportByUserId } from '../services/apiService';

const ReportPage = () => {
    const [reportData, setReportData] = useState({
        total_books: 0,
        total_borrowed_books: 0,
        total_available_books: 0
    });
    const [availableBooks, setAvailableBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [overdueBooks, setOverdueBooks] = useState({
        overdue_items: [],
        total_fine: 0
    });
    const [inputUserId, setInputUserId] = useState('');
    const [searchedUserId, setSearchedUserId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUserSearch = () => {
        if (inputUserId.trim()) {
            setError('');
            setSearchedUserId(inputUserId.trim());
        } else {
            setError('Please enter a valid User ID');
        }
    };

    const handleInputChange = (event) => {
        setInputUserId(event.target.value);
        if (error) setError('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleUserSearch();
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const getReportData = async () => {
            try {
                setLoading(true);
                const data = await getBookAvailabilityReport();
                setReportData(data);
            } catch (error) {
                console.error("Failed to fetch report data", error);
                setError('Failed to fetch report data');
            } finally {
                setLoading(false);
            }
        };
        getReportData();
    }, []);

    useEffect(() => {
        const getAvailableBooks = async () => {
            try {
                setLoading(true);
                const data = await getBooksAvailableToBorrow(page, 5); // 5 items per page
                setAvailableBooks(data.data);
                setTotalPages(data.pagination.totalPages);
            } catch (error) {
                console.error("Failed to fetch available books", error);
                setError('Failed to fetch available books');
            } finally {
                setLoading(false);
            }
        };
        getAvailableBooks();
    }, [page]); // Re-fetch when page changes

    useEffect(() => {
        const getOverdueBooks = async () => {
            try {
                if (searchedUserId) {
                    setLoading(true);
                    const data = await getOverdueBookReportByUserId(searchedUserId);
                    setOverdueBooks(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch overdue books", error);
                setError('Failed to fetch overdue books');
            } finally {
                setLoading(false);
            }
        };

        if (searchedUserId) {
            getOverdueBooks();
        }
    }, [searchedUserId]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Library Reports
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Available Books Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <MenuBook sx={{ mr: 1 }} />
                                <Typography variant="h6">
                                    Available Books
                                </Typography>
                            </Box>
                            <List>
                                {availableBooks.map((book) => (
                                    <ListItem key={book.book_id} divider alignItems="flex-start">
                                        <Box sx={{ width: 100, height: 140, mr: 2, flexShrink: 0 }}>
                                            <img
                                                src={book.image_url}
                                                alt={book.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-book.jpg';
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        </Box>
                                        <ListItemText
                                            primary={book.title}
                                            primaryTypographyProps={{
                                                variant: 'subtitle1',
                                                component: 'div',
                                                sx: { fontWeight: 'medium' }
                                            }}
                                            secondary={
                                                <Box component="div" sx={{ mt: 1 }}>
                                                    <Typography component="div" variant="body2" color="text.secondary">
                                                        {book.description}
                                                    </Typography>
                                                    <Box sx={{ mt: 1 }}>
                                                        <Chip
                                                            size="small"
                                                            label={`Published: ${book.publication_year}`}
                                                        />
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            {totalPages > 1 && (
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        color="primary"
                                        disabled={loading}
                                    />
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Combined Search and Overdue Books Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Warning sx={{ mr: 1, color: 'error.main' }} />
                                <Typography variant="h6" color="error.main">
                                    Overdue Books
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Enter User ID"
                                        variant="outlined"
                                        value={inputUserId}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        error={!!error}
                                        helperText={error}
                                    />
                                    <Button
                                        variant="contained"
                                        startIcon={<Search />}
                                        onClick={handleUserSearch}
                                        disabled={loading}
                                    >
                                        {loading ? 'Searching...' : 'Search'}
                                    </Button>
                                </Box>
                            </Box>

                            {searchedUserId ? (
                                <>
                                    <Box sx={{ mb: 2 }}>
                                        <Chip
                                            icon={<MonetizationOn />}
                                            label={`Total Fine: $${overdueBooks.total_fine}`}
                                            color="error"
                                        />
                                    </Box>
                                    <List>
                                        {overdueBooks.overdue_items?.map((item) => (
                                            <ListItem key={item.loan_id} divider>
                                                <ListItemText
                                                    primary={item.book_title}
                                                    secondary={
                                                        <Box component="div">
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                                <AccessTime sx={{ mr: 1, fontSize: 'small' }} />
                                                                <Typography component="div" variant="body2" color="error.main">
                                                                    {item.days_overdue} days overdue
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                                <MonetizationOn sx={{ mr: 1, fontSize: 'small' }} />
                                                                <Typography component="div" variant="body2">
                                                                    Fine: ${item.fine_amount}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            ) : (
                                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                                    Enter a User ID to view overdue books
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReportPage;