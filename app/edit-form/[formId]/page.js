'use client';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { db } from '../../configs/index';
import { JsonForms } from '../../configs/schema';
import Controller from '../_components/Controller';
import FormUi from '../_components/FormUi';
import { RWebShare } from 'react-web-share';

const EditForm = ({ params }) => {
  const router = useRouter();
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);

  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState();
  const [formBackground, setFormBackground] = useState('#fff');

  const onFieldUpdate = (value, index) => {
    jsonForm.form_fields[index].label = value.label;
    jsonForm.form_fields[index].placeholder = value.placeholder;

    setUpdateTrigger(Date.now());
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(result[0]);
    setSelectedTheme(result[0].theme);
    setFormBackground(result[0].background);
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({ jsonform: jsonForm })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast('Updated!!!!!');
  };

  const deleteField = async (indexToRemove) => {
    const result = jsonForm.form_fields.filter((item, index) => {
      return index != indexToRemove;
    });
    jsonForm.form_fields = result;
    setUpdateTrigger(Date.now());
  };

  const handleSelectedTheme = (value) => {
    setSelectedTheme(value);
    updateControllerFields(value, 'theme');
  };

  const handleFormBackground = (value) => {
    setFormBackground(value);
    updateControllerFields(value, 'background');
  };

  const updateControllerFields = async (value, columnName) => {
    // console.log(value, columnName);
    const result = await db
      .update(JsonForms)
      .set({ [columnName]: value })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast('Updated!!!!!');
  };

  console.log(JsonForms.id, JsonForms.createdBy);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2
          onClick={() => router.back()}
          className="flex items-center gap-2 my-5 cursor-pointer hover:font-bold"
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex items-center gap-2">
          <Link href={`/aiform/${params?.formId}`} target="_blank">
            <Button className="flex items-center gap-2">
              <SquareArrowOutUpRight className="h-5 w-5" /> Live Preview
            </Button>
          </Link>
          <RWebShare
            data={{
              text: jsonForm.form_subheading,
              //   url:
              //     process.env.NEXT_PUBLIC_BASE_URL + '/aiform/' + params?.formId,
              title: jsonForm.form_title,
            }}
            onClick={() => console.log('shared successfully!')}
          >
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Share2 className="h-5 w-5" /> Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            handleFormBackground={handleFormBackground}
            handleSelectedTheme={handleSelectedTheme}
            selectedTheme={selectedTheme}
            formBackground={formBackground}
            handleSignInEnable={(value) => updateControllerFields(value, 'enableSignIn')}
          />
        </div>
        <div
          className="md:col-span-2 overflow-auto border rounded-lg 
                     p-5 h-screen shadow-md flex items-start justify-center"
          style={{ background: formBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={deleteField}
            selectedTheme={selectedTheme}
            jsonFormId={JsonForms.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
