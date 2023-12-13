import { Card, CardHeader, Skeleton, CardActionArea, Avatar } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const HeaderSearchUserCard = ({ username, name, photo_profile, id, isLoading, toggleModal }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(s => s.auth.user)
  const handleNavigate = () => {
    toggleModal()
    navigate(currentUser.id === id ? '/profile' : `/user/${id}`, {})
  }
  return (
    <Card>
      <CardActionArea onClick={handleNavigate}>
        <CardHeader
          avatar={
            <>
              {isLoading && <Skeleton width={40} height={40} animation="wave" variant="circular" />}
              {!isLoading && <Avatar sx={{ width: 40, height: 40 }} src={`${import.meta.env.VITE_API_BASE_URL}/${photo_profile}`} />}
            </>
          }
          title={isLoading ? <Skeleton animation="wave" height={10} width={`80%`} sx={{ mb: "6px" }} /> : username}
          subheader={isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : name}
        />
      </CardActionArea>
    </Card>
  )
}

export default HeaderSearchUserCard
