'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs';
import { desc, eq } from 'drizzle-orm';
import { JsonForms } from '../../configs/schema';
import { Index } from 'drizzle-orm/mysql-core';
import FormListItem from './FormListItem';

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && getFormList();
  }, [user]);

  const getFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);
    console.log(result);
  };

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList?.map((form, index) => (
        <div className="" key={form.id + Index}>
          <FormListItem
            jsonForm={JSON.parse(form.jsonform)}
            formRecord={form}
            refreshData={getFormList}
          />
        </div>
      ))}
    </div>
  );
};

export default FormList;
