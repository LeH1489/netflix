import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import BillBoard from "../components/BillBoard";
import MovieList from "../components/MovieList";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";
import InfoModel from "../components/InfoModel";
import useInfoModal from "../hooks/useInfoModel";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  //xem có session nào ko, nếu ko có thì redirect đến page auth
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  //biến data được đặt lại với tên movies, nếu data ko có value thì mảng rỗng [] sẽ gán cho movies
  //movies sẽ luôn là có kiểu giá trị là mảng, ngay cả khi dữ liệu chưa được tải
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModel visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default Home;
