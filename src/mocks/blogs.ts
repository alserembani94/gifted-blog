import { getRandomInt } from "@component/utils/randomiser";
import { faker } from "@faker-js/faker";

export type Blog = {
  title: string;
  slug: number;
  author: {
    name: string;
    avatar: string;
  };
  publishedOn: string;
  content: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
};

export type Comment = {
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  postOn: string;
  likes: number;
  replies: {
    user: {
      name: string;
      avatar: string;
    };
    likes: number;
    content: string;
  }[];
  id: number;
  blogId: number;
};

export type Like = {
  id: number;
  blogId: number;
  total: number;
};

const blogsLength = 10;

const categoryList = [
  "Mental Health",
  "Purpose",
  "Environment",
  "Government",
  "Sustainability",
];

const user = [
  {
    name: faker.name.firstName(),
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
];

const generateComment = () => ({
  user: user[0],
  content: faker.lorem.paragraphs(2),
  likes: faker.datatype.number(),
  replies: [
    {
      user: user[0],
      content: faker.lorem.paragraph(),
      likes: faker.datatype.number(),
    },
  ],
});

const generateBlog = (id: number) => {
  const title = faker.lorem.words(getRandomInt(5, 7));
  return {
    title: title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    slug: id,
    author: user[0],
    content: faker.lorem.paragraphs(),
    category: categoryList[getRandomInt(0, categoryList.length - 1)],
    publishedOn: new Date(
      faker.date.between("2020-01-01T00:00:00.000Z", "2022-12-01T00:00:00.000Z")
    ).toISOString(),
    videoUrl:
      "https://cdn.videvo.net/videvo_files/video/premium/video0398/large_watermarked/902-1_902-2821-PD2_preview.mp4",
    thumbnail:
      "https://www.techsmith.com/blog/wp-content/uploads/2021/02/video-thumbnails-social.png",
    pinnedComment: 0,
  };
};

export const blogsList = new Array(blogsLength)
  .fill({})
  .map((_, index) => generateBlog(index));

export const commentList = [
  {
    id: 1,
    blogId: blogsList[0].slug,
    postOn: new Date(
      faker.date.between(blogsList[0].publishedOn, "2023-02-01T00:00:00.000Z")
    ).toISOString(),
    ...generateComment(),
  },
];

export const likeList = [
  {
    id: 1,
    blogId: blogsList[0].slug,
    total: faker.datatype.number(),
  },
];
