import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";

const MessageBuble = ({ text, created_at, sender_id, isLoading }) => {
  const currentUser = useSelector(s => s.auth.user)
  const [showSkel, setShowSkel] = useState(true)

  useEffect(() => {
    let timeout
    if (!isLoading) {
      timeout = setTimeout(() => {
        setShowSkel(false)
      }, 500);
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])

  return (
    <>
      <Paper
        sx={{
          maxWidth: '70%',
          minWidth: '40%',
          alignSelf: sender_id === currentUser.id ? 'flex-end' : 'flex-start',
          flexGrow: 0, p: 1,
          mb: 1
        }}
      >
        <Stack >
          {showSkel ? (
            <>
              <Skeleton animation="wave" height={13} width={`80%`} sx={{}} />
              <Skeleton animation="wave" height={13} width={`80%`} sx={{ mb: 1 }} />
            </>
          ) : (
            <Typography sx={{ wordBreak: 'break-all' }}>
              {text}
            </Typography>
          )}
          {showSkel ? <Skeleton animation="wave" height={10} width={`30%`} sx={{ alignSelf: 'flex-end' }} /> : (
            <Typography variant="caption" alignSelf={`flex-end`}>
              {created_at}
            </Typography>
          )}
        </Stack>
      </Paper>
    </>
  );
};


export default MessageBuble
