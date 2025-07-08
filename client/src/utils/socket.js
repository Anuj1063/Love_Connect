import io from "socket.io-client";
import BaseUrl from "./basUrl";


export const createSocketConnection = (userId)=>{
    return io(BaseUrl,{
        query:{userId},
        withCredentials :true,
    })
}