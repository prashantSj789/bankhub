import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const showUser = createAsyncThunk(
    "auth/showUser",
    async (args, { rejectWithValue }) => {
      const response = await fetch(
        "http://localhost:8080/account",
        { method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            
          }
      );
  
      try {
        const result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  export const login = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
      console.log("data", data);
      const response = await fetch(
      "http://localhost:8080/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Invalid credentials.");
      }
  
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


const authSlice = createSlice({
    name: "auth",
    initialState: {
      token:null,
      accountNumber:null,
      pinCode:null,
      loading: false,
      error: null,
      searchData: [],
    },
  
    reducers: {
      searchUser: (state, action) => {
        console.log(action.payload);
        state.searchData = action.payload;
      },
      logout: (state) => {
        state.token = null;
        state.accountNumber = null;
      },
    },
  
    extraReducers: (builder) => {
        builder

        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.users.push(action.payload); 
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(showUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(showUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(showUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
    });
    export const { logout,searchUser } = authSlice.actions;
  export default authSlice.reducer;
  
  