import user from "@/config/user"
import { Button, Divider, Modal, Paper, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useFormik } from "formik"
import moment from "moment"
import { MuiTelInput } from "mui-tel-input"
import { memo, useEffect } from "react"
import { useSelector } from "react-redux"

const ProfileUpdateModal = ({ open, toggleModal }) => {
  const currentUser = useSelector(s => s.auth.user)
  const profileQuery = user.query.GetCurrentUserProfile(currentUser.id)
  const { mutate: update } = user.query.UpdateCurrentUserProfile(currentUser.id)
  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      phone: '',
      birthday: new Date,
    },
    onSubmit: data => {
      update(data)
    }
  })

  useEffect(() => {
    if (open) formik.setValues({
      name: profileQuery.data.name || '',
      bio: profileQuery.data.bio || '',
      phone: profileQuery.data.phone || "",
      birthday: moment(profileQuery.data.birthday, "DD MMMM, YYYY").toISOString() || moment(new Date)
    })
  }, [open])

  return (
    <Modal open={open} sx={{ justifyContent: "center", display: "flex", alignItems: "center", px: 1 }} onClose={toggleModal}>
      <Paper sx={{ maxWidth: "30rem", width: "100%", p: 3 }}>
        <Typography textAlign={`center`} variant="h6">Edit profile</Typography>
        <Divider sx={{ my: 1 }} />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            fullWidth
            variant="filled"
            size="small"
            margin="dense"
            label="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            name="bio"
            fullWidth
            variant="filled"
            size="small"
            margin="dense"
            label="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />

          <MuiTelInput
            name="phone"
            fullWidth
            variant="filled"
            size="small"
            margin="dense"
            label="phone"
            value={formik.values.phone}
            onChange={(e) => formik.setFieldValue("phone", e)}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            defaultCountry="ID"
          />
          <DatePicker
            slotProps={{
              textField: {
                fullWidth: true,
                name: "birthday",
                variant: "filled",
                size: "small",
                margin: "dense",
                label: "birthday"
              }
            }}
            maxDate={moment(new Date)}
            value={moment(formik.values.birthday)}
            onChange={(e) => formik.setFieldValue('birthday', new Date(e))}
          />
          <Button color="inherit" fullWidth sx={{ mt: 1 }} variant="contained" type="submit">Update</Button>
        </form>
      </Paper>
    </Modal>
  )
}


export default memo(ProfileUpdateModal)