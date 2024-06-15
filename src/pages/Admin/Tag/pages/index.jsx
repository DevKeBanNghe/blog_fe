import { FormProvider, useForm } from 'react-hook-form';
import TagTable from '../components/TagTable';

export default function Tags() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <TagTable />
    </FormProvider>
  );
}
