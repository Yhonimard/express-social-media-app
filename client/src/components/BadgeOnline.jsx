import useGetUserIsOnline from "@/hooks/useGetUserOnline";
import { Badge } from "@mui/material";

const BadgeOnline = ({children, userId}) => {
  const isUserOnline = useGetUserIsOnline(userId)
  return (
      <Badge variant="dot" anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} invisible={!isUserOnline} color="success" overlap="circular" >
        {children}
      </Badge>
  );
};

export default BadgeOnline;
