import { Blog } from "@component/mocks/blogs";
import { titleColor } from "@component/utils/themes";
import { createStyles, Divider, Flex, Space, Text } from "@mantine/core";
import BlogCard from "../BlogCard";

const useStyles = createStyles((theme, _params) => ({
  suggestion: {
    width: 450,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "100%",
    },
  },
}));

type Props = {
  others: Blog[];
};

const Suggestions = ({ others }: Props) => {
  const { classes } = useStyles();
  return (
    <Flex id="suggestion" direction="column" className={classes.suggestion}>
      <Space h="xl" />
      <Text
        size="sm"
        weight="bold"
        color="white"
        sx={{ textTransform: "uppercase", marginBottom: 8 }}
      >
        For you
      </Text>
      <Divider />
      {others.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} orientation="row" />
      ))}
    </Flex>
  );
};

export default Suggestions;
