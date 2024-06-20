'use client';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../../configs/index';
import { JsonForms } from '../../configs/schema';
import FormUi from '../../edit-form/_components/FormUi';

const LiveAiForm = ({ params }) => {
  const [record, setRecord] = useState([]);
  const [jsonForm, setJsonForm] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState();
  const [formBackground, setFormBackground] = useState('#fff');

  useEffect(() => {
    params && getFormData();
  }, [params]);

  const getFormData = async () => {
    if (params?.formid) {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, params?.formid));

      // console.log(result[0]?.id);

      setRecord(result[0]);
      setSelectedTheme(result[0]?.theme);
      setFormBackground(result[0]?.background);
      setJsonForm(JSON.parse(result[0]?.jsonform));
    }
  };

  // console.log(JsonForms);

  return (
    <div
      className="flex items-center justify-center w-full p-10"
      style={{ background: formBackground }}
    >
      <div>
        <FormUi
          jsonForm={jsonForm}
          onFieldUpdate={() => {}}
          deleteField={() => {}}
          selectedTheme={selectedTheme}
          jsonFormId={record.id}
        />
      </div>
      <Link
        href={'/'}
        className="flex gap-2 items-center bg-black text-white px-5 py-3 rounded-full fixed bottom-5 left-5 cursor-pointer"
      >
        <Image src={'/logo.svg'} height={50} width={50} alt="logo" />
        Build your Own AI form
      </Link>
    </div>
  );
};

export default LiveAiForm;
