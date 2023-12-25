import {Request, Response} from 'express'
import { CreateUserDto } from '../dtos/createUser.request.dto';
import  UserService  from '../services/user.service';

class UserController{
  constructor(){
}
   createUser = async (
    req: Request,
    res: Response
  ) => {
    const data:CreateUserDto = req.body
    if(!req.body){
      throw new Error("Please enter values")
    }
    const result = await UserService.createUserService(data)
    res.send(result);
  };
  
   getUsers = async (req:Request,res:Response) => {
    const query = req.query
    const result = await UserService.getUserService(query)
    res.send(result)
  }
  
  getSingleUser = async(req:Request, res:Response) => {
    const id:string = req.params.id
    const result = await UserService.getSingleUserService(id)
    res.send(result);
  }
  
  updateUser = async(req:Request,res:Response) => {
    const id:string = req.params.id
    const data:CreateUserDto = req.body
    const result = await UserService.updateUserService(id, data)
    res.send(result);
  }
  
  deleteUser = async(req:Request,res:Response) => {
    const id:string = req.params.id
    const result = await UserService.deleteUserService(id)
    res.send(result);
  }

  getLeaderboard = async(req:Request, res:Response) => {
    const result = await UserService.getUserLeaderboard()
    res.send(result)
  }
}

export default new UserController() 