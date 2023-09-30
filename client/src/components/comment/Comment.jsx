import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";

const Comment = ({ author, createdAt, title }) => {
  return (
    <>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${author?.photoProfile}`} alt={author?.username} />
          </ListItemAvatar>
          <ListItemText
            primary={author?.username}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {moment(createdAt).format("MMMM D, YYYY")}
                </Typography>
                {" — "}
                <Typography
                  variant="body2"
                  component="span"
                  className="text2truncate"
                >
                  {title}
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
      <Divider variant="inset" sx={{ mt: .5 }} />
    </>
  );
};

export default Comment;
