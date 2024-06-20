import React, { useState } from 'react';
import { Edit, Loader2, Share2, Trash } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { db } from '../../../configs';
import { userResponses } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import * as XLSX from 'xlsx';

const FormListItemResp = ({ jsonForm, formRecord }) => {
  const [loading, setLoading] = useState(false);

  const ExportData = async () => {
    let jsonData = [];
    setLoading(true);
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));

    // console.log(result);

    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });

      setLoading(false);
    }

    const exportToExcel = (jsonData) => {
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, `${jsonForm.form_title}.xlsx`);
    };

    exportToExcel(jsonData);
    // console.log(jsonData);
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg text-black">{jsonForm.form_title}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm.form_subheading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <h2 className="text-sm">
          <strong>45</strong> Responses
        </h2>
        <Button disabled={loading} onClick={ExportData} className="" size="sm">
          {loading ? <Loader2 className="animate-spin" /> : 'Export'}
        </Button>
      </div>
    </div>
  );
};

export default FormListItemResp;
