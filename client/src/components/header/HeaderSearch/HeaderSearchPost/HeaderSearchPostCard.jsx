import { Card, CardActionArea, CardHeader, Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const HeaderSearchPostCard = ({ title, content, postId, isLoading, toggleModal }) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    toggleModal()
    navigate(`post/${postId}`)
  }

  
  return (
    <Card onClick={handleNavigate}>
      <CardActionArea>
        <CardHeader
          avatar={
            <>
              {isLoading && <Skeleton width={40} height={40} animation="wave" variant="circular" />}
            </>
          }
          title={isLoading ? <Skeleton animation="wave" height={10} width={`80%`} sx={{ mb: "6px" }} /> : title}
          subheader={isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : content}
        />
      </CardActionArea>
    </Card>
  )
}

export default HeaderSearchPostCard
