import { PrismaClient, Prisma } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

const specialtiesCreate: Prisma.SpecialtyCreateInput[] = [
  { name: "Football" },
  { name: "Basketball" },
  { name: "Baseball" },
  { name: "Hockey" },
  { name: "Soccer" },
  { name: "Golf" },
  { name: "Tennis" },
  { name: "Swimming" },
  { name: "Rugby" },
];
const randomId = (): number =>
  Math.floor(Math.random() * specialtiesCreate.length) + 1;
const specialties =
  (): Prisma.SpecialtyCreateNestedManyWithoutCoachesInput => ({
    connect: [{ id: randomId() }, { id: randomId() }],
  });

const coachesData: Prisma.CoachCreateInput[] = Array.from(new Array(500)).map(
  () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    street: faker.address.streetName(),
    city: faker.address.city(),
    zip: faker.address.zipCode(),
    streetNumber: faker.address.streetSuffix(),
    specialties: specialties(),
  })
);

export async function main() {
  try {
    console.log(`Start seeding ...`);

    for (const data of specialtiesCreate) {
      const specialty = await prisma.specialty.create({ data });
      console.log(`Created specialty: ${specialty.name} (${specialty.id})`);
    }

    for (const data of coachesData) {
      const coach = await prisma.coach.create({
        data,
      });
      console.log(`Created coach ${coach.name} with id: ${coach.id}`);
    }
    console.log(`Seeding finished.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
