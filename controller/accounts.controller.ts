import { Response, response } from "express";
import { AuthRequest } from "../types/request.type";
import { accountInterface, accountInterfaceInput } from "../types/accounts.type";
import { AccountService } from "../services/acccount.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = "management"


export class AccountController {

  static createAccount = async (request : AuthRequest , response : Response) => {

    const accountData : accountInterfaceInput = request.body

    if(await AccountService.checkUsername(accountData.username)){
        response.status(500).send("username already exist")
        return
    }
    const hashedPassword = await bcrypt.hash(accountData.password, 10);
    accountData.password = hashedPassword

    console.log(accountData)

    const account = await AccountService.create(accountData)

    response.send(account)
  }

  static login = async (request : AuthRequest , response : Response) => {
    const { username, password } = request.body
    const account = await AccountService.checkUsername(username)

     if(!account){
        response.status(500).send("user not found")
        return
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if(!isMatch){
        response.status(500).send("incorect password")
        return
    }

   
    const token = jwt.sign({ id: account._id }, secret, { expiresIn: "3d" });

    response.send({account , token});
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

  static changeCredentials = async (request : AuthRequest , response : Response) => {
    try {
      const { oldUsername, oldPassword, newUsername, newPassword } = request.body
      const accountId = request.account?._id

      if (!accountId) {
        response.status(401).json({ message: "Unauthorized" })
        return
      }

      // Verify old credentials belong to the authenticated user
      const account = await AccountService.checkUsername(oldUsername)
      if (!account || account._id.toString() !== accountId) {
        response.status(400).json({ message: "username not foundt" })
        return
      }

      const isMatch = await bcrypt.compare(oldPassword, account.password);

      if(!isMatch){
          response.status(500).send("incorect old password")
          return
      }


      // Check if new username is already taken (if changing username)
      if (newUsername && newUsername !== oldUsername) {
        const existing = await AccountService.checkUsername(newUsername)
        if (existing) {
          response.status(400).json({ message: "New username is already taken" })
          return
        }
      }



      await AccountService.changeCredentials(accountId, {
        username: newUsername || undefined,
        password: newPassword ? await bcrypt.hash(newPassword, 10) : undefined,
      })

      response.json({ message: "Credentials updated successfully" })
    } catch (error) {
      console.error(error)
      response.status(500).json({ message: "Failed to update credentials" })
    }
  }

}
