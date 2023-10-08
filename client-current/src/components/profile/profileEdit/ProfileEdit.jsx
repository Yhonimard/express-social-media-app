import useUpdateCurrentUserProfile from "@/features/user/useUpdateCurrentUserProfile";
import profileValidation from "@/helpers/validation/profile.validation";
import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const ProfileEditComponent = ({ currentUserProfile }) => {
  const [openedModal, { toggle: toggleModal }] = useDisclosure(false);

  const editProfileFormik = useFormik({
    initialValues: {
      bio: currentUserProfile?.bio,
      birthday: currentUserProfile?.birthday,
      phone: currentUserProfile?.phone,
    },
    onSubmit: (data) => {
      updateProfile(data);
    },
    validationSchema: profileValidation.updateProfileValidation,
  });

  const currentUser = useSelector((state) => state.auth.user);
  const { mutate: updateProfile } = useUpdateCurrentUserProfile(currentUser.id);

  return (
    <>
      <Button fullWidth onClick={toggleModal} color="gray">
        edit profile
      </Button>
      <Modal
        opened={openedModal}
        centered
        onClose={toggleModal}
        title="update your profile"
      >
        <form onSubmit={editProfileFormik.handleSubmit}>
          <Stack>
            <TextInput
              placeholder="update your bio"
              name="bio"
              onChange={editProfileFormik.handleChange}
              value={editProfileFormik.values.bio}
            />
            <DatePickerInput
              valueFormat="DD MMMM YYYY"
              placeholder="your birthday"
              name="birthday"
              maxDate={new Date()}
              minDate={new Date(1960, 0, 1)}
              onChange={(e) => editProfileFormik.setFieldValue("birthday", e)}
              value={editProfileFormik.values.birthday}
            />
            <NumberInput
              placeholder="phone number"
              hideControls
              prefix="+"
              name="phone"
              min={10}
              onChange={editProfileFormik.handleChange}
              value={editProfileFormik.values.phone}
            />
            <Button color="gray" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default ProfileEditComponent;
