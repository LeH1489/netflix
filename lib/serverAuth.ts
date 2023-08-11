import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import primadb from "../lib/prismadb";
import { authOptions } from "../pages/api/auth/[...nextauth]";

//nhận vào 1 request => kiểm tra => trả về user hiện tại
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  //lấy session
  const session = await getServerSession(req, res, authOptions);

  //kiểm tra trong sesion có trường user hay không
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  //tìm user
  const currentUser = await primadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
