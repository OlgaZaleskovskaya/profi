

export enum Role {
  Master = "master",
  Customer = "customer"

}

export class User {
  id: string;
  name: string;
  email: string;
  role: Role;
  public password: string;
  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  //private _token: string;

  /*  public get password(): string {
     return this._password;
   }

   public set password(password: string) {
     this._password = password;
   }

   public get token(): string {
     return this._token;
   }

   public set token(token: string) {
     this._token = token;
   } */
}


