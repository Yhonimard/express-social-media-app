import Header from "@/components/header"
import Navbar from "@/components/navbar"
import ProfileFollowersModal from "@/components/profile/ProfileFollowersModal"
import ProfileFollowingModal from "@/components/profile/ProfileFollowingModal"
import profile from "@/config/profile/profile"
import { Box } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"

const drawerSize = "80px"
const RootPage = () => {

  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const dispatch = useDispatch()
  const isOpenFollowersModal = useSelector(s => s.profile.isOpenFollowersModal)

  const isOpenFollowingModal = useSelector(s => s.profile.isOpenFollowingModal)

  const closeFollowersModal = useCallback(() => {
    dispatch(profile.reducer.action.toggleFollowersModal())
  }, [dispatch])

  const toggleFollowingModal = useCallback(() => {
    dispatch(profile.reducer.action.toggleFollowingModal())
  }, [dispatch])

  return (
    <>
      <Box height={`100vh`}>
        <Box>
          <Header />
        </Box>

        <Box display={{ xs: "none", md: "block" }}>
          <Navbar drawerWidth={drawerSize} />
        </Box>

        <Box height={`100%`} >
          <Box pt={8} height={`100%`} ml={{ xs: 0, md: drawerSize }}>
            <Outlet />
          </Box>
        </Box>


      </Box >
      <ProfileFollowersModal open={isOpenFollowersModal} toggle={closeFollowersModal} />
      <ProfileFollowingModal open={isOpenFollowingModal} toggle={toggleFollowingModal} />
    </>

  )

}

// <Box ml={{ xs: 0, md: drawerSize }} height={`100%`} pt={8} >
//   <Outlet />
// </Box>
export default RootPage
