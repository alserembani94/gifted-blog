import { Blog } from "@component/mocks/blogs";
import { bitter } from "@component/utils/fonts";
import { titleColor } from "@component/utils/themes";
import { Flex, Image, Space, Text, Title } from "@mantine/core";
import Link from "next/link";

type Props = {
  blog: Blog;
  orientation?: "row" | "column";
};

const BlogCard = ({ blog, orientation = "column" }: Props) => {
  return (
    <Flex direction={orientation} sx={{ padding: "8px" }}>
      <Image src={blog.thumbnail} alt={blog.title} />
      <Space h="lg" />
      <Text
        size="sm"
        weight="bold"
        color={titleColor}
        sx={{ textTransform: "uppercase" }}
      >
        {blog.category}
      </Text>
      <Title order={6} className={bitter.className}>
        {blog.title}
      </Title>
      <Space h="md" />
      <Text
        size="md"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          wordBreak: "break-word",
          lineHeight: "1.5em",
          maxHeight: "10ch",
        }}
      >
        {blog.content}
      </Text>
      <Space h="lg" />
      <Link href={`/${blog.slug}`}>Read more</Link>
    </Flex>
  );
};

export default BlogCard;
