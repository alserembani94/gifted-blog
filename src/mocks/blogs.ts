import { getRandomInt } from "@component/utils/randomiser";
import { faker } from "@faker-js/faker";

export type Blog = {
  title: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
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
  replies: {
    user: {
      name: string;
      avatar: string;
    };
    content: string;
  }[];
  id: string;
};

export type Like = {
  id: string;
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
  replies: [
    {
      user: user[0],
      content: faker.lorem.paragraph(),
    },
  ],
});

const generateBlog = (id: string) => {
  const title = faker.lorem.words(getRandomInt(5, 7));
  return {
    title,
    slug: id,
    author: user[0],
    content: faker.lorem.paragraphs(),
    category: categoryList[getRandomInt(0, categoryList.length - 1)],
    videoUrl:
      "https://cdn.videvo.net/videvo_files/video/premium/video0398/large_watermarked/902-1_902-2821-PD2_preview.mp4",
    thumbnail:
      "https://www.techsmith.com/blog/wp-content/uploads/2021/02/video-thumbnails-social.png",
  };
};

export const blogsList = new Array(blogsLength)
  .fill({})
  .map((_, index) => generateBlog(index.toString()));

export const commentList = [
  {
    id: blogsList[0].slug,
    ...generateComment(),
  },
];

export const likeList = [
  {
    id: blogsList[0].slug,
    total: faker.datatype.number(),
  },
];
