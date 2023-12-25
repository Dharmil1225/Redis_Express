import { User } from "../database/entities/user.entity";

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  address: string;
  pinCode: number;
  score: number;
  constructor(data: User) {
    this.id = data?.id;
    this.name = data?.name;
    this.email = data?.email;
    this.address = data?.address;
    this.pinCode = data?.pinCode;
    this.score = data?.score;
  }
}
