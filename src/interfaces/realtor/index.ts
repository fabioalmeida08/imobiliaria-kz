export interface IRealtors {
    name: string;
    phone_number: string;
    email: string;
    password: string;
  }
export interface IRealtorsExtId extends IRealtors{
  id:string
}