import { NextApiResponse } from "next";

export default async (res: NextApiResponse): Promise<void> => {
  const operations = `
    query MyQuery {
      users {
        name
        description
      }
    }
  `;

  const result = await fetchGraphQL(operations, "MyQuery", {});

  res.status(200).json(result);
};

/*
This is an example snippet - you should consider tailoring it
to your service.

Note: we only handle the first operation here
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
): Promise<any> {
  return fetch("https://cunning-buffalo-42.hasura.app/v1/graphql", {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  }).then((result) => result.json());
}
/* eslint-enable @typescript-eslint/no-explicit-any */
