import BlogCard from "@component/components/BlogCard";
import { Blog, blogsList, Like, likeList } from "@component/mocks/blogs";
import { bitter } from "@component/utils/fonts";
import { Container, SimpleGrid, Space, Title } from "@mantine/core";
import { GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  blogs: Blog[];
  likes: Like[];
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
  return (
    <Container size="xl" title="Blog">
      <Head>
        <title>Blogs | GIFT.ed</title>
      </Head>
      <Space h="xl" />
      <Title order={1} align="center" className={bitter.className}>
        Blogs
      </Title>
      <Space h="xl" />
      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing="xl"
        breakpoints={[
          {
            maxWidth: 980,
            cols: 2,
            spacing: "md",
          },
          {
            maxWidth: 755,
            cols: 1,
            spacing: "sm",
          },
        ]}
      >
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.slug} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
