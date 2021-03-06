import { AppDataSource } from "../../data-source";
import { Clients } from "../../entities/clients.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import { CreateProperty } from "../../interfaces/properties";
import { ReturnedPropertyList } from "./listPropertiesByQuery.service";

export default class CreatePropertyService {
  public static async execute(
    data: CreateProperty
  ): Promise<ReturnedPropertyList> {
    const propertyRepository = AppDataSource.getRepository(Property);
    const clientRepository = AppDataSource.getRepository(Clients);
    const realtorRepository = AppDataSource.getRepository(Realtor);

    const client_seller = await clientRepository.findOne({
      where: {
        id: data.id_client,
      },
    });

    const realtor_creator = await realtorRepository.findOne({
      where: {
        id: data.id_realtor,
      },
    });

    const property = new Property();
    property.street = data.street;
    property.city = data.city;
    property.state = data.state;
    property.postal_code = data.postal_code;
    property.country = data.country;
    property.area = data.area;
    property.complement = data.complement;
    property.type = data.type;
    property.acquisition_type = data.acquisition_type;
    property.price = data.price;
    property.description = data.description;
    property.client_seller = client_seller as Clients;
    property.realtor_creator = realtor_creator as Realtor;

    await propertyRepository.save(property);

    const propertyReturned: ReturnedPropertyList = {
      ...property,
      client_seller: {
        id: client_seller?.id as string,
        name: client_seller?.name as string,
      },
      realtor_creator: {
        id: realtor_creator?.id as string,
        name: realtor_creator?.name as string,
      },
    };

    return propertyReturned;
  }
}
