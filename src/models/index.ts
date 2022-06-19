import  { v4 as uuidv4 } from 'uuid'
import { pid } from 'process';
import { IUser, IUsersWithId } from '../types'

class UsersService {
  public users: IUser[];

  constructor() {
    this.users = [];
  }

  async GetUsers(): Promise<IUser[]> {
    const usr = this.users
    process.send?.({ usr, pid })
    return this.users;
  }

  async CreateUser(user: IUsersWithId): Promise<IUser> {
    const newUser = {id: uuidv4(), ...user};
    this.users.push(newUser);
    const usr = this.users
    process.send?.({ usr, pid })
    return newUser
  }

  async GetUserById(id: string): Promise<IUser | undefined> {
    const usr = this.users
    process.send?.({ usr, pid })
    return this.users.find((user: IUser) => user.id === id);
  }

  async DeleteUser(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
    const usr = this.users
    process.send?.({ usr, pid })
  }

  async UpdateUser( user: IUser): Promise<IUser> {
    const ind = this.users.findIndex((us) => {
      us.id === user.id
    })
    this.users.splice(ind, 1 , user)
    const usr = this.users
    process.send?.({ usr, pid })
    return user;
  }
}

export default new UsersService();