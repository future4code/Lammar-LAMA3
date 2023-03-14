export abstract class BaseError extends Error {
    constructor(message: string, public code: number) {
      super(message);
    }
  }
  
  export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Senha inválida")
    }
}

export class ShortPassword extends CustomError{ 
    constructor(){
        super(400, "Senha curta! A senha precisa ter 6 ou mais caracteres")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}

export class UserAlreadyExists extends CustomError{ 
    constructor(){
        super(401, "Este usuário já existe no banco de dados")
    }
}

// -------------- Erros recipe ------------------//

export class InvalidRecipe extends CustomError{ 
    constructor(){
        super(400, "Receita inválido")
    }
}

export class RecipeNotFound extends CustomError{ 
    constructor(){
        super(404, "Receita não encontrada")
    }
}

export class RecipeAlreadyExists extends CustomError{ 
    constructor(){
        super(401, "Esta receita já existe no banco de dados")
    }
}


export class ShortDescription extends CustomError{ 
    constructor(){
        super(400, "Descrição curta! A descrição precisa ter 10 ou mais caracteres")
    }
}
