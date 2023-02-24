import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

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
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  function handleLoadPosts() {
    const response = fetch(nextPage)
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        setPosts(state => [...state, ...data.results]);
        setNextPage(data.next_page);
      });
  }

  return (
    <main className={`${styles.homeContainer} ${commonStyles.container}`}>
      <div>
        {posts.map(post => {
          return (
            <Link href={`/posts/${post.uid}`} key={post.uid}>
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
      {nextPage ? (
        <button className={styles.loadMore} onClick={handleLoadPosts}>
          Carregar mais posts
        </button>
      ) : (
        ''
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 1 });

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
