import { Api, StackContext, use, Auth } from "@serverless-stack/resources";
import { Storage } from "./Storage";

export function MainApi({stack}: StackContext) {
  const table = use(Storage).table;

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          table_name: table.tableName,
        },
      },
    },
    routes: {
      "POST /files": "functions/upload.main",
      "GET /files/{id}": "functions/get.main",
      "GET /files": "functions/get.main",
      'GET /':'functions/lambda.handler'
      //"DELETE /files/{}": "functions/delete.main",
      //"PUT /files/{}": "function/update.main"
    },

  });
  /*

  const auth = new Auth(
    stack, 'Auth', {
      login: ['username', 'email']
    }
  )

  auth.attachPermissionsForAuthUsers([api])

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });
  */

  return {
    api,
    //auth
  };
}