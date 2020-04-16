import { User } from "../entities/user.entity";
import { getRepository } from "typeorm";

export function getUsers() {
  return getRepository(User).find();
}

export async function createUser(data: User) {
  let newUser = getRepository(User).create(data);
  return await getRepository(User).save(newUser)
}

export function getUser(id: string) {
  return getRepository(User).findOne(id);
}

export async function updateUser(id: string, data: User) {
  let modifyUser = new User();
  modifyUser.name = data.name;
  modifyUser.email = data.email;
  modifyUser.introduction = data.introduction;

  await getRepository(User).update(id, modifyUser);
  return await getRepository(User).findOne(id);
}

export function deleteUser(id: string) {
  return getRepository(User).delete(id);
}

