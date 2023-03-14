import { UserInputDTO, LoginInputDTO, User, UserRole } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import {  CustomError,  InvalidEmail,  InvalidName,  ShortPassword,  UserAlreadyExists,} from "../error/BaseError";

const idGenerator = new IdGenerator();
const authenticator = new Authenticator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();

export class UserBusiness {
  public createUser = async (input: UserInputDTO): Promise<User> => {
    try {
      const { name, email, password, role } = input; 

      if (!name || !email || !password || !role) {
        throw new CustomError(
          400,
          'Preencha os campos "name", "email" e "password"'
        );
      }

      if (name.length < 2) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (password.length <= 6) {
        throw new ShortPassword();
      }

      const users = await userDatabase.getUserByEmail(email);

      if (
        users &&
        name === users.name &&
        email === users.email &&
        (await hashManager.compare(password, users.password))
      ) {
        throw new UserAlreadyExists();
      }

      const id: string = idGenerator.generate();

      const hashPassword: string = await hashManager.hash(password);

      const user: User = {
        id,
        name,
        email,
        password: hashPassword,
        role: role.UserRole
      };

      await userDatabase.insertUser(user);

      const token = authenticator.generateToken({ id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  async getUserByEmail(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.getUserByEmail(user.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
