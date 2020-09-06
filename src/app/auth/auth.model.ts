

export enum Role {
  Master = "Master",
  Customer = "Customer",
  Admin = "Admin"

}
// for form to send to server
export class NewUser {
  constructor(
    public readonly name: string,
    public readonly email: string,
    private readonly password: string,
    public readonly role: string) {
  }
}

// recived from Sever after success login
export interface LoginResponseData {
  message: string;
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  date: string
}

// recived from Sever after success sign up
export interface SignupResponseData {
  message: string;
  user: string
}


export class User {
  id: string;
  name: string;
  role: string;
}

export class FetchedUser extends NewUser {
  constructor(
    private readonly _id: string,
    name: string,
    email: string,
    role: string, private readonly token: string,
    public readonly date?: string,) {
    super(name, email, '', role);
  }
  get id (){
    return this._id;
  }

}




