import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async ({ name, number }, thunkAPI) => {
  try {
    const response = await axios.post('/contacts', { name, number });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const contactsAdapter = createEntityAdapter();

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState({ isLoading: false, error: null }),
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => { state.isLoading = true; })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        contactsAdapter.addOne(state, action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        contactsAdapter.removeOne(state, action.payload);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const contactsSelectors = contactsAdapter.getSelectors(state => state.contacts);