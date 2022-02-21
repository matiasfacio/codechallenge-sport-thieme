import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "./context";
import { Coach } from "@generated/type-graphql";

@Resolver()
export default class RandomCoachResolver {
  @Query(returns => Coach, { nullable: true })
  async randomCoach(@Ctx() { prisma }: Context) {
    const coaches = await prisma.coach.findMany();
    return coaches[Math.floor(Math.random() * coaches.length)];
  }
}
