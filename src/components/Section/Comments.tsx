import { Comment } from "@component/mocks/blogs";
import { bitter } from "@component/utils/fonts";
import {
  Button,
  Container,
  createStyles,
  Divider,
  Space,
  Textarea,
  Title,
} from "@mantine/core";
import CommentBlock from "../CommentBlock";

const useStyles = createStyles((theme, _params) => ({
  comment: {
    padding: "16px 32px",
  },
}));

type Props = {
  comments: Comment[];
  pinnedCommentId: number;
};

const Comments = ({ comments, pinnedCommentId }: Props) => {
  const { classes } = useStyles();

  return (
    <Container bg="#282828" px={0} sx={{ width: "100%" }}>
      <Container
        bg="#282828"
        w="100%"
        title="Join the conversation"
        className={classes.comment}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Title order={6} className={bitter.className}>
          Join the conversation
        </Title>
        <Space h="lg" />
        <Textarea aria-label="comment" variant="filled" />
        <Space h="16px" />
        <Button
          sx={{
            marginLeft: "auto",
            borderRadius: "2ch",
            textTransform: "uppercase",
          }}
          px="3ch"
        >
          Post
        </Button>
      </Container>
      {comments.length ? (
        <>
          <Divider my="md" />
          {comments.map(
            (comment) =>
              pinnedCommentId === comment.id && (
                <CommentBlock
                  key={`pinned-${comment.id}`}
                  comment={comment}
                  isPinned
                />
              )
          )}
          <Divider my="md" />
          {comments.map((comment) => (
            <CommentBlock key={comment.id} comment={comment} hasReplies />
          ))}
          <Space h="32px" />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Comments;
