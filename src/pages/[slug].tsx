import {
  Blog,
  blogsList,
  commentList,
  Comment,
  Like,
  likeList,
} from "@component/mocks/blogs";
import { Container, createStyles, Flex, Space } from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import BlogContent from "@component/components/Section/BlogContent";
import Suggestions from "@component/components/Section/Suggestions";

const useStyles = createStyles((theme, _params) => ({
  main: {
    padding: "0px 32px",
  },
}));

type Props = {
  blog: Blog;
  others: Blog[];
  likes: Like | null;
  comments: Comment[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = blogsList;
  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug;
  const blog = blogsList.find((blog) => blog.slug.toString() === slug);
  const others = blogsList
    .filter((blog) => blog.slug.toString() !== slug)
    .slice(0, 4);
  const likes =
    likeList.find((like) => like.blogId.toString() === slug) || null;
  const comments = commentList.filter(
    (comment) => comment.blogId?.toString() === slug
  );

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: {
      blog,
      others,
      likes,
      comments,
    },
  };
};

export default function Home({ blog, likes, comments, others }: Props) {
  const { classes } = useStyles();

  return (
    <Container size="xl">
      <Flex
        direction="row"
        wrap="wrap"
        gap="4rem"
        justify="space-between"
        align="flex-start"
        className={classes.main}
      >
        <Head>
          <title>{blog.title} | GIFT.ed</title>
        </Head>
        <BlogContent blog={blog} likes={likes} comments={comments} />
        <Suggestions others={others} />
      </Flex>
    </Container>
  );
}
