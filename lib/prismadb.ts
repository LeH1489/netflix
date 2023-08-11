import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") {
  global.prismadb = client;
}

export default client;

/*
    NextJS hot reloading, ngan8 prisma tạo ra các client instance 
*/
