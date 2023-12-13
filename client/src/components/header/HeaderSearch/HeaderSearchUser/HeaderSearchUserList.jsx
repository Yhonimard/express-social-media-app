import { Button, Grid, Typography } from '@mui/material'
import HeaderSearchUserCard from './HeaderSearchUserCard'
import user from '@/config/user'
import LoadingOverlay from '@/components/loadingOverlay/LoadingOverlay'
import { Fragment } from 'react'

const HeaderSearchUserList = ({ searchValue,toggleModal }) => {
  const userQuery = user.query.SearchUser(searchValue)
  if (userQuery.isLoading) return <LoadingOverlay />
  return (
    <Grid container mt={1} spacing={1} >
      {userQuery.data.pages.map((p, i) => (
        <Fragment key={i}>
          {p.users.map(u => (
            <Grid item key={u.id} xs={12}>
              <HeaderSearchUserCard
                photo_profile={u.photo_profile}
                username={u.username}
                name={u.name}
                id={u.id} 
                isLoading={userQuery.isLoading}
                toggleModal={toggleModal}
                />
            </Grid>
          ))}
          {(p.users.length < 1 && !userQuery.isLoading) && (
            <Grid xs={12} item >
              <Typography textAlign={`center`} p={4} mt={1}>
                No Post found by keyword {searchValue}
              </Typography>
            </Grid>
          )}
        </Fragment>
      ))}
      {userQuery.hasNextPage && (
        <Grid item xs={12}>
          <Button fullWidth color='inherit' variant='contained' onClick={userQuery.fetchNextPage}>See More</Button>
        </Grid>
      )}
    </Grid>
  )
}

export default HeaderSearchUserList
