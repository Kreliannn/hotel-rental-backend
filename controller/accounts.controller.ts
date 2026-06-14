import { Response, response } from "express";
import { AuthRequest } from "../types/request.type";
import { accountInterface, accountInterfaceInput } from "../types/accounts.type";
import { AccountService } from "../services/acccount.service";

export class AccountController {

  static createAccount = async (request : AuthRequest , response : Response) => {
    const accountData : accountInterfaceInput = request.body
    if(await AccountService.checkUsername(accountData.username)){
      response.status(500).send("username already exist")
      return
    }
    await AccountService.create(accountData)
    const accounts = await AccountService.getAll()
    response.send(accounts)
  }

  static login = async (request : AuthRequest , response : Response) => {
    const { username, password } = request.body
    const account = await AccountService.findByLogin(username, password)
    if(!account){
        response.status(500).send("user not found")
        return
    }
    response.send(account)
  }

  static getAccounts = async (request : AuthRequest , response : Response) => {
    const accounts = await AccountService.getAll()
    response.send(accounts)
  }

  static updateAccount = async (request : AuthRequest , response : Response) => {
    const { _id, name, username, password, permisions } = request.body
    await AccountService.update(_id, { name, username, password, permisions })
    const accounts = await AccountService.getAll()
    response.send(accounts)
  }

  static deleteAccount = async (request : AuthRequest , response : Response) => {
    const { _id } = request.body
    await AccountService.delete(_id)
    const accounts = await AccountService.getAll()
    response.send(accounts)
  }

}
