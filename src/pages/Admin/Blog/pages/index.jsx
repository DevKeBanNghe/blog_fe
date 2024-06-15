import { FormProvider, useForm } from 'react-hook-form';
import BlogTable from '../components/BlogTable';

export default function Blogs() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <BlogTable />
    </FormProvider>
  );
}
