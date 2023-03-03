import { Blog } from "@component/mocks/blogs";
import { bitter } from "@component/utils/fonts";
import { titleColor } from "@component/utils/themes";
import { Flex, Image, Space, Text, Title } from "@mantine/core";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";

type Props = {
  blog: Blog;
  orientation?: "row" | "column";
};

const BlogCard = ({ blog, orientation = "column" }: Props) => {
  return (
    <Link href={`/${blog.slug}`} style={{ all: "unset", cursor: "pointer" }}>
      <Flex direction={orientation} sx={{ padding: "8px" }}>
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          width={orientation === "column" ? "100%" : "160px"}
        />
        <Space
          h={orientation === "column" ? "lg" : "0px"}
          w={orientation === "column" ? "0" : "lg"}
        />
        <Flex direction="column">
          <Text
            size={orientation === "column" ? "sm" : 12}
            weight="bold"
            color={titleColor}
            sx={{ textTransform: "uppercase" }}
          >
            {blog.category}
          </Text>
          <Title
            order={6}
            size={orientation === "column" ? 28 : "md"}
            className={bitter.className}
          >
            {blog.title}
          </Title>
          <Space h="4px" />
          <Flex direction="row" gap="xs" align="center">
            <AiFillLike size={20} color="gray" />
            <Text>0</Text>
          </Flex>
        </Flex>
        <Space h="md" />
        {orientation === "column" && (
          <Flex direction="column">
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
        )}
      </Flex>
    </Link>
  );
};

export default BlogCard;
