import { SimpleGrid } from "@mantine/core";
import ProfileLikesCard from "./ProfileLikesCard";

const ProfileLikes = () => {
  return (
    <SimpleGrid cols={{ base: 2 }}>
      <ProfileLikesCard />
      <ProfileLikesCard />
      <ProfileLikesCard />
      <ProfileLikesCard />
      <ProfileLikesCard />
    </SimpleGrid>
  );
};

export default ProfileLikes;
