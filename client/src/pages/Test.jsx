import { Button, Container } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { MuiFileInput } from "mui-file-input";

const Test = () => {
  const formik = useFormik({
    initialValues: {
      image: []
    },
    onSubmit: async data => {
      const formData = new FormData()
      // data.image.forEach((f) => {
      // })
      formData.append('image/test', data.image, 'chat')
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/test`, formData)
      console.log(res);
    }
  })


  const uploadImg = async (data) => {
    // const imgArr = await Promise.all(data.map(async f => await converToBase64(f)))
    console.log(data);
    formik.setFieldValue('image', data)
  }

  return (
    <>
      {/* {formik.values?.image?.map((p, i) => ( */}
      {/* <img src={p || null} height={100} key={i} /> */}
      {/* ))} */}
      <Container sx={{ mt: 20 }}>
        <form onSubmit={formik.handleSubmit}>
          <MuiFileInput onChange={uploadImg} />
          <Button type="submit">submit</Button>
        </form>
      </Container>
    </>
  );
};

export default Test;

function converToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
  })
}