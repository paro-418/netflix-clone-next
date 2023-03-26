import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Navbar from '../components/Navbar';
import BillBoard from '../components/BillBoard';
import MoviesList from '../components/MoviesList';
import useMovieList from '../hooks/useMovieList';
import useFavorites from '../hooks/useFavorites';
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModals';

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className='pb-40'>
        <MoviesList title='trending now' data={movies} />
        <MoviesList title='My List' data={favorites} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
