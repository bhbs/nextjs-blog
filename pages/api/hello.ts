import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
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

export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
): Promise<any> {
  return fetch("https://cunning-buffalo-42.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  }).then((result) => result.json());
}
