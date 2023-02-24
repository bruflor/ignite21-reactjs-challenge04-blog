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

export default function Home({ postsPagination }: HomeProps) {
  async function handleLoadPosts() {
    const response = await fetch(postsPagination.next_page, {
      method: 'get',
      headers: {
        oauth_token: process.env.PRISMIC_ACCESS_TOKEN,
      },
    });
    const loadMorePostsResponse = response.json();
    return loadMorePostsResponse;
  }

  return (
    <main className={`${styles.homeContainer} ${commonStyles.container}`}>
      <div>
        {postsPagination?.results.map(post => {
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
      </div>
      <button className={styles.loadMore} onClick={handleLoadPosts}>
        Carregar mais posts
      </button>
    </main>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 2 });
  console.log(postsResponse);
  const results = postsResponse.results.map(post => {
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

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: results,
  };

  return { props: { postsPagination } };
};
