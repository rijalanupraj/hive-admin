import * as Yup from "yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";

// components

import { FormProvider, RHFSwitch, RHFTextField } from "../../../components/hook-form";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../../../redux/actions/categoryActions";

// ----------------------------------------------------------------------

export default function CategoryNewForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required("Category Title is required")
  });

  const defaultValues = useMemo(
    () => ({
      title: "",
      isActive: true
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
    formState: { isSubmitting, isValid }
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      dispatch(addNewCategory(values));
      reset();
      enqueueSnackbar("Added new category", { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* create category */}

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)"
                }
              }}
            >
              <RHFTextField name='title' label='Title' />
            </Box>
            <br />
            <br />
            <RHFSwitch
              name='isActive'
              labelPlacement='start'
              label={
                <>
                  <Typography variant='subtitle2' sx={{ mb: 0.5 }}>
                    Activate Category
                  </Typography>
                  <Typography variant='body2' sx={{ color: "text.secondary" }}>
                    Disabling this will automatically deactivate the category
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />

            <Stack alignItems='flex-end' sx={{ mt: 3 }}>
              <LoadingButton type='submit' variant='contained'>
                Create
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
