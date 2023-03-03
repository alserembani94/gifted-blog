import {
  Avatar,
  Container,
  Flex,
  Text,
  Spoiler,
  createStyles,
  Space,
  Divider,
  Box,
} from "@mantine/core";
import { BsFillPinFill } from "react-icons/bs";
import { Comment } from "@component/mocks/blogs";
import { displayRelativeTime } from "@component/utils/formatter";
import { AiFillLike } from "react-icons/ai";
import { ImBubble } from "react-icons/im";
import { useEffect, useState } from "react";
import { theme } from "@component/utils/themes";

type Props = {
  comment: Comment;
  isPinned?: boolean;
  hasReplies?: boolean;
};

const useStyles = createStyles((theme, _params) => ({
  like: {
    all: "unset",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    gap: "1ch",
    alignItems: "center",
  },
  comment: {
    padding: "0px 32px 16px",
    position: "relative",
  },
  label: {
    display: "flex",
    gap: "1ch",
    alignItems: "center",
    textTransform: "capitalize",
    backgroundColor: "#b7b7b7",
    color: "black",
    padding: "4px 8px",
  },
}));

const CommentBlock = ({
  comment,
  isPinned = false,
  hasReplies = false,
}: Props) => {
  const { classes } = useStyles();
  const [likeAmount, setLikeAmount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setLikeAmount(comment.likes || 0);
  }, [comment]);

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
    <Flex direction="column">
      <Container w="100%" className={classes.comment} key={comment.id}>
        {hasReplies && (
          <Box
            sx={{
              height: "100%",
              width: 1,
              backgroundColor: "#555555",
              position: "absolute",
              left: "50px",
              top: "20px",
              isolation: "isolate",
            }}
          />
        )}
        <Flex direction="row" gap="md" align="stretch">
          <Avatar
            src={comment.user.avatar}
            alt={comment.user.name}
            radius="xl"
            size="md"
          />
          <Flex direction="column">
            <Flex direction="row" gap="sm" align="center" h="38px">
              <Text sx={{ fontWeight: "bold" }}>{comment.user.name}</Text>
              <Text>{displayRelativeTime(comment.postOn)}</Text>
              {comment.edited && <Text>(Edited)</Text>}
              {isPinned && (
                <div className={classes.label}>
                  <BsFillPinFill />
                  <Text size="sm">Pinned</Text>
                </div>
              )}
            </Flex>
            <Space h="md" />
            <Spoiler maxHeight={50} showLabel="Show more" hideLabel="">
              {comment.content}
            </Spoiler>
            <Space h="md" />
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
                <ImBubble size={20} />
                Reply
              </button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      {hasReplies &&
        comment.replies?.map((reply) => (
          <CommentBlock
            key={`reply-${comment.id}-${reply.id}`}
            comment={reply}
            hasReplies={false}
          />
        ))}
    </Flex>
  );
};

export default CommentBlock;
