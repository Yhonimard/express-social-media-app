import { Add } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import post from "../../redux/post";

const PostFloatingButton = () => {
  const dispatch = useDispatch();
  return (
    <Tooltip title="add post" sx={{ position: "fixed", bottom: 50, right: 40 }}>
      <Fab
        variant="circular"
        color="primary"
        onClick={() => dispatch(post.action.showModal(true))}
      >
        <Add />
      </Fab>
    </Tooltip>
  );
};

export default PostFloatingButton;
