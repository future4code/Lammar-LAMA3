import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { BaseError } from "../error/BaseError";

export class UserDatabase extends BaseDatabase {

  public insertUser = async (user: User) => {
    try {
      await UserDatabase.connection
        .insert(user)
        .into("NOME_TABELAS_USUÁRIOS");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };



}
