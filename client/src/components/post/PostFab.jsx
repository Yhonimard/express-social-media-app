import Icon from "@/assets/Icon"
import { Fab, Modal, Paper } from "@mui/material"
import React, { memo, useState } from "react"
import PostForm from "./PostForm"

const PostFab = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModal = () => {
    setIsOpenModal(state => !state)
  }
  return (
    <>
      <Fab sx={{ position: "fixed", bottom: 35, right: 45 }} onClick={toggleModal}>
        <Icon.Create />
      </Fab>

      <Modal open={isOpenModal} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClose={toggleModal} >
        <Paper sx={{ maxWidth: "30rem", width: "100%", p: 3 }}>
          <PostForm toggleModal={toggleModal} />
        </Paper>
      </Modal>

    </>
  )
}

export default memo(PostFab)
