import { Repository } from "typeorm";
import { connection, myDataSource } from "../database/db";
import { User } from "../database/entities/user.entity";
import { CreateUserDto } from "../dtos/createUser.request.dto";
import { UserResponseDto } from "../dtos/createUser.response.dto";
import { createUserMapper, updateUserMapper } from "../mapper/user.mapper";
import {
  createCacheData,
  createLeaderboard,
  getLeaderboard,
  readCachedData,
} from "../utils/Redis";


class UserService {
  userRepo: Repository<User>;
  constructor() {
    this.userRepo = myDataSource.getRepository(User);
  }

  public createUserService = async (data: CreateUserDto) => {
    try {
      const userRequestData = createUserMapper(data);
      const userResposeData = await this.userRepo.save(userRequestData);

      await createCacheData(userResposeData);
      await createLeaderboard(userResposeData);
      return new UserResponseDto(userResposeData);
    } catch (error) {
      throw new Error(error);
    }
  };
  public getUserService = async (query: any) => {
    const { search } = query;
      const querryRunner = (await connection)
        .getRepository(User)
        .createQueryBuilder("p");
      try {
        if (search) {
          querryRunner.andWhere("p.name like :name", { name: `%${search}%` });
        } 
        const [filteredData] = await querryRunner.getManyAndCount();
        return filteredData.map((val) => new UserResponseDto(val));
      } catch (error) {
        throw new Error(error);
      }
  };

  public getSingleUserService = async (id: string) => {
    const cachedUser = await readCachedData(id);
    if (cachedUser) {
      return new UserResponseDto(JSON.parse(cachedUser));
    } else {
      try {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) throw new Error("User not found");

        return new UserResponseDto(user);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  public updateUserService = async (id: string, data: CreateUserDto) => {
    const existingUser = await this.userRepo.findOneBy({ id });
    if (!existingUser) {
      throw new Error("User not found");
    }
    try {
      const updateRequestData = updateUserMapper(data);
      await this.userRepo.update(id, updateRequestData);
      const updatedUser = await this.userRepo.findOneBy({ id });
      await createLeaderboard(updatedUser);
      return new UserResponseDto(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  };

  public deleteUserService = async (id: string) => {
    try {
      const existingUser = await this.userRepo.findOneBy({ id });
      if (!existingUser) {
        throw new Error("User not found");
      }
      await this.userRepo.delete(id);
      return {
        message: "User deleted successfully",
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  public getUserLeaderboard = async() => {
    try {
      const resultantData = await getLeaderboard()
      return resultantData;
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserService();
