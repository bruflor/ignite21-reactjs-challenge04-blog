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

interface Posts {
  posts: Post[];
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }: Posts) {
  return (
    <main className={`${styles.homeContainer} ${commonStyles.container}`}>
      <div>
        {posts?.map(post => {
          return (
            <Link href="#">
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div>
                <span>
                  <FiCalendar />
                  {post.first_publication_date}
                </span>
                <span>
                  <FiUser />
                  {post.data.author}
                </span>
              </div>
            </Link>
          );
        })}
        {/* <Link href="#">
          <strong>Title</strong>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
            quidem voluptates voluptatum perferendis tempora fugit eos similique
            voluptas, est doloribus quod inventore maxime nulla autem laudantium
            qui, suscipit, ad excepturi!
          </p>
          <div>
            <span>
              <FiCalendar />
              19 abr 2021
            </span>
            <span>
              <FiUser />
              Adriana Calcanhoto
            </span>
          </div>
        </Link> */}
      </div>
      <a className={styles.loadMore}>Carregar mais posts</a>
    </main>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 20 });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return { props: { posts } };
};
