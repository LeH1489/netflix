import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const movieCount = await prismadb.movie.count();

    const radomIndex = Math.floor(Math.random() * movieCount);

    //lấy ngẫu nhiên 1 movie
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: radomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
