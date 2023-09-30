import { List, ListItem, Typography } from "@mui/material";

const CommentNotFound = () => {
  return (
    <List>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="text.secondary" textAlign="center">
          no comment here
        </Typography>
      </ListItem>
    </List>
  );
};

export default CommentNotFound;
