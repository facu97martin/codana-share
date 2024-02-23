import { io } from "socket.io-client";

console.log(window.location.protocol + "//" + window.location.hostname + ":3000")
export const socket = io(
  window.location.protocol + "//" + window.location.hostname + ":3000",
  {
    withCredentials: false,
  }
);
