import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from "@mui/material/";

const SortingForm = ( { setSortByOptions, setSortOrder }) => {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(sortBy){
      setSortByOptions(sortBy)
    }
    if(order){
      setSortOrder(order)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: '10px', width: '300px' }}>
      <FormControl fullWidth size="small" sx={{ mb: '10px' }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortBy} onChange={handleSortByChange}>
          <MenuItem value="total_rating">Rating</MenuItem>
          <MenuItem value="first_release_date">Release Date</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mb: '10px',}}>
        <InputLabel>Order</InputLabel>
        <Select value={order} onChange={handleOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default SortingForm;
