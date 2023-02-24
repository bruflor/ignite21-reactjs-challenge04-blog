import { GetStaticPaths, GetStaticProps } from 'next';

import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  const router = useRouter();
  return (
    <>
      <div>{router.isFallback ? 'banana' : 'jacaré'}</div>
    </>
  );
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { uid } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', uid as string);

  // const prismic = getPrismicClient({});
  const post = response;
  // const post = response.results.map(post => {
  //   return {
  //     first_publication_date: post.first_publication_date,
  //     data: {
  //       title: post.data.title,
  //       banner: {
  //         url: post.data.banner,
  //       },
  //       author: post.data.author,
  //       content: {
  //         heading: post.data.content.heading,
  //         body: {
  //           text: post.data.content.body.text,
  //         },
  //       },
  //     },
  //   };
  // });

  console.log(response);

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};
