import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "../hooks/useCurrentUser";
import useFavorites from "../hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    //lấy 1 list chứa id của các movie yêu thích của user hiện tại
    const list = currentUser?.favoriteIds || [];
    //kiểm tra xem list này có chứa movieId hay không, true nếu tồn tại
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    //nếu có chứa movieId tức là user đã thêm vào trước rồi ==> xóa movie đó đi
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      //nếu false thì thêm movie đó vào
      response = await axios.post("/api/favorite", { movieId });
    }

    //chỉ lấy trường favoriteIds từ data (user) trả về
    const updatedFavoriteIds = response?.data?.favoriteIds;

    //cập nhật ngay
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds, //chỉ cập nhật mỗi trường favoriteIds
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full 
    flex justify-center items-center transition hover:bg-neutral-500"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
