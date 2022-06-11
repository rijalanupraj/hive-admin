import * as Yup from "yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,

  Typography,

} from "@mui/material";


// components

import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from "../../../components/hook-form";

// ----------------------------------------------------------------------

export default function CategoryNewForm() {

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: "",
      isActive: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  return (
    <FormProvider methods={methods}>
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
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="name" label="Name" />
            </Box>
            <br/>
            <br/>
            <RHFSwitch
              name="isActive"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Activate Category
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Disabling this will automatically deactivate the category
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                Create
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
