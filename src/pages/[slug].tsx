import { blogsList, commentList, likeList } from "@component/mocks/blogs";
import { Container, createStyles, Flex } from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

const useStyles = createStyles((theme, _params) => ({
  main: {
    padding: "0px 32px",
  },
  stage: {
    flex: 1,
  },
  suggestion: {
    width: 350,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
  },
}));

type Props = {
  blogs: typeof blogsList;
  likes: typeof likeList;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = blogsList;
  const paths = blogs.map((blog) => ({ params: { slug: blog.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogs = blogsList;
  const likes = likeList;

  return {
    props: {
      blogs,
      likes,
    },
  };
};

export default function Home({ blogs, likes }: Props) {
  const { classes } = useStyles();

  return (
    <Flex
      direction="row"
      wrap="wrap"
      gap="md"
      justify="space-between"
      align="flex-start"
      className={classes.main}
    >
      <Head>
        <title></title>
      </Head>
      <Flex id="main" bg="blue" direction="column" className={classes.stage}>
        <p>Hello</p>
      </Flex>
      <Flex
        id="suggestion"
        bg="grape"
        direction="column"
        className={classes.suggestion}
      >
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
      </Flex>
    </Flex>
  );
}
