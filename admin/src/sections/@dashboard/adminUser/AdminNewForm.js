import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// _mock
import { countries } from "../../../_mock";
// components
import Label from "../../../components/Label";
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar
} from "../../../components/hook-form";

// ----------------------------------------------------------------------

AdminNewForm.propTypes = {
  isEdit: PropTypes.bool
};

export default function AdminNewForm({ isEdit }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string().required("Password is required")
  });

  const defaultValues = useMemo(
    () => ({
      email: ""
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }
              }}
            >
              <RHFTextField name='name' label='Full Name' />
              <RHFTextField name='password' label='Password' />
            </Box>

            <Stack alignItems='flex-start' sx={{ mt: 3 }}>
              <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                {!isEdit ? "Create Admin" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
