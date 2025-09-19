
import axios from "axios";

export interface LoginRequest {
  email : string;
  password : string;
  rememberMe : boolean;
}

export interface LoginResponse {
  token : string;
  user : {
    id: string;
    name: string;
    email: string;
  };
}