import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <main className={`${styles.homeContainer} ${commonStyles.container}`}>
      <Link href="#">
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis quidem
          voluptates voluptatum perferendis tempora fugit eos similique
          voluptas, est doloribus quod inventore maxime nulla autem laudantium
          qui, suscipit, ad excepturi!
        </p>
        <div>
          <time>
            <FiCalendar />
            19 abr 2021
          </time>
          <p>
            <FiUser />
            Adriana Calcanhoto
          </p>
        </div>
      </Link>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
