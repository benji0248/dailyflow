import { connectToAccess } from "../../db/odbcConnection";
import { User } from "./types";

class UserService{

    static async getAllUsers(){
        const connection = await connectToAccess();
        const query = `SELECT * FROM Users`;
        const result = await connection.query(query);
        return result as User[];
    }
}

export default UserService;
