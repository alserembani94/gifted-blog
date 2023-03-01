import {
  Blog,
  blogsList,
  commentList,
  Comment,
  Like,
  likeList,
} from "@component/mocks/blogs";
import { bitter } from "@component/utils/fonts";
import { theme, titleColor } from "@component/utils/themes";
import {
  Avatar,
  Container,
  createStyles,
  Divider,
  Flex,
  Space,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { DateTime } from "luxon";
import {
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillLike,
  AiOutlineStop,
} from "react-icons/ai";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme, _params) => ({
  main: {
    padding: "0px 32px",
  },
  stage: {
    flex: 1,
  },
  suggestion: {
    width: 450,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
  },
  like: {
    all: "unset",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    gap: "1ch",
    alignItems: "center",
  },
  comment: {
    padding: "16px 32px",
  },
}));

type Props = {
  blog: Blog;
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
  const likes =
    likeList.find((like) => like.blogId.toString() === slug) || null;
  const comments = commentList.filter(
    (comment) => comment.blogId.toString() === slug
  );

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: {
      blog,
      likes,
      comments,
    },
  };
};

export default function Home({ blog, likes, comments }: Props) {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [likeAmount, setLikeAmount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const { classes } = useStyles();

  const displayRelativeTime = (date: string) => {
    const now = DateTime.now();
    const publishedOn = DateTime.fromISO(date);
    const diff = now
      .diff(publishedOn, ["years", "months", "days", "hours"])
      .toObject();

    if (diff.years) {
      return new Intl.RelativeTimeFormat("en").format(-diff.years, "years");
    } else if (diff.months) {
      return new Intl.RelativeTimeFormat("en").format(-diff.months, "months");
    } else if (diff.days) {
      return new Intl.RelativeTimeFormat("en").format(-diff.days, "days");
    } else if (diff.hours) {
      return new Intl.RelativeTimeFormat("en").format(-diff.hours, "hours");
    } else {
      return "Just now";
    }
  };

  useEffect(() => {
    setShareUrl(document.URL);
    setLikeAmount(likes?.total || 0);
  }, []);

  const handleLike = () => {
    if (hasLiked) {
      setLikeAmount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikeAmount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <Container size="xl">
      <Flex
        direction="row"
        wrap="wrap"
        gap="xl"
        justify="space-between"
        align="flex-start"
        className={classes.main}
      >
        <Head>
          <title>{blog.title} | GIFT.ed</title>
        </Head>
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
              <Avatar
                src={blog.author.avatar}
                alt={blog.author.name}
                radius="xl"
              />
              <Text>{blog.author.name}</Text>
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
          <Container
            bg="#282828"
            w="100%"
            title="Join the conversation"
            className={classes.comment}
          >
            <Title order={6} className={bitter.className}>
              Join the conversation
            </Title>
            <Space h="lg" />
            <Textarea aria-label="comment" />
          </Container>
        </Flex>
        <Space w="xl" />
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
    </Container>
  );
}
