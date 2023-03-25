import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
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
