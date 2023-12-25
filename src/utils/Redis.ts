import { Redis } from "ioredis";
import { UserResponseDto } from "../dtos/createUser.response.dto";

const client = new Redis();

export const createCacheData = async (data: UserResponseDto) => {
  try {
    console.log("[Caching new data]...", createCacheData);
    return await client.set(`user:${data.id}`, JSON.stringify(data));
  } catch (error) {
    console.log("cacheNewData", data, "error:", error);
  }
};

export const readCachedData = async (userId: string) => {
  try {
    console.log("[Reading cached data]...", readCachedData);
    return await client.get(`user:${userId}`);
  } catch (error) {
    console.log("cacheNewData --->", "error:", error);
  }
};

export const createListData = async (data: UserResponseDto) => {
  console.log("[Caching new list data]...", createCacheData);
  return await client.lpush("UserList", JSON.stringify(data));
};

export const readAllListData = async () => {
  console.log("[Reading all List Data]", readAllListData);
  return await client.lrange("UserList", 0, -1);
};

export const createLeaderboard = async(data: UserResponseDto) => {
  console.log("[Creating leaderboard]...", createLeaderboard)
  return await client.zadd('leaderboard',data.score, data.name)
}

export const getLeaderboard = async() => {
  let formattedLeaderboard:any = [];
  console.log("[Getting Leaderboard]...", getLeaderboard)
  await client.zrevrange('leaderboard',0,-1,'WITHSCORES',(err, leaderboard) => {
    if (err) {
      return err
    } else {
      for (let i = 0; i < leaderboard.length; i += 2) {
        formattedLeaderboard.push({
          name: leaderboard[i],
          score: parseInt(leaderboard[i + 1])
        });
      }
    }
  })
  return formattedLeaderboard
}