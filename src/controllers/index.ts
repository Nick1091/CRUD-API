import { IncomingMessage, ServerResponse } from 'http'
import UsersService from '../models';
import { getBody, getRespMessage, getRespData, getRespDataDelete } from '../utils';
import { IUser, IUsersWithId } from '../types';
import { Codes, messages } from '../constants';

export const getUsers = async ( res: ServerResponse) => {
  try {
    await UsersService.GetUsers()
    return getRespData(res, UsersService.users, Codes.success200)
  } catch {
    return getRespMessage(res, messages.serverError, Codes.serverCode);
  }
}

export const getUser = async ( res: ServerResponse, id: string) => {
  try {
    const user = await UsersService.GetUserById(id)
    if(user){
      return getRespData(res, user, Codes.success200)
    } else {
      return getRespMessage(res, messages.userError, Codes.client404);
    }
  } catch {
    return getRespMessage(res, messages.serverError, Codes.serverCode);
  }
}

export const createUser = async (req: IncomingMessage, res: ServerResponse ) => {
  try {
      const { username, age, hobbies } = await getBody(req);
      if( typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)){
        const user: IUsersWithId = {username, age, hobbies }
        const newUsers = await UsersService.CreateUser(user);
        return getRespData(res, newUsers, Codes.success201)
      } else {
        return getRespMessage(res, messages.fieldsReqErr, Codes.client400);
      }
  } catch {
    return getRespMessage(res, messages.serverError, Codes.serverCode);
  }
}

export const putUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await UsersService.GetUserById(id)
    const { username, age, hobbies } = await getBody(req)
    if(user){
      if( typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)){
        const us: IUser = { id, username, age, hobbies }
        const newUsers = await UsersService.UpdateUser(us);
        return getRespData(res, newUsers, Codes.success200)
      }
        return getRespMessage(res, messages.badRequest, Codes.client404);
    } else {
      return getRespMessage(res, messages.userError, Codes.client404);
    }
  } catch {
    return getRespMessage(res, messages.serverError, Codes.serverCode);
  }
}
export const deleteUser = async (res: ServerResponse, id: string) => {
  try {
    const user = await UsersService.GetUserById(id)
    if(user){
      await UsersService.DeleteUser(id)
      return getRespDataDelete(res, Codes.success204)
    } else {
      return getRespMessage(res, messages.userError, Codes.client404);
    }
  } catch {
    return getRespMessage(res, messages.serverError, Codes.serverCode);
  }
}