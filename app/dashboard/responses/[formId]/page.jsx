'use client';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { db } from '../../../configs/index'; // Adjust the import based on your project structure
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { JsonForms, userResponses } from '../../../configs/schema';
import { and, eq } from 'drizzle-orm';

const ResponsePage = ({ params }) => {
  const [responses, setResponses] = useState(null);
  const [formDetails, setFormDetails] = useState(null); // State for form title and description

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResult = await db
          .select()
          .from(JsonForms)
          .where(eq(JsonForms.id, params?.formId));
        setFormDetails(JSON.parse(formResult[0].jsonform)); // Assuming formId is unique

        const responsesResult = await db
          .select()
          .from(userResponses)
          .where(eq(userResponses.formRef, params?.formId));
        setResponses(responsesResult);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };

    fetchData();
  }, [params.formId]);

  const handleToggleResponse = (id) => {
    setResponses((prevResponses) =>
      prevResponses.map((response) =>
        response.id === id
          ? { ...response, isOpen: !response.isOpen }
          : response
      )
    );
  };

  console.log(responses);
  console.log(formDetails);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{formDetails?.form_title}</h2>{' '}
          <p className="text-gray-700">{formDetails?.form_subheading}</p>
        </div>
        <div>
          <p className="text-primary text-sm">
            Number of Responses: {responses?.length}
          </p>
        </div>
      </div>

      {responses?.length > 0 ? (
        responses?.map((response, index) => (
          <div key={response.id} className="mb-4 shadow-md rounded-lg">
            {/* Response Header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => handleToggleResponse(response.id)}
            >
              <h3 className="text-xl text-primary font-medium">{`Response #${
                index + 1
              }`}</h3>
              <svg
                className={`h-6 w-6 transition duration-200 ${
                  response.isOpen ? 'transform rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-6 6v-14zM9 13l6-6v14z"
                />
              </svg>
            </div>

            {/* Response Content (conditionally rendered) */}
            {response.isOpen && (
              <div className="p-4">
                <dl className="grid grid-cols-1 md:grid-cols-2">
                  {Object.entries(JSON.parse(response.jsonResponse)).map(
                    ([key, value], index) => (
                      <React.Fragment
                        // className={`${index % 2 == 0 ? 'bg-grey-400' : ''}`}
                        key={key}
                      >
                        {/* <div
                          className={`${index % 2 == 0 ? 'bg-gray-400' : ''} `}
                        > */}
                          <dt
                            className={`font-medium p-2 ${index % 2 == 0 ? 'bg-gray-300' : ''}`}
                          >
                            {key}
                          </dt>
                          <dd className={`break-words p-2 ${index % 2 == 0 ? 'bg-gray-300' : ''}`}>{value}</dd>
                        {/* </div> */}
                      </React.Fragment>
                    )
                  )}
                </dl>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center p-4">No responses found for this form.</div>
      )}
    </div>
  );
};

export default ResponsePage;
