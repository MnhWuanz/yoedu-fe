import { loginThunk, registerThunk } from '@/features/auth/store/auth-thunk';
import type { User } from '@/features/users/types/user-type';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface AuthState {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
  error: string | null;
}
const initialState: AuthState = {
    user: null,
    loading: false,
    accessToken: localStorage.getItem("token"),
    error: null,
}
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.accessToken=null;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.accessToken=action.payload.accessToken;
            localStorage.setItem("token",action.payload.accessToken);
        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })
        .addCase(registerThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerThunk.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.accessToken=action.payload.accessToken;
            localStorage.setItem("token",action.payload.accessToken);
        })
        .addCase(registerThunk.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })
    }
})
export const { logout } = authSlice.actions;

export default authSlice.reducer;
