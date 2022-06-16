import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFSwitch } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'activityRequest',
    label: 'Email me when user fills a moderator request',
  },
  {
    value: 'activityMessage',
    label: 'Email me when someone sends me message',
  },
  { value: 'activityReport', label: 'Email me when I get a moderator report' },
];



const NOTIFICATION_SETTINGS = {
  activityRequest: true,
  activityMessage: true,
  activityReport: false,

};

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    activityRequest: NOTIFICATION_SETTINGS.activityRequest,
    activityMessage: NOTIFICATION_SETTINGS.activityMessage,
    activityReport: NOTIFICATION_SETTINGS.activityReport,

  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Activity
            </Typography>

            <Stack spacing={1}>
              {ACTIVITY_OPTIONS.map((activity) => (
                <RHFSwitch key={activity.value} name={activity.value} label={activity.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
