import { AppDataSource } from "../../data-source";
import bcryptjs from "bcryptjs";
import { ICreateRealtorPassword, IRealtors } from "../../interfaces/realtor";
import AppError from "../../errors/appError";
import { Realtor } from "../../entities/realtor.entity";

export default class CreateRealtorService {
  public static async execute(data: IRealtors) {
    const { password, email } = data;

    const realtorRepo = AppDataSource.getRepository(Realtor);
    const getRealtors = await realtorRepo.find();
    const realters = getRealtors.find((user) => user.email === email);

    if (realters) {
      throw new AppError("Realtor already is registered", 401);
    }

    const hash = await bcryptjs.hash(password, 10);
    data.password = hash;
    const relatorCreate: ICreateRealtorPassword = realtorRepo.create(data);
    await realtorRepo.save(relatorCreate);

    delete relatorCreate.password;

    return relatorCreate;
  }
}
