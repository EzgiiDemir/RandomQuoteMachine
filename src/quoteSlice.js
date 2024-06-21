import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuote = createAsyncThunk('quote/fetchQuote', async () => {
  const response = await axios.get('https://api.quotable.io/random');
  return response.data;
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: '',
    author: '',
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.quote = action.payload.content;
        state.author = action.payload.author;
        state.loading = false;
      })
      .addCase(fetchQuote.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default quoteSlice.reducer;
