import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";


const idGenerator = new IdGenerator();
// const tokenGenerator = new TokenGenerator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();

export class UserBusiness {
    public createUser = async (input: UserInputDTO): Promise<string> => {
        try {
          const { name, email, password } = input;
    
          if (!name || !email || !password) {
            throw new BaseError(
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
    
          const users = await userDatabase.findUser(email);
    
          if (users && name === users.name && email === users.email && await hashManager.compare(password, users.password)) {
            throw new UserAlreadyExists();
          } 
          
          const id: string = idGenerator.generateId();
    
          const hashPassword: string = await hashManager.hash(password);
    
          const user: user = {
            id,
            name,
            email,
            password: hashPassword,
          };
    
          await userDatabase.insertUser(user);
    
          const token = tokenGenerator.generateToken({ id });
    
          return token;
        } catch (error: any) {
          throw new CustomError(400, error.message);
        }
      };

   

   
}