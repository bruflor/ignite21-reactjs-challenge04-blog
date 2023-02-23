// import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

// import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
// import styles from './post.module.scss';

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
  // TODO
  return <h1>Post</h1>;
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

export const getStaticProps = async ({ params }) => {
  // const prismic = getPrismicClient({});
  // const response = await prismic.getByUID(TODO);

  // // TODO

  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 20 });

  const post = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
      banner: post.data.banner,
      content: post.data.content,
    };
  });
};
