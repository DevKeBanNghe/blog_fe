import { FormProvider, useForm } from 'react-hook-form';
import ImageTable from '../components/ImageTable';

export default function Images() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <ImageTable />
    </FormProvider>
  );
}
