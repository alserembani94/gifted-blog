import { Blog, Like, Comment } from "@component/mocks/blogs";
import { bitter } from "@component/utils/fonts";
import { displayRelativeTime } from "@component/utils/formatter";
import { theme, titleColor } from "@component/utils/themes";
import {
  Avatar,
  createStyles,
  Divider,
  Flex,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  AiFillLike,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiOutlineStop,
} from "react-icons/ai";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import Comments from "./Comments";

const useStyles = createStyles((theme, _params) => ({
  stage: {
    flex: 1,
  },
  like: {
    all: "unset",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    gap: "1ch",
    alignItems: "center",
  },
}));

type Props = {
  blog: Blog;
  likes: Like | null;
  comments: Comment[];
};

const BlogContent = ({ blog, likes, comments }: Props) => {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [likeAmount, setLikeAmount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setShareUrl(document.URL);
    setLikeAmount(likes?.total || 0);
  }, [likes?.total]);

  const handleLike = () => {
    if (hasLiked) {
      setLikeAmount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikeAmount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const { classes } = useStyles();

  return (
    <Flex id="main" direction="column" className={classes.stage}>
      <Space h="xl" />
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
      <Space h="sm" />
      <Flex
        id="metadata"
        direction="row"
        justify="space-between"
        align="center"
        gap="lg"
      >
        <Flex id="author" direction="row" gap="md" align="center">
          <Avatar src={blog.author.avatar} alt={blog.author.name} radius="xl" />
          <Text sx={{ fontWeight: "bold" }}>{blog.author.name}</Text>
          <Text>{displayRelativeTime(blog.publishedOn)}</Text>
        </Flex>
        <Flex id="share" direction="row" gap="xs">
          <Text>Share it</Text>
          <LinkedinShareButton url={shareUrl} title={blog.title}>
            <AiFillLinkedin size="24" />
          </LinkedinShareButton>
          <TwitterShareButton url={shareUrl} title={blog.title}>
            <AiFillTwitterSquare size="24" />
          </TwitterShareButton>
        </Flex>
      </Flex>
      <Space h="xl" />
      <video width="100%" controls>
        <source src={blog.videoUrl} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <Space h="xl" />
      <Text>{blog.content}</Text>
      <Divider my="30px" />
      <Flex direction="row" gap="xs" align="center">
        <button className={classes.like} onClick={handleLike}>
          <AiFillLike
            size={20}
            color={hasLiked ? theme?.colors?.brand?.[6] : "gray"}
          />
        </button>
        <Text>{likeAmount}</Text>
        <Space w="16px" />
        <button className={classes.like}>
          <AiOutlineStop size={20} />
          Show less like this
        </button>
      </Flex>
      <Space h="24px" />
      <Comments comments={comments} pinnedCommentId={blog.pinnedComment} />
      <Space h="24px" />
    </Flex>
  );
};

export default BlogContent;
